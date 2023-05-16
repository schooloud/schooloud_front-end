import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Table from "../../../components/Table";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const instanceData = [
  {
    id: "1",
    no: "1",
    name: "이예림",
    e_mail: "dPfla@naver.com",
  },
  {
    id: "2",
    no: "2",

    name: "정세벽",
    e_mail: "dPfla@naver.com",
  },
  {
    id: "3",
    no: "3",
    name: "유준호",
    e_mail: "dPfla@naver.com",
  },
  {
    id: "4",
    no: "4",
    name: "이수인",
    e_mail: "dPfla@naver.com",
  },
  {
    id: "5",
    no: "5",
    name: "김석희",
    e_mail: "cat1181123@naver.com",
  },
];
const data = [
  {
    name: "CPU",
    total: 4000,
    usage: 2400,
  },
  {
    name: "RAM",
    total: 3000,
    usage: 1398,
  },
  {
    name: "STORAGE",
    total: 9800,
    usage: 8000,
  },
];

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

export default function Dashboard() {
  const [memberModalopen, setMemberModalOpen] = useState(false);
  const [quataModalopen, setQuataModalOpen] = useState(false);
  const [addingMemberEmail, setAddingMemberEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedId, setSelectedId] = useState();

  const handleMemberClick = () => {
    setMemberModalOpen(true);
  };

  const handleQuataClick = () => {
    setQuataModalOpen(true);
  };

  //멤버 추가 확인 버튼
  const handleMemberConfirm = () => {
    setMemberModalOpen(false);
  };

  //멤버 추가 취소 버튼
  const handleMemberCancel = () => {
    setMemberModalOpen(false);
  };

  //쿼터 변경 확인 버튼
  const handleQuataConfirm = () => {
    console.log("확인");
    setQuataModalOpen(false);
  };

  //쿼터 변경 취소 버튼
  const handleQuataCancel = () => {
    console.log("취소");
    setQuataModalOpen(false);
  };

  const handleInputDescriptionChange = useCallback((e) => {
    setProjectDescription(e.target.value);
  }, []);

  const handleRowClick = (id) => {
    setSelectedId(id);
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

  // const table = document.querySelector("table");
  // const tableWidth = table.offsetWidth;
  // console.log(tableWidth + "px");

  const chartWidth =
    window.screen.width - 16 * (window.screen.width / 1440) * 18;

  for (let i in num) {
    totalCPU += flavorData[i - 1].cpu * num[i];
    totalRAM += parseInt(flavorData[i - 1].flavorRam) * num[i];
    totalStorage += parseInt(flavorData[i - 1].flavorDisk) * num[i];
  }

  const numInput = (
    //input should be positive integer
    //updownkey unavailable
    <InputNum
      type="number"
      onKeyDown={(e) =>
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
      }
      min="0"
      onChange={handleNumChange}
    ></InputNum>
  );

  flavorData.map((data) => {
    data.numInput = numInput;
  });

  return (
    <Container>
      <TitleText>DashBoard</TitleText>
      <TitleText2>Member</TitleText2>
      <MainButtonDiv>
        <MainButton
          size="small"
          color="medium"
          onClick={handleMemberClick}
          fullWidth={false}
        >
          멤버 초대
        </MainButton>
      </MainButtonDiv>
      <Table
        id="thisTable"
        checkBox={false}
        data={instanceData}
        header={["No", "Name", "e-mail"]}
        onClick={() => console.log("click")}
      />
      <TitleText3>Quata Usage</TitleText3>
      <MainButtonDiv>
        <MainButton
          size="small"
          color="medium"
          onClick={handleQuataClick}
          fullWidth={false}
        >
          쿼터 변경
        </MainButton>
      </MainButtonDiv>
      <ChartContainer>
        <BarChart
          barGap={15}
          barSize={35}
          width={chartWidth}
          height={500}
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend align="left" />
          <Bar dataKey="usage" fill="#AAD8A1" />
          <Bar dataKey="total" fill="#2D791E" />
        </BarChart>
      </ChartContainer>
      <PopUpModal
        width={35}
        height={14}
        darkBackground={true}
        title="멤버 추가"
        onConfirm={handleMemberConfirm}
        onCancel={handleMemberCancel}
        visible={memberModalopen}
      >
        추가할 멤버의 이메일을 입력하세요.
        <InputMember
          type="text"
          name="name"
          value={addingMemberEmail}
          onChange={(e) => setAddingMemberEmail(e.target.value)}
        />
      </PopUpModal>
      <PopUpModal
        width={40}
        height={40}
        darkBackground={true}
        title="쿼터 변경 요청"
        onConfirm={false}
        onCancel={false}
        visible={quataModalopen}
      >
        추가할 쿼터 정보를 입력하세요.
        <Div>
          <Label>Project Purpose</Label>
          <Label2>
            Make sure that your description is as detailed as possible
          </Label2>
          <InputContainer>
            <InputDescription
              onChange={handleInputDescriptionChange}
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
        <ButtonGroup>
          <MainButton
            size="small"
            marginRight={0.5}
            color="light"
            fontColor="var(--dark)"
            onClick={handleQuataCancel}
          >
            취소
          </MainButton>
          <MainButton size="small" color="main" onClick={handleQuataConfirm}>
            확인
          </MainButton>
        </ButtonGroup>
      </PopUpModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const TitleText2 = styled(TitleText)`
  font-weight: 400;
`;

const TitleText3 = styled(TitleText)`
  font-weight: 400;
  margin-top: 2rem;
`;

const MainButtonDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const InputMember = styled.input`
  margin-top: 0.4rem;
  width: 18rem;
  height: 2rem;
  border: 0.5px solid var(--dark);
  border-radius: 5px;
  padding: 0 0.5rem;
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

const InputDescription = styled.textarea`
  width: 100%;
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const TableDiv = styled.div`
  width: 100%;
`;

const InputNum = styled.input`
  width: 3rem;
  height: 1.4rem;
  border: 0.5px solid var(--dark);
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ChartContainer = styled.div`
  width: 100%;
`;
