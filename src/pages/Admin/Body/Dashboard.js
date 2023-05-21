import React, { useState } from "react";
import styled from "styled-components";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table";
import { useQuery } from "react-query";
import { useGetApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";

const USAGE = {
  cpu: 11,
  ram: 24,
  storage: 101,
  user: 10,
};

const TOTAL = {
  cpu: 100,
  ram: 200,
  storage: 100,
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

export default function Dashboard() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [proposalTableData, setPropoosalTableData] = useState([]);

  //제안서 목록 가져오기
  const { isSuccess } = useQuery({
    queryKey: ["adminProposals"],
    queryFn: () => useGetApi("proposal/list"),
    onSuccess: (data) => {
      setPropoosalTableData([]);
      data.data.proposals.map((proposal) => {
        //Table에 넣을 데이터
        const newProposalTableData = {};

        for (let key in proposal) {
          //키값 변경
          if (key === "proposal_id") {
            newProposalTableData["id"] = proposal[key];
          }
          //project_name 이랑 status만 가져오기
          else if (
            key === "project_name" ||
            key === "status" ||
            key === "create_at"
          ) {
            newProposalTableData[key] = proposal[key];
          }
        }

        setPropoosalTableData((oldProposalData) => [
          ...oldProposalData,
          newProposalTableData,
        ]);
      });
    },
  });

  // 최근 5개만 보여주기
  const proposalData = proposalTableData
    .sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
    .slice(0, 5);

  //data 에서 createdAt 빼기
  proposalData.forEach((element) => {
    delete element.create_at;
  });

  // 최근 5개만 보여주기
  const quataData = quataDummy
    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    .slice(0, 5);

  //data 에서 createdAt 빼기
  quataData.forEach((element) => {
    delete element.createAt;
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
          width={17}
          height={10}
          textSize="medium"
          unit={"core"}
        ></Paper>
        <Paper
          title={"current usage / total RAM"}
          usage={USAGE.ram}
          total={TOTAL.ram}
          width={17}
          height={10}
          textSize="medium"
          unit={"GB"}
        ></Paper>
        <Paper
          title={"current usage / total STORAGE"}
          usage={USAGE.storage}
          total={TOTAL.storage}
          width={17}
          height={10}
          textSize="medium"
          unit={"GB"}
        ></Paper>
        <Paper
          title={"total USER"}
          usage={USAGE.user}
          width={17}
          height={10}
          textSize="medium"
        ></Paper>
      </PaperGroup>
      <TitleText2>Proposal Request</TitleText2>
      {isSuccess ? (
        <Table
          data={proposalData}
          header={["Name", "Status"]}
          onClick={handleRowClick}
          checkBox={false}
        />
      ) : (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      )}
      <TitleText2>Quata Request</TitleText2>
      <Table
        data={quataData}
        header={["Name", "Status"]}
        onClick={() => {}}
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
