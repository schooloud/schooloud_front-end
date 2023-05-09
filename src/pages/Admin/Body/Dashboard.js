import React, { useState } from "react";
import styled from "styled-components";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table";

const USAGE = {
  cpu: 11,
  ram: 24,
  storage: 101,
  user: 10,
};

const TOTAL = {
  cpu: 100,
  ram: 200,
  storage: 1000,
};

const quataDummy = [
  {
    id: "1",
    name: "project3",
    status: "waiting",
    createAt: "2011-07-09",
  },
  {
    id: "2",
    name: "project2",
    status: "rejected",
    createAt: "2023-01-01",
  },
  {
    id: "3",
    name: "project1",
    status: "approved",
    createAt: "2021-09-01",
  },
  {
    id: "4",
    name: "project1",
    status: "approved",
    createAt: "2021-12-01",
  },
  {
    id: "5",
    name: "project1",
    status: "approved",
    createAt: "2021-07-01",
  },
  {
    id: "6",
    name: "project1",
    status: "approved",
    createAt: "2022-08-01",
  },
  {
    id: "7",
    name: "project1",
    status: "approved",
    createAt: "2021-12-25",
  },
];

const proposalDummy = [
  {
    id: "1",
    name: "project3",
    createdAt: "2023-05-07",
    status: "waiting",
  },
  {
    id: "2",
    name: "project2",
    createdAt: "2023-05-06",
    status: "rejected",
  },
  {
    id: "3",
    name: "project1",
    createdAt: "2023-05-05",
    status: "approved",
  },
  {
    id: "4",
    name: "project1",
    createdAt: "2023-05-05",
    status: "approved",
  },
  {
    id: "5",
    name: "project1",
    createdAt: "2023-05-05",
    status: "approved",
  },
];

export default function Dashboard() {
  const [selectedRowId, setSelectedRowId] = useState("");

  // 최근 5개만 보여주기
  const quataData = quataDummy
    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    .slice(0, 5);

  console.log(quataData);

  //data 에서 createdAt 빼기
  quataData.forEach((element) => {
    delete element.createAt;
  });

  // 최근 5개만 보여주기
  const proposalData = proposalDummy
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  //data 에서 createdAt 빼기
  proposalData.forEach((element) => {
    delete element.createdAt;
  });

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };

  return (
    <Container>
      <TitleText>DashBoard</TitleText>
      <PaperGroup>
        <Paper
          title={"current usage / total CPU"}
          usage={USAGE.cpu}
          total={TOTAL.cpu}
          width={25}
          height={10}
          unit={"core"}
        ></Paper>
        <Paper
          title={"current usage / total RAM"}
          usage={USAGE.ram}
          total={TOTAL.ram}
          width={25}
          height={10}
          unit={"GB"}
        ></Paper>
        <Paper
          title={"current usage / total STORAGE"}
          usage={USAGE.storage}
          total={TOTAL.storage}
          width={25}
          height={10}
          unit={"GB"}
        ></Paper>
        <Paper
          title={"total USER"}
          usage={USAGE.user}
          width={25}
          height={10}
        ></Paper>
      </PaperGroup>
      <TitleText2>Proposal Request</TitleText2>
      <Table
        data={quataData}
        header={["Name", "Status"]}
        onClick={handleRowClick}
        checkBox={false}
      />
      <TitleText2>Quata Request</TitleText2>
      <Table
        data={proposalData}
        header={["Name", "Status"]}
        onClick={handleRowClick}
        checkBox={false}
      />
      <SpaceDiv></SpaceDiv>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaperGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const TitleText = styled.div`
  margin-top: 1.4rem;
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const TitleText2 = styled(TitleText)`
  font-weight: 400;
`;

const SpaceDiv = styled.div`
  height: 2rem;
`;
