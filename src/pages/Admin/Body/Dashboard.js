import React, { useState } from "react";
import styled from "styled-components";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { useGetApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Dashboard() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [proposalTableData, setPropoosalTableData] = useState([]);
  const [quotaRequestTableData, setQuotaRequestTableData] = useState([]);

  //quata 사용량
  const [quotaUsage, setQuotaUsage] = useState({
    cpu: { currentCPU: "", totalCPU: "" },
    ram: { currentRAM: "", totalRAM: "" },
    storage: { currentStorage: "", totalStorage: "" },
    totalUser: "",
  });

  // 관리자 쿼터 전체 사용량 조회 hook
  const usageQuery = useQuery({
    queryKey: ["adminQuotaUsage"],
    queryFn: () => useGetApi("quota/usage"),
    onSuccess: (data) => {
      console.log(data);
      const newQuotaUsage = {
        cpu: {
          currentCPU: data.data.cpu_usage,
          totalCPU: data.data.cpu_limit,
        },
        ram: {
          currentRAM: data.data.memory_usage,
          totalRAM: data.data.memory_limit,
        },
        storage: {
          currentStorage: data.data.storage_usage,
          totalStorage: data.data.storage_limit,
        },
        totalUser: data.data.user_count,
      };
      setQuotaUsage(newQuotaUsage);
    },
  });

  //제안서 목록 가져오기 hook
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

  // 관리자 쿼터 전체 사용량 조회 hook
  const quotaRequest = useQuery({
    queryKey: ["quotaRequestList"],
    queryFn: () => useGetApi("quota/list"),
    onSuccess: (data) => {
      console.log(data);
      setQuotaRequestTableData([]);
      data.data.quota_requests.map((quotaRequest) => {
        //Table에 넣을 데이터
        const newQuotaRequestTableData = {};

        for (let key in quotaRequest) {
          //키값 변경
          if (key === "quota_request_id") {
            newQuotaRequestTableData["id"] = quotaRequest[key];
          } else if (key === "project_name") {
            newQuotaRequestTableData["name"] = quotaRequest[key];
          } else if (key === "status") {
            newQuotaRequestTableData["status"] = quotaRequest[key];
          }
        }

        setQuotaRequestTableData((oldQuotaRequestData) => [
          ...oldQuotaRequestData,
          newQuotaRequestTableData,
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

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };

  return (
    <Container>
      <TitleText>DashBoard</TitleText>
      {usageQuery.isLoading ? (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      ) : (
        <PaperGroup>
          <Paper
            title={"current usage / total CPU"}
            usage={quotaUsage.cpu.currentCPU}
            total={quotaUsage.cpu.totalCPU}
            width={17}
            height={10}
            textSize="medium"
            unit={"core"}
          ></Paper>
          <Paper
            title={"current usage / total RAM"}
            usage={quotaUsage.ram.currentRAM}
            total={quotaUsage.ram.totalRAM}
            width={17}
            height={10}
            textSize="medium"
            unit={"GB"}
          ></Paper>
          <Paper
            title={"current usage / total STORAGE"}
            usage={quotaUsage.storage.currentStorage}
            total={quotaUsage.storage.totalStorage}
            width={17}
            height={10}
            textSize="medium"
            unit={"GB"}
          ></Paper>
          <Paper
            title={"total USER"}
            usage={quotaUsage.totalUser}
            width={17}
            height={10}
            textSize="medium"
          ></Paper>
        </PaperGroup>
      )}
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
        data={quotaRequestTableData}
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
