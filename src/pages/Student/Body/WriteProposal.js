import MainButton from "../../../components/MainButton";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import Table from "../../../components/Table";
import Cookies from "universal-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";

const flavorData = [
  {
    id: "1",
    flalvorName: "u2.c1m1",
    flavorRam: "1GB",
    flavorDisk: "20GB",
    cpu: 1,
  },
  {
    id: "2",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
  },
  {
    id: "3",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
  },
];

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
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState();
  const cookies = new Cookies();

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
      console.log(data);
    },
    onError: () => {
      alert("제출에 실패");
    },
  });

  //날짜를 백엔드 형식에 맞게 수정
  const modifyDate = (date) => {
    //result : 2021-09-01
    const result = date.toLocaleDateString().split(".");
    return (result[0] + "-" + result[1] + "-" + result[2]).replace(/\s/g, "");
  };

  //프로젝트 목록 가져오기
  useQuery({
    queryKey: ["flavor"],
    queryFn: () => useGetApi("flavor/list"),
    onSuccess: () => {},
    onError: (error) => {
      alert("flavor 불러오기에 실패했습니다.", error);
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

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

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

  //array that stores the selectedId and the number of instances selected by the user
  const [num, setNum] = useState([]);

  const handleNumChange = (e) => {
    //num 객체에 selectedId와 num을 추가
    let { value } = e.target;
    if (value.length >= 3) {
      e.preventDefault();
    }
    //value가 10을 초과하면 처음에 누른 값만 저장되고 그 이후에는 저장되지 않음
    if (value > 10) {
      e.target.value = value.slice(0, 1);
      value = value.slice(0, 1);
    }

    setNum({
      ...num,
      [selectedId]: value,
    });
  };

  for (let i in num) {
    totalCPU += flavorData[i - 1].cpu * num[i];
    totalRAM += parseInt(flavorData[i - 1].flavorRam) * num[i];
    totalStorage += parseInt(flavorData[i - 1].flavorDisk) * num[i];
  }

  const numInput = (
    //input should be positive integer
    //updownkey unavailable
    <Input
      type="number"
      onKeyDown={(e) =>
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
      }
      min="0"
      onChange={handleNumChange}
    ></Input>
  );

  flavorData.map((data) => {
    data.numInput = numInput;
  });

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
                  data={flavorData}
                  header={["Name", "RAM", "DISK", "vCPU", "Num"]}
                  onClick={handleRowClick}
                />
              </TableDiv>
            </Div>
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
          </Form>
        </LeftContainer>
        <RightContainer>
          <CalendarDiv>
            <Label>Period of use</Label>
            {/* Calendar that is written in English */}
            <Calendar
              onChange={setDate}
              value={date}
              locale={"en-US"}
              className="calendar"
            />
            {/* show clicked date */}
            <p>selected Date: {date.toLocaleDateString()}</p>
          </CalendarDiv>
          <MainButton
            color={"semi-dark"}
            fullWidth={true}
            marginTop={8}
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
  height: 70%;
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
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
`;

const InputDescription = styled.textarea`
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
