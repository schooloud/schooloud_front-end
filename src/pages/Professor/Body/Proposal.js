import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import BottomModal from "../../../components/BottomModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Proposal() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [page, setPage] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [rejectPopUpModalOpen, setRejectPopUpModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");
  const [request, setRequest] = useState("");
  const [proposalTableData, setPropoosalTableData] = useState([]);
  const queryClient = useQueryClient();

  //승인, 반려 시 보낼 Form
  //승인, 반려 클릭시 is_approved추가되어 보내진다.
  const approveForm = {
    proposal_id: selectedRowId,
  };

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

  //제안서 승인, 반려 hook
  const approveOrNot = useMutation({
    mutationFn: (approveForm) => usePostApi("proposal/approve", approveForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      if (data.data.project_id) {
        alert("승인 완료 되었습니다.");
      } else {
        alert("반려 완료 되었습니다.");
      }
    },
    onError: () => {
      alert("승인/반려 중에 오류가 발생했습니다.");
    },
    isloading: true,
  });

  //Table row 클릭시
  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  //waiting list, processed list toggle
  const handleToggleClick = (to) => {
    setPage(0);
    setBottomModalOpen(false);
    setToggle(to);
    setSelectedRowId();
  };

  //승인, 반려 팝업
  const handleRequest = (popUpRequest) => {
    setPopUpModalOpen(true);
    setRequest(popUpRequest);
  };

  //승인, 반려 모달의 확인, 취소 버튼
  const handlePopUp = (popUpRequest) => {
    //정말 ~ 하시겠습니까 모달 닫기
    setPopUpModalOpen(false);

    //승인 API
    if (popUpRequest && request === "approved") {
      //is_approved true 추가
      approveForm.is_approved = true;
      approveOrNot.mutate(approveForm);
      setBottomModalOpen(false);
    } else if (popUpRequest && request === "rejected") {
      //반려 API
      // is_approved false 추가
      approveForm.is_approved = false;
      approveOrNot.mutate(approveForm);
      setBottomModalOpen(false);
    }
  };

  //반려 사유 입력
  // const handleReject = (popUpRequest) => {
  //   setRejectPopUpModalOpen(false);
  //   if (popUpRequest) {
  //     //반려 API, textarea 내용 가져와야함.
  //     setBottomModalOpen(false);
  //   }
  // };

  const selectedRowName = proposalTableData.find(
    (row) => row.id === selectedRowId
  )?.project_name;

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
      {isSuccess ? (
        <Table
          data={toggle === "Waiting" ? [waitingListData] : [processedListData]}
          header={["Name", "Created At", "Status"]}
          onClick={handleRowClick}
          checkBox={false}
          pagination={true}
          page={page}
          setPage={setPage}
        />
      ) : (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      )}
      <BottomModal open={bottomModalOpen} setOpen={setBottomModalOpen}>
        <TitleText className="modal">{selectedRowName}</TitleText>
        {toggle === "Waiting" && (
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
        )}
        <ModalBody>
          <SpaceDiv />
          <TextWrapper>
            <BoldText>Project Name</BoldText>
            <Text>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.project_name
              }{" "}
            </Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Project Purpose</BoldText>
            <DescText>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.purpose
              }{" "}
            </DescText>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - vCPU</BoldText>
            <Text>
              : {proposalTableData.find((row) => row.id === selectedRowId)?.cpu}{" "}
              core
            </Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - DISK</BoldText>
            <Text>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.storage
              }{" "}
              GB
            </Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - RAM</BoldText>
            <Text>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.memory
              }{" "}
              GB
            </Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Created At</BoldText>
            <Text>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.create_at
              }{" "}
            </Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Period of Use</BoldText>
            <Text>
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.end_at
              }{" "}
            </Text>
          </TextWrapper>
          <Line />
        </ModalBody>
      </BottomModal>
      <PopUpModal
        width={20}
        darkBackground={false}
        visible={popUpModalOpen}
        title={
          "정말 " + (request === "approved" ? "승인" : "반려") + "하시겠습니까?"
        }
      >
        <MainButton
          size="small"
          color="light"
          marginTop="1"
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
      {/* 반려 사유 적는 모달 */}
      {/* <PopUpModal
        width={40}
        darkBackground={false}
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
      </PopUpModal> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const TitleText = styled.div`
  //className modal
  &.modal {
    margin-left: 2rem;
  }

  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
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

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BoldText = styled.div`
  margin-left: 2rem;
  font-weight: 600;
  min-width: 8rem;
`;

const Text = styled.div`
  margin-left: 2rem;
  font-weight: 400;
`;

const DescText = styled.div`
  margin-left: 2rem;
  word-break: break-all;
  font-weight: 400;
`;
// const BodyWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 14rem;
// `;
// const Input = styled.textarea`
//   width: 33rem;
//   height: 10rem;
//   border: 0.5px solid gray;
//   border-radius: 0.3rem;
//   padding: 0.8rem 0.8rem;
// `;

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpaceDiv = styled.div`
  height: 1rem;
`;
