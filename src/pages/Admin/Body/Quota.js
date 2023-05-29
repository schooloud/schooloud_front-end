import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import BottomModal from "../../../components/BottomModal";
import Paper from "../../../components/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";
import paginate from "../../../utils/paginate";
import removeCookies from "../../../utils/removeCookies";
import { useNavigate } from "react-router-dom";

export default function Quota() {
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState("");
  const [page, setPage] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [rejectPopUpModalOpen, setRejectPopUpModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");
  const [request, setRequest] = useState("");
  const [quotaRequestTableData, setQuotaRequestTableData] = useState([]);
  const [quotaRequestDetailData, setQuotaRequestDetailData] = useState([]);
  const queryClient = useQueryClient();

  // 쿼터 변경요청 목록 hook
  const quotaRequest = useQuery({
    queryKey: ["quotaRequestList"],
    queryFn: () => useGetApi("quota/list"),
    onSuccess: (data) => {
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
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  // 쿼터 변경요청 상세 hook
  const quotaRequestDetail = useQuery({
    queryKey: ["quotaRequestDetailList"],
    queryFn: () => useGetApi(`quota/detail/${selectedRowId}`),
    enabled: !!selectedRowId,
    onSuccess: (data) => {
      setQuotaRequestDetailData([]);
      for (let key in data.data) {
        if (key === "purpose") {
          quotaRequestDetailData["purpose"] = data.data[key];
        } else if (key === "cpu") {
          quotaRequestDetailData["requestCpu"] = data.data[key];
        } else if (key === "memory") {
          quotaRequestDetailData["requestMemory"] = data.data[key];
        } else if (key === "storage") {
          quotaRequestDetailData["requestStorage"] = data.data[key];
        } else if (key === "project_detail") {
          quotaRequestDetailData["cpuUsage"] = data.data[key].cpu_usage;
          quotaRequestDetailData["memoryUsage"] = data.data[key].memory_usage;
          quotaRequestDetailData["storageUsage"] = data.data[key].storage_usage;
          quotaRequestDetailData["cpuLimit"] = data.data[key].cpu_limit;
          quotaRequestDetailData["memoryLimit"] = data.data[key].memory_limit;
          quotaRequestDetailData["storageLimit"] = data.data[key].storage_limit;
          quotaRequestDetailData["userNum"] = data.data[key].members.length;
        }
      }
      setQuotaRequestDetailData(quotaRequestDetailData);
    },
  });

  //쿼타 승인, 반려 form
  const approveForm = {
    quota_request_id: selectedRowId,
  };

  //쿼타 승인, 반려 hook
  const approveReject = useMutation({
    mutationFn: (approveForm) => usePostApi("quota/approval", approveForm),
    onSuccess: (data) => {
      //승인요청 보냈고, 승인 완료 됐을 때
      if (
        request == "approved" &&
        data.data.message === "quota_request APPROVED"
      ) {
        alert("승인 완료 되었습니다.");
        //반려요청 보냈고, 반려 완료 됐을 때
      } else if (
        request == "rejected" &&
        data.data.message === "quota_request REJECTED"
      ) {
        alert("반려 완료 되었습니다.");
      }
      queryClient.invalidateQueries({ queryKey: ["quotaRequestList"] });
    },
    onError: () => {
      alert("승인/반려 중에 오류가 발생했습니다.");
    },
    isloading: true,
  });

  //table 행 클릭
  const handleRowClick = (id) => {
    queryClient.removeQueries({ queryKey: ["quotaRequestDetailList"] });
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

  //승인, 반려 팝업창에서 확인 버튼 클릭
  const handlePopUp = (popUpRequest) => {
    setPopUpModalOpen(false);

    if (popUpRequest && request === "approved") {
      //is_approved true 추가
      approveForm.approval = true;
      approveReject.mutate(approveForm);
      setBottomModalOpen(false);
      //승인 API
    } else if (popUpRequest && request === "rejected") {
      //is_approved true 추가
      approveForm.approval = false;
      approveReject.mutate(approveForm);
      setBottomModalOpen(false);
    }
  };

  const selectedRowName = quotaRequestTableData.find(
    (row) => row.id === selectedRowId
  )?.name;
  const waitingList = quotaRequestTableData.filter(
    (row) => row.status === "WAIT"
  );
  const processedList = quotaRequestTableData.filter(
    (row) => row.status !== "WAIT"
  );

  const handleOnClick = (id) => {};

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
      {quotaRequest.isSuccess ? (
        <Table
          data={
            toggle === "Waiting"
              ? paginate(waitingList, 5)
              : paginate(processedList, 5)
          }
          header={["Name", "Status"]}
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
          {quotaRequestDetail.isSuccess ? (
            <BodyContainer>
              <LeftBody>
                <Title>current usage</Title>
                <PaperContainer>
                  <Paper
                    title={"current usage / total CPU"}
                    usage={quotaRequestDetailData.cpuUsage}
                    total={quotaRequestDetailData.cpuLimit}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"core"}
                  ></Paper>
                  <Paper
                    title={"current usage / total RAM"}
                    usage={quotaRequestDetailData.memoryUsage}
                    total={quotaRequestDetailData.memoryLimit}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"GB"}
                  ></Paper>
                  <Paper
                    title={"current usage / total STORAGE"}
                    usage={quotaRequestDetailData.storageUsage}
                    total={quotaRequestDetailData.storageLimit}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"GB"}
                  ></Paper>
                  <Paper
                    title={"total USER"}
                    usage={quotaRequestDetailData.userNum}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={""}
                  ></Paper>
                </PaperContainer>
              </LeftBody>
              <RightBody>
                <Title>request</Title>
                <RightBodyContainer>
                  <Line className="modal" />

                  <Div>
                    <Label>Project Purpose</Label>
                    <InputContainer>
                      {quotaRequestDetailData.purpose}
                    </InputContainer>
                  </Div>
                  <Line className="modal" />

                  {/* flavor 별로 instance 몇 개가 필요한지 상세하게 보여주는 Table */}
                  {/* <Div>
                  <Label>Quota request</Label>
                  <Table
                    checkBox={false}
                    data={flavorData}
                    header={["Name", "RAM", "DISK", "vCPU", "Num"]}
                    onClick={handleOnClick}
                  />
                </Div>
                <Line className="modal" /> */}

                  <Div>
                    <Label>total CPU</Label>
                    {quotaRequestDetailData.requestCpu}
                  </Div>
                  <Line className="modal" />

                  <Div>
                    <Label>total RAM</Label>
                    {quotaRequestDetailData.requestMemory}
                  </Div>
                  <Line className="modal" />

                  <Div>
                    <Label>total STORAGE</Label>
                    {quotaRequestDetailData.requestStorage}
                  </Div>
                </RightBodyContainer>
              </RightBody>
            </BodyContainer>
          ) : (
            <LoadingOverlayWrapper>
              <LoadingOverlay />
            </LoadingOverlayWrapper>
          )}
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
  display: flex;
  align-items: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-right: 0.2rem;
`;

const ModalBody = styled.div`
  overflow: auto;
  /* 아래와 같이 수정필요 */
  margin: 0.5rem 0;
`;

const Line = styled.div`
  &.modal {
    margin: 0;
  }
  margin: 1rem 0;
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
  /* border: 1px solid blue; */
  display: flex;
  width: 100%;
  padding: 0 0.2rem;
`;

const LeftBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: visible;
  padding-right: 1rem;
`;

const RightBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  height: 100%;
  width: 50%;
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
