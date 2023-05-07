import React, { useState } from "react";
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

export default function Dashboard() {
  const [memberModalopen, setMemberModalOpen] = useState(false);
  const [quataModalopen, setQuataModalOpen] = useState(false);
  const [addingMemberEmail, setAddingMemberEmail] = useState("");

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
    setQuataModalOpen(false);
  };

  //쿼터 변경 취소 버튼
  const handleQuataCancel = () => {
    setQuataModalOpen(false);
  };

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
      <BarChart
        barGap={15}
        barSize={35}
        width={1150}
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
        <Input
          type="text"
          name="name"
          value={addingMemberEmail}
          onChange={(e) => setAddingMemberEmail(e.target.value)}
        />
      </PopUpModal>
      <PopUpModal
        width={30}
        height={15}
        darkBackground={true}
        title="쿼터 변경 요청"
        onConfirm={handleQuataConfirm}
        onCancel={handleQuataCancel}
        visible={quataModalopen}
      >
        변경할 쿼터 정보를 입력하세요.
      </PopUpModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Input = styled.input`
  margin-top: 0.4rem;
  width: 18rem;
  height: 2rem;
  border: 0.5px solid var(--dark);
  border-radius: 5px;
  padding: 0 10px;
`;
