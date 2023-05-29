import MainButton from "../../../components/MainButton";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import Table from "../../../components/Table";
import Cookies from "universal-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import { useNavigate } from "react-router-dom";
import removeCookies from "../../../utils/removeCookies";

/*
name = [String] 
purpose = [String]
instanceNum = [Int]
cpu = [Int]
memory = [Int]
storage = [Int]
author = [String]
*/

export default function WriteProposal() {
  const [date, setDate] = useState();
  const [flavorList, setFlavorList] = useState([]);
  const cookies = new Cookies();
  //array that stores the selectedId and the number of instances selected by the user
  const [num, setNum] = useState({});
  const navigate = useNavigate();

  //proposal form
  const [proposal, setProposal] = useState({
    name: "",
    purpose: "",
    instance_num: null,
    cpu: null,
    memory: null,
    storage: null,
    author_email: "",
    end_at: "",
  });

  //proposal 제출 hook
  const proposalSubmmit = useMutation({
    mutationFn: (proposal) => usePostApi("proposal/create", proposal),
    onSuccess: (data) => {
      alert("제출 성공");
      navigate("/proposal");
    },
    onError: () => {
      alert("제출 실패");
    },
  });

  //날짜를 백엔드 형식에 맞게 수정
  const modifyDate = (date) => {
    //result : 2021-09-01
    const result = date.toLocaleDateString().split(".");
    return (result[0] + "-" + result[1] + "-" + result[2]).replace(/\s/g, "");
  };

  const handleNumChange = (e) => {
    //num 객체에 selectedId와 num을 추가
    let { value, id } = e.target;
    if (value.length >= 3) {
      e.preventDefault();
    }
    //value가 10을 초과하면 처음에 누른 값만 저장되고 그 이후에는 저장되지 않음
    if (value > 10) {
      e.target.value = value.slice(0, 1);
      value = value.slice(0, 1);
    }
    //value가 없으면, num에서 해당 id를 삭제
    if (value === "" || value === "0") {
      setNum((oldNum) => {
        const newNum = { ...oldNum };
        delete newNum[id];
        return newNum;
      });
      return;
    }
    setNum((oldNum) => {
      return { ...oldNum, [id]: Number(value) };
    });
  };

  // flavor list hook
  useQuery({
    queryKey: ["flavors"],
    queryFn: () => useGetApi("flavor/list"),
    onSuccess: (data) => {
      setFlavorList([]);
      data.data.flavors.map((newFlavor, index) => {
        const newFlavorObj = {};

        newFlavorObj["id"] = index;
        newFlavorObj["flalvorName"] = newFlavor.name;
        newFlavorObj["flavorRam"] = newFlavor.ram;
        newFlavorObj["flavorDisk"] = newFlavor.disk;
        newFlavorObj["cpu"] = Number(newFlavor.cpu);

        const numInput = (
          //input should be positive integer
          //updownkey unavailable
          <Input
            defaultValue={0}
            type="number"
            id={index}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            min="0"
            onChange={handleNumChange}
          ></Input>
        );

        newFlavorObj["numInput"] = numInput;

        setFlavorList((oldFlavor) => [...oldFlavor, newFlavorObj]);
      });
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  // project name, project purpose
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposal({
      ...proposal,
      [name]: value,
    });
  };

  const handleRowClick = (id) => {};

  //제출 버튼 클릭 시
  const handleSubmmit = (e) => {
    e.preventDefault();

    //proposal 객체에 instance_num 추가
    proposal.instance_num = 0;
    for (let i in num) {
      proposal.instance_num += parseInt(num[i]);
    }
    //proposal 객체에 totalCPU, totalRAM, totalStorage 추가
    proposal.cpu = totalCPU;
    proposal.memory = totalRAM;
    proposal.storage = totalStorage;
    //proposal 객체에 date 추가
    proposal.end_at = modifyDate(date);
    //proposal 객체에 author_email 추가
    proposal.author_email = cookies.get("email");
    proposalSubmmit.mutate(proposal);
  };

  let totalCPU = 0;
  let totalRAM = 0;
  let totalStorage = 0;

  for (let i in num) {
    if (flavorList[i].flavorRam.includes("MB")) {
      totalRAM += (parseInt(flavorList[i].flavorRam) / 1024) * num[i];
    } else {
      totalRAM += parseInt(flavorList[i].flavorRam) * num[i];
    }
    totalCPU += flavorList[i].cpu * num[i];
    totalStorage += parseInt(flavorList[i].flavorDisk) * num[i];
  }

  return (
    <Wrapper>
      <WriteProposalWrapper>
        <LeftContainer>
          <Form>
            <Div>
              <Label>Project Name</Label>
              <InputProjectName
                onChange={handleInputChange}
                type="text"
                name="name"
                maxLength={30}
                required
              />
            </Div>
            <Div>
              <Label>Project Purpose</Label>
              <Label2>
                Make sure that your description is as detailed as possible
              </Label2>
              <InputContainer>
                <InputDescription
                  onChange={handleInputChange}
                  type="text"
                  name="purpose"
                  maxLength={300}
                  required
                />
              </InputContainer>
            </Div>
            <Div>
              <Label>Quata</Label>
              <Label2>Enter the number of instances you want to use</Label2>
              <TableDiv>
                <Table
                  checkBox={false}
                  data={flavorList}
                  header={["Name", "RAM", "DISK", "vCPU", "Num"]}
                  onClick={handleRowClick}
                />
              </TableDiv>
            </Div>
          </Form>
        </LeftContainer>
        <RightContainer>
          <CalendarDiv>
            <Label>Period of use</Label>
            {/* Calendar that is written in English */}
            <Calendar
              minDate={new Date()}
              onChange={setDate}
              value={date}
              locale={"en-US"}
              className="calendar"
            />
            {/* show clicked date */}
            <p>selected Date: {date?.toLocaleDateString()}</p>
          </CalendarDiv>
          <Div>
            <Label>total CPU</Label>
            {totalCPU}
          </Div>
          <Div>
            <Label>total RAM</Label>
            {totalRAM}
          </Div>
          <Div>
            <Label>total STORAGE</Label>
            {totalStorage}
          </Div>
          <MainButton
            disabled={
              !proposal.name ||
              !proposal.purpose ||
              totalCPU === 0 ||
              totalRAM === 0 ||
              totalStorage === 0 ||
              !date
            }
            color={"semi-dark"}
            fullWidth={true}
            marginTop={3.4}
            onClick={handleSubmmit}
          >
            제출
          </MainButton>
        </RightContainer>
      </WriteProposalWrapper>
    </Wrapper>
  );
}

const TableDiv = styled.div`
  width: 90%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WriteProposalWrapper = styled.div`
  margin-top: 1.4rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 1.2rem;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.2rem;
`;

const CalendarDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 600;
`;

const Label2 = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 200;
  color: grey;
`;

const InputProjectName = styled.input`
  width: 90%;
  height: 2.5rem;
  font-size: 1rem;
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
`;

const InputDescription = styled.textarea`
  font-size: 1rem;
  width: 90%;
  height: 7rem;
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
  vertical-align: top;
  resize: none;
  overflow: auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 3rem;
  height: 1.4rem;
  border: 0.7px solid var(--dark);
  border-radius: 2px;
  font-size: 1rem;
  text-align: center;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
