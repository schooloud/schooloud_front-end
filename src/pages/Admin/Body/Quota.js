import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import BottomModal from "../../../components/BottomModal";

export default function Quota() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [rejectPopUpModalOpen, setRejectPopUpModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");
  const [request, setRequest] = useState("");

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  const handleToggleClick = (to) => {
    setBottomModalOpen(false);
    setToggle(to);
    setSelectedRowId();
  };

  const handleRequest = (popUpRequest) => {
    setPopUpModalOpen(true);
    setRequest(popUpRequest);
  };

  const handlePopUp = (popUpRequest) => {
    setPopUpModalOpen(false);

    if (popUpRequest && request === "approved") {
      setBottomModalOpen(false);
      //승인 API
    } else if (popUpRequest && request === "rejected") {
      setRejectPopUpModalOpen(true);
    }
  };

  const handleReject = (popUpRequest) => {
    setRejectPopUpModalOpen(false);
    if (popUpRequest) {
      //반려 API, textarea 내용 가져와야함.
      setBottomModalOpen(false);
    }
  };

  const dummy = [
    {
      id: "1",
      name: "project3",
      status: "waiting",
    },
    {
      id: "2",
      name: "project2",
      status: "rejected",
    },
    {
      id: "3",
      name: "project1",
      status: "approved",
    },
  ];

  const selectedRowName = dummy.find((row) => row.id === selectedRowId)?.name;
  const waitingList = dummy.filter((row) => row.status === "waiting");
  const processedList = dummy.filter((row) => row.status !== "waiting");

  return (
    <Container>
      <TitleText>Quota Changing Request - {toggle} List</TitleText>
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
        data={toggle === "Waiting" ? waitingList : processedList}
        header={["Name", "Status"]}
        onClick={handleRowClick}
        checkBox={false}
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
          <Line />
          <TextWrapper>
            <BoldText>Project Name</BoldText>
            <Text>: {selectedRowName}</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Project Purpose</BoldText>
            <DescText>
              : 저는 이 프로젝트를 수행하기 위해서 꼭 이 인스턴스가 필요해요우
              살려주세요우 한번만 바주셍요 젭라
            </DescText>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - vCPU</BoldText>
            <Text>: 10</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - DISK</BoldText>
            <Text>: 200GB</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Quota - RAM</BoldText>
            <Text>: 4GB</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Created At</BoldText>
            <Text>: 2023-05-08</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Period of Use</BoldText>
            <Text>: 2023-12-31</Text>
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
      <PopUpModal
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
const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 14rem;
`;
const Input = styled.textarea`
  width: 33rem;
  height: 10rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 0.8rem 0.8rem;
`;
