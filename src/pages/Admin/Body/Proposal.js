import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import BottomModal from "../../../components/BottomModal";
import { useQuery } from "@tanstack/react-query";
import { useGetApi } from "../../../utils/http";

export default function Proposal() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [proposalTableData, setPropoosalTableData] = useState([]); //제안서 목록
  const [page, setPage] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [rejectPopUpModalOpen, setRejectPopUpModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");
  const [request, setRequest] = useState("");

  //제안서 목록 가져오기
  const { isSuccess } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => useGetApi("proposal/list"),
    onSuccess: (data) => {
      setPropoosalTableData([]);
      data.data.proposals.map((proposal) => {
        const newProposalTableData = {};

        for (let key in proposal) {
          //키값 변경
          if (key === "proposal_id") {
            newProposalTableData["id"] = proposal[key];
          } else if (key == "create_at") {
            //날짜 형식 변경
            const result = new Date(proposal[key])
              .toLocaleDateString()
              .split(".");
            newProposalTableData["create_at"] = (
              result[0] +
              "-" +
              result[1] +
              "-" +
              result[2]
            ).replace(/\s/g, "");
          } else if (key == "end_at") {
            //날짜 형식 변경
            const result = new Date(proposal[key])
              .toLocaleDateString()
              .split(".");
            newProposalTableData["end_at"] = (
              result[0] +
              "-" +
              result[1] +
              "-" +
              result[2]
            ).replace(/\s/g, "");
          } else {
            //나머지 키값 그대로
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

  // waiting list
  const waitingList = proposalTableData.filter((row) => row.status === "WAIT");
  const waitingListData = waitingList.map((row) => {
    return {
      id: row.id,
      name: row.project_name,
      createdAt: row.create_at,
      status: row.status,
    };
  });

  // processed list
  const processedList = proposalTableData.filter(
    (row) => row.status !== "WAIT"
  );
  const processedListData = processedList.map((row) => {
    return {
      id: row.id,
      name: row.project_name,
      createdAt: row.create_at,
      status: row.status,
    };
  });

  const selectedRowName = proposalTableData.find(
    (row) => row.id === selectedRowId
  )?.project_name;

  //테이블 행 클릭
  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  //waiting, processed 버튼 클릭
  const handleToggleClick = (to) => {
    setPage(0);
    setBottomModalOpen(false);
    setToggle(to);
    setSelectedRowId();
  };

  //승인, 반려 버튼 클릭
  const handleRequest = (popUpRequest) => {
    setPopUpModalOpen(true);
    setRequest(popUpRequest);
  };

  //승인, 반려 버튼 클릭 후 팝업 모달의 취소, 확인 버튼
  const handlePopUp = (popUpRequest) => {
    setPopUpModalOpen(false);

    if (popUpRequest && request === "approved") {
      setBottomModalOpen(false);
      //승인 API
    } else if (popUpRequest && request === "rejected") {
      //반려 사유 적으라는 모달 open
      setRejectPopUpModalOpen(true);
    }
  };

  //반려 사유 적으라는 모달의 취소, 확인 버튼
  const handleReject = (popUpRequest) => {
    setRejectPopUpModalOpen(false);
    if (popUpRequest) {
      //반려 API, textarea 내용 가져와야함.
      setBottomModalOpen(false);
    }
  };

  return (
    <Container>
      <TitleText>Proposal - {toggle} List</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle === "Waiting"}
          onClick={() => handleToggleClick("Waiting")}
        >
          Waiting List
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle !== "Waiting"}
          marginLeft={0.3}
          onClick={() => handleToggleClick("Processed")}
        >
          Processed List
        </MainButton>
      </ButtonContainer>
      <Line />
      <Table
        data={toggle === "Waiting" ? [waitingListData] : [processedListData]}
        header={["Name", "Created At", "Status"]}
        //행 클릭
        onClick={handleRowClick}
        checkBox={false}
        pagination={true}
        page={page}
        setPage={setPage}
      />
      <BottomModal open={bottomModalOpen} setOpen={setBottomModalOpen}>
        <TitleText>{selectedRowName}</TitleText>
        <ModalButtonContainer>
          <MainButton
            size="small"
            color="semi-light"
            onClick={() => handleRequest("rejected")}
          >
            반려
          </MainButton>
          <MainButton
            size="small"
            color="medium"
            marginLeft={0.3}
            onClick={() => handleRequest("approved")}
          >
            승인
          </MainButton>
        </ModalButtonContainer>
        <ModalBody>
          <Div>
            <Label>Project Name</Label>
            <ProjectName>
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.project_name
              }
            </ProjectName>
          </Div>
          <Line />

          <Div>
            <Label>Project Purpose</Label>
            <Description>
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.purpose
              }
            </Description>
          </Div>
          <Line />

          {/* flavor 별로 instance 몇 개가 필요한지 상세하게 보여주는 Table */}
          {/* <Div>
            <Label>Quota</Label>
            <Table
              data={flavorDataDummy}
              header={["Name", "RAM", "Disk", "CPU", "Num"]}
              onClick={() => {}}
              checkBox={false}
            />
          </Div>
          <Line /> */}

          <Div>
            <Label>total CPU</Label>
            {proposalTableData.find((row) => row.id === selectedRowId)?.cpu}
          </Div>
          <Line />

          <Div>
            <Label>total RAM</Label>
            {proposalTableData.find((row) => row.id === selectedRowId)?.memory}
          </Div>
          <Line />

          <Div>
            <Label>total STORAGE</Label>
            {proposalTableData.find((row) => row.id === selectedRowId)?.storage}
          </Div>
        </ModalBody>
      </BottomModal>
      <PopUpModal
        width={20}
        darkBackground={false}
        onCancel={false}
        onConfirm={false}
        visible={popUpModalOpen}
        title={
          "정말 " + (request === "approved" ? "승인" : "반려") + "하시겠습니까?"
        }
      >
        <MainButton
          size="small"
          color="light"
          marginTop="1"
          fontColor="var(--dark)"
          onClick={() => handlePopUp(false)}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          onClick={() => handlePopUp(true)}
        >
          확인
        </MainButton>
      </PopUpModal>
      <PopUpModal
        width={40}
        darkBackground={false}
        onCancel={false}
        onConfirm={false}
        visible={rejectPopUpModalOpen}
        title="반려 사유를 작성해주세요."
      >
        <BodyWrapper>
          <Input type="textarea" name="desc" wrap="physical" />
        </BodyWrapper>

        <MainButton
          size="small"
          color="light"
          marginTop="1"
          onClick={() => handleReject(false)}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          onClick={() => handleReject(true)}
        >
          확인
        </MainButton>
      </PopUpModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-left: 0.2rem;
`;

const ButtonContainer = styled.div`
  /* padding: 0 0.2rem; */

  display: flex;
  align-items: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const ModalBody = styled.div`
  overflow: auto;
  padding: 0 0.2rem;
  margin: 0.5rem 0;
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 14rem;
`;
const Input = styled.textarea`
  width: 100%;
  height: 10rem;
  border: 0.5px solid gray;
  border-radius: 0.3rem;
  padding: 0.8rem 0.8rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 600;
`;

const Description = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProjectName = styled.div`
  display: flex;
  align-items: flex-start;
`;
