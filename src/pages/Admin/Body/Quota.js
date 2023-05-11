import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import BottomModal from "../../../components/BottomModal";
import Paper from "../../../components/Paper";

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

const flavorData = [
  {
    id: "1",
    flalvorName: "u2.c1m1",
    flavorRam: "1GB",
    flavorDisk: "20GB",
    cpu: 1,
    num: 1,
  },
  {
    id: "2",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
    num: 2,
  },
  {
    id: "3",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
    num: 3,
  },
];

export default function Quota() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [page, setPage] = useState(0);
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
    setPage(0);
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

  const description =
    "요청합니다 내가 이게 필요해서 요청했으니까 승인 좀 해줘 교수님아 제발제발 진짜 필요해 나 이거 없으면 안돼 대학생이 돈이 어딨어";

  const totalCPU = 7;
  const totalRAM = 14;
  const totalStorage = 70;

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
        data={toggle === "Waiting" ? [waitingList] : [processedList]}
        header={["Name", "Status"]}
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
          <BodyContainer>
            <LeftBody>
              <Title>current usage</Title>
              <PaperContainer>
                <Paper
                  title={"current usage / total CPU"}
                  usage={USAGE.cpu}
                  total={TOTAL.cpu}
                  width={25}
                  height={10}
                  textSize="small"
                  unit={"core"}
                ></Paper>
                <Paper
                  title={"current usage / total RAM"}
                  usage={USAGE.ram}
                  total={TOTAL.ram}
                  width={25}
                  height={10}
                  textSize="small"
                  unit={"GB"}
                ></Paper>
                <Paper
                  title={"current usage / total STORAGE"}
                  usage={USAGE.storage}
                  total={TOTAL.storage}
                  width={25}
                  height={10}
                  textSize="small"
                  unit={"GB"}
                ></Paper>
                <Paper
                  title={"total USER"}
                  usage={USAGE.cpu}
                  total={TOTAL.cpu}
                  width={25}
                  height={10}
                  textSize="small"
                  unit={""}
                ></Paper>
              </PaperContainer>
            </LeftBody>
            <RightBody>
              <Title>request</Title>
              <RightBodyContainer>
                <Line />

                <Div>
                  <Label>Project Purpose</Label>

                  <InputContainer>{description}</InputContainer>
                </Div>
                <Line />
                <Div>
                  <Label>Quota request</Label>

                  <Table
                    checkBox={false}
                    data={flavorData}
                    header={["Name", "RAM", "DISK", "vCPU", "Num"]}
                    onClick={() => {}}
                  />
                </Div>
                <Line />

                <Div>
                  <Label>total CPU</Label>
                  {totalCPU}
                </Div>
                <Line />

                <Div>
                  <Label>total RAM</Label>
                  {totalRAM}
                </Div>
                <Line />

                <Div>
                  <Label>total STORAGE</Label>
                  {totalStorage}
                </Div>
              </RightBodyContainer>
            </RightBody>
          </BodyContainer>
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
  margin: 0.5rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
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
  border-radius: 0.3rem;
  padding: 0.8rem 0.8rem;
`;

const BodyContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  width: 100%;
`;

const LeftBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const RightBody = styled.div`
  padding-left: 1rem;
  width: 50%;
  height: 100%;
  border-left: 1px solid #f0f0f0;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PaperContainer = styled.div`
  display: flex;
`;

const RightBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
