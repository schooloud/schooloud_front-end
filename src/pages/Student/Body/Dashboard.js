import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../components/Table";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useGetApi, usePostApi } from "../../../utils/http";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import LoadingOverlay from "../../../components/LoadingOverlay";
import paginate from "../../../utils/paginate";
import BottomModal from "../../../components/BottomModal";

export default function Dashboard() {
  const [memberModalopen, setMemberModalOpen] = useState(false);
  const [quataModalopen, setQuataModalOpen] = useState(false);
  const [addingMemberEmail, setAddingMemberEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [quotaRequestTableData, setQuotaRequestTableData] = useState([]);
  const [quotaRequestDetailData, setQuotaRequestDetailData] = useState({});
  const [quotaRequestListModal, setQuotaRequestListModal] = useState(false);
  const [quotaDetail, setQuotaDetail] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [flavorList, setFlavorList] = useState([]);
  const [page, setPage] = useState(0);
  const [quotaPage, setQuotaPage] = useState(0);
  //array that stores the selectedId and the number of instances selected by the user
  const [num, setNum] = useState([]);
  // charData
  const [quotaData, setQuataData] = useState([]);
  // memberData
  const [member, setMember] = useState([]);
  const params = useParams();

  //쿼터 변경 요청 form
  const quotaChangeForm = {
    project_id: params.projectId,
    purpose: "",
    memory: "",
    cpu: "",
    storage: "",
  };

  // 멤버 추가 form
  const addMemberForm = {
    project_id: params.projectId,
    email: "",
  };

  // 프로젝트 상세 조회 hook
  const projectDetailHook = useQuery({
    queryKey: ["projectDetail"],
    queryFn: () => useGetApi(`project/detail/${params.projectId}`),
    enabled: !!params.projectId,
    onSuccess: (data) => {
      setQuataData([]);
      setMember([]);

      //멤버 정보를 member에 저장
      data.data.members.map((newMember, index) => {
        const newMemberObj = {};
        newMemberObj["id"] = index + 1;
        newMemberObj["No"] = index + 1;
        newMemberObj["name"] = newMember.name;
        newMemberObj["email"] = newMember.email;
        setMember((oldMember) => [...oldMember, newMemberObj]);
      });
      //쿼터 정보를 quotaData에 저장
      const newQuotaData = [];
      const newQuotaObj = {};
      newQuotaObj["name"] = "CPU";
      newQuotaObj["total"] = data.data.cpu_limit;
      newQuotaObj["usage"] = data.data.cpu_usage;
      newQuotaData.push(newQuotaObj);
      const newQuotaObj2 = {};
      newQuotaObj2["name"] = "RAM";
      newQuotaObj2["total"] = data.data.memory_limit;
      newQuotaObj2["usage"] = data.data.memory_usage;
      newQuotaData.push(newQuotaObj2);
      const newQuotaObj3 = {};
      newQuotaObj3["name"] = "STORAGE";
      newQuotaObj3["total"] = data.data.storage_limit;
      newQuotaObj3["usage"] = data.data.storage_usage;
      newQuotaData.push(newQuotaObj3);
      setQuataData(newQuotaData);
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  // flavor list의 input 입력 시
  const handleNumChange = (e) => {
    //num 객체에 selectedId와 num을 추가
    let { value, id } = e.target;
    if (value.length >= 3) {
      e.preventDefault();
    }
    //value가 10을 초과하면 처음에 누른 값만 저장되고 그 이후에는 저장되지 않음
    if (value > 10) {
      e.target.value = value.slice(0, 1);
      value = value.slice(0, 1);
    }
    //value가 없으면, num에서 해당 id를 삭제
    if (value === "" || value === "0") {
      setNum((oldNum) => {
        const newNum = { ...oldNum };
        delete newNum[id];
        return newNum;
      });
      return;
    }
    setNum((oldNum) => {
      return { ...oldNum, [id]: Number(value) };
    });
  };

  // flavor list hook
  useQuery({
    queryKey: ["flavors"],
    queryFn: () => useGetApi("flavor/list"),
    onSuccess: (data) => {
      setFlavorList([]);
      data.data.flavors.map((newFlavor, index) => {
        const newFlavorObj = {};

        newFlavorObj["id"] = index;
        newFlavorObj["flalvorName"] = newFlavor.name;
        newFlavorObj["flavorRam"] = newFlavor.ram;
        newFlavorObj["flavorDisk"] = newFlavor.disk;
        newFlavorObj["cpu"] = Number(newFlavor.cpu);

        const numInput = (
          //input should be positive integer
          //updownkey unavailable
          <Input
            defaultValue={0}
            type="number"
            id={index}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            min="0"
            onChange={handleNumChange}
          ></Input>
        );

        newFlavorObj["numInput"] = numInput;

        setFlavorList((oldFlavor) => [...oldFlavor, newFlavorObj]);
      });
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  // 쿼터 변경요청 목록 hook
  const quotaRequest = useQuery({
    queryKey: ["quotaRequestList"],
    queryFn: () => useGetApi("quota/list"),
    onSuccess: (data) => {
      setQuotaRequestTableData([]);
      data.data.quota_requests.map((quotaRequest, index) => {
        //Table에 넣을 데이터
        const newQuotaRequestTableData = {};

        const date = new Date(quotaRequest.create_at);

        newQuotaRequestTableData["id"] = quotaRequest.quota_request_id;
        newQuotaRequestTableData["no"] = index + 1;
        newQuotaRequestTableData["create_at"] = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        newQuotaRequestTableData["status"] = quotaRequest.status;

        setQuotaRequestTableData((oldQuotaRequestData) => [
          ...oldQuotaRequestData,
          newQuotaRequestTableData,
        ]);
      });
    },
  });

  // quotaRequestDetail hook
  const quotaRequestDetailQuery = useQuery({
    queryKey: ["quotaRequestDetail"],
    queryFn: () => useGetApi(`quota/detail/${quotaDetail}`),
    enabled: quotaDetail !== "",
    onSuccess: (data) => {
      const newQuotaRequestData = {};

      const date = new Date(data.data.create_at);
      newQuotaRequestData["purpose"] = data.data.purpose;
      newQuotaRequestData["memory"] = data.data.memory;
      newQuotaRequestData["cpu"] = data.data.cpu;
      newQuotaRequestData["storage"] = data.data.storage;
      newQuotaRequestData["create_at"] = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      newQuotaRequestData["status"] = data.data.status;

      setQuotaRequestDetailData(newQuotaRequestData);
    },
  });

  //쿼터 변경 요청 hook
  const changeQuataHook = useMutation({
    mutationFn: (form) => usePostApi("quota/request", form),
    onSuccess: () => {
      alert("변경 요청 성공");
      setQuataModalOpen(false);
    },
    onError: () => {
      alert("변경 요청 실패.");
      setQuataModalOpen(false);
    },
  });

  // 멤버 추가 hook
  const addMemberHook = useMutation({
    mutationFn: (form) => usePostApi("project/add-member", form),
    onSuccess: () => {
      alert("멤버 추가 성공!");
    },
    onError: () => {
      alert("멤버 추가 실패!");
    },
  });

  //멤버 초대 버튼
  const handleMemberClick = () => {
    setMemberModalOpen(true);
  };

  //쿼터 변경 취소 버튼
  const handleQuataCancel = () => {
    setQuataModalOpen(false);
  };

  //멤버 추가 확인 버튼
  const handleMemberConfirm = () => {
    addMemberForm.email = addingMemberEmail;
    addMemberHook.mutate(addMemberForm);
    setMemberModalOpen(false);
    setAddingMemberEmail("");
  };

  //멤버 추가 취소 버튼
  const handleMemberCancel = () => {
    setMemberModalOpen(false);
  };

  //멤버 추가 input
  const handleAddingMember = (e) => {
    e.preventDefault();
    setAddingMemberEmail(e.target.value);
  };

  //쿼터 변경 버튼
  const handleQuataClick = () => {
    setQuataModalOpen(true);
  };

  //쿼터 변경 확인 버튼
  const handleQuataConfirm = () => {
    quotaChangeForm.cpu = totalCPU;
    quotaChangeForm.memory = totalRAM;
    quotaChangeForm.storage = totalStorage;
    quotaChangeForm.purpose = projectDescription;
    console.log(quotaChangeForm);
    changeQuataHook.mutate(quotaChangeForm);
  };

  //쿼터 변경 목적 input
  const handleInputDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  //Table row 클릭 시 해당 row의 id를 selectedId에 저장
  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleQuotaRowClick = (id) => {
    setQuotaDetail(id);
  };

  let totalCPU = 0;
  let totalRAM = 0;
  let totalStorage = 0;

  // chart 가로, 세로 설정
  // 16 * (window.screen.width / 1440) = 1rem
  const chartWidth =
    window.screen.width - 16 * (window.screen.width / 1440) * 18;
  const chartHeight = 16 * (window.screen.width / 1440) * 25;

  for (let i in num) {
    if (flavorList[i].flavorRam.includes("MB")) {
      totalRAM += (parseInt(flavorList[i].flavorRam) / 1024) * num[i];
    } else {
      totalRAM += parseInt(flavorList[i].flavorRam) * num[i];
    }
    totalCPU += flavorList[i].cpu * num[i];
    totalStorage += parseInt(flavorList[i].flavorDisk) * num[i];
  }

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
      {projectDetailHook.isLoading ? (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      ) : (
        <Table
          checkBox={false}
          data={paginate(member, 3)}
          header={["No", "Name", "e-mail"]}
          onClick={() => {}}
          page={page}
          setPage={setPage}
          pagination={true}
        />
      )}
      <TitleText3>Quota Usage</TitleText3>
      <MainButtonDiv>
        <MainButton
          size="small"
          color="medium"
          onClick={handleQuataClick}
          fullWidth={false}
        >
          쿼터 변경
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          onClick={() => setQuotaRequestListModal(true)}
          fullWidth={false}
          marginLeft={0.3}
        >
          쿼터 변경 요청 리스트
        </MainButton>
      </MainButtonDiv>
      {projectDetailHook.isLoading ? (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      ) : (
        <ChartContainer>
          <BarChart
            barGap={15}
            barSize={35}
            width={chartWidth}
            height={chartHeight}
            data={quotaData}
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
      )}
      <BottomModal
        open={quotaRequestListModal}
        setOpen={setQuotaRequestListModal}
      >
        <TitleText>Quota Request List</TitleText>
        {quotaDetail === "" ? (
          <Table
            checkBox={false}
            data={paginate(quotaRequestTableData, 3)}
            header={["No", "Project Name", "Status"]}
            onClick={handleQuotaRowClick}
            page={quotaPage}
            setPage={setQuotaPage}
            pagination={true}
          />
        ) : !!quotaRequestDetailData?.purpose ? (
          <div>
            <MainButton
              MainButton
              size="small"
              color="medium"
              onClick={() => {
                setQuotaDetail("");
                setQuotaRequestDetailData({});
              }}
            >
              뒤로가기
            </MainButton>
            <Line />
            <TextWrapper>
              <BoldText>Purpose</BoldText>
              <Text>: {quotaRequestDetailData?.purpose}</Text>
            </TextWrapper>
            <Line />
            <TextWrapper>
              <BoldText>Memory</BoldText>
              <Text>: {quotaRequestDetailData?.memory}&nbsp;GB</Text>
            </TextWrapper>
            <Line />
            <TextWrapper>
              <BoldText>vCPU</BoldText>
              <Text>: {quotaRequestDetailData?.cpu}&nbsp;core</Text>
            </TextWrapper>
            <Line />
            <TextWrapper>
              <BoldText>Storage</BoldText>
              <Text>: {quotaRequestDetailData?.storage}&nbsp;GB</Text>
            </TextWrapper>
            <Line />
            <TextWrapper>
              <BoldText>Created_At</BoldText>
              <Text>: {quotaRequestDetailData?.create_at}</Text>
            </TextWrapper>
            <Line />
            <TextWrapper>
              <BoldText>Status</BoldText>
              <Text>: {quotaRequestDetailData?.status}</Text>
            </TextWrapper>
            <Line />
          </div>
        ) : (
          <LoadingOverlay />
        )}
      </BottomModal>
      <PopUpModal
        width={35}
        height={14}
        darkBackground={true}
        title="멤버 추가"
        onConfirm={handleMemberConfirm}
        onCancel={handleMemberCancel}
        visible={memberModalopen}
      >
        추가할 멤버의 이메일을 입력하세요.<br></br>
        <InputMember
          type="text"
          name="name"
          value={addingMemberEmail}
          onChange={handleAddingMember}
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
              data={flavorList}
              header={["Name", "RAM", "DISK", "vCPU", "Num"]}
              onClick={handleRowClick}
            />
          </TableDiv>
        </Div>
        <Div>
          <Label>total CPU</Label>
          {totalCPU}&nbsp;core
        </Div>
        <Div>
          <Label>total RAM</Label>
          {totalRAM}&nbsp;GB
        </Div>
        <Div>
          <Label>total STORAGE</Label>
          {totalStorage}&nbsp;GB
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
  margin-top: 1rem;
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

const Input = styled.input`
  width: 3rem;
  height: 1.4rem;
  border: 0.7px solid var(--dark);
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 8rem;
`;
const Text = styled.div`
  margin-left: 2rem;
  font-weight: 400;
`;
