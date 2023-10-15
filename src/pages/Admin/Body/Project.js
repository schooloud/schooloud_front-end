import styled from "styled-components";
import { useState } from "react";
import Table from "../../../components/Table";
import BottomModal from "../../../components/BottomModal";
import Paper from "../../../components/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";
import paginate from "../../../utils/paginate";
import removeCookies from "../../../utils/removeCookies";
import { useNavigate } from "react-router-dom";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";

export default function Project() {
  const navigate = useNavigate();
  const [selectedRowId, setSelectedRowId] = useState("");
  const [page, setPage] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [member, setMember] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  //프로젝트 리스트 hook
  const projectList = useQuery({
    queryKey: ["projects"],
    queryFn: () => useGetApi("project/list"),
    onSuccess: (data) => {
      setProjects([]);
      data.data.projects.map((project, index) => {
        const newProject = {};
        newProject["id"] = index + 1;
        for (let key in project) {
          newProject[key] = project[key];
        }
        setProjects((oldProjects) => [...oldProjects, newProject]);
      });
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  //table에 표시할 데이터
  const projectTableData = projects.map((project) => {
    return {
      id: project.id,
      name: project.project_name,
      member: project.member_count,
    };
  });

  // 프로젝트 삭제 hook
  const deleteProjectMutation = useMutation({
    mutationFn: (deleteForm) => usePostApi("project/delete", deleteForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (data) {
        alert(data.data.message);
      }
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },

    isloading: true,
  });

  //삭제 popUpModal
  const handleDeleteModalOpen = () => {
    setModalOpen(true);
  };

  //승인, 반려 모달의 확인, 취소 버튼
  const handlePopUp = (popUpRequest) => {
    //정말 ~ 하시겠습니까 모달 닫기
    setModalOpen(false);

    //삭제 API
    if (popUpRequest) {
      // 삭제할 프로젝트의 id
      const deleteProjectId = projects[selectedRowId - 1]?.project_id || "";
      console.log("삭제할 프로젝트 id는" + deleteProjectId);

      deleteProjectMutation.mutate({ project_id: deleteProjectId });
      setBottomModalOpen(false);
    }
  };

  //selectedRowId의 프로젝트id가져오기
  const projectId = projects[selectedRowId - 1]?.project_id || "";
  //table에서 선택한 row의 프로젝트 이름 가져오기
  const selectedRowName = projectTableData.find(
    (row) => row.id === selectedRowId
  )?.name;

  //프로젝트 상세 조회 hook
  const projectDetailHook = useQuery({
    queryKey: ["projectDetail"],
    queryFn: () => useGetApi(`project/detail/${projectId}`),
    enabled: !!projectId,
    onSuccess: (data) => {
      setProjectDetail({});
      setMember([]);
      const end_date = new Date(data.data.end_at);
      const created_date = new Date(data.data.create_at);

      //멤버 정보를 member에 저장
      data.data.members.map((newMember, index) => {
        const newMemberObj = {};
        newMemberObj["id"] = index + 1;
        newMemberObj["name"] = newMember.name;
        newMemberObj["email"] = newMember.email;
        setMember((oldMember) => [...oldMember, newMemberObj]);
      });
      // 프로젝트 정보를 projectDetail에 저장
      const newProjectDetail = {};
      for (let key in data.data) {
        if (key === "end_at") {
          newProjectDetail["end_at"] = `${end_date.getFullYear()}-${
            end_date.getMonth() + 1
          }-${end_date.getDate()}`;
        } else if (key === "create_at") {
          newProjectDetail["create_at"] = `${created_date.getFullYear()}-${
            created_date.getMonth() + 1
          }-${created_date.getDate() - 1}`;
        } else {
          newProjectDetail[key] = data.data[key];
        }
      }
      setProjectDetail(newProjectDetail);
    },
  });

  const handleRowClick = (id) => {
    queryClient.removeQueries({ queryKey: ["projectDetail"] });
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  return (
    <Container>
      <TitleText>Project List</TitleText>
      {projectList.isSuccess ? (
        <Table
          data={paginate(projectTableData, 5)}
          header={["Name", "Member Num"]}
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
        <ModalBody>
          {projectDetailHook.isSuccess ? (
            <BodyContainer>
              <LeftBody>
                <Title>Information</Title>
                <Line className="modal" />
                <Div>
                  <Label>quata</Label>
                  <PaperContainer>
                    <Paper
                      title={"current usage / total CPU"}
                      usage={projectDetail.cpu_usage}
                      total={projectDetail.cpu_limit}
                      width={7.5}
                      height={10}
                      textSize="small"
                      unit={"core"}
                    ></Paper>
                    <Paper
                      title={"current usage / total RAM"}
                      usage={projectDetail.memory_usage}
                      total={projectDetail.memory_limit}
                      width={7.5}
                      height={10}
                      textSize="small"
                      unit={"GB"}
                    ></Paper>
                    <Paper
                      title={"current usage / total STORAGE"}
                      usage={projectDetail.storage_usage}
                      total={projectDetail.storage_limit}
                      width={7.5}
                      height={10}
                      textSize="small"
                      unit={"GB"}
                    ></Paper>
                    <Paper
                      title={"total USER"}
                      usage={member.length}
                      width={7.5}
                      height={10}
                      textSize="small"
                      unit={""}
                    ></Paper>
                  </PaperContainer>
                </Div>
                <Line className="modal" />

                <Div>
                  <Label>created at</Label>
                  <TextField>{projectDetail.create_at}</TextField>
                </Div>
                <Line className="modal" />

                <Div>
                  <Label>end date</Label>
                  <TextField>{projectDetail.end_at}</TextField>
                </Div>
              </LeftBody>
              <RightBody>
                <Title>Member</Title>
                <RightBodyContainer>
                  <Table
                    checkBox={false}
                    data={member}
                    header={["Name", "e-mail"]}
                    onClick={() => {}}
                  />
                  <MainButton
                    marginTop={1}
                    size="medium"
                    color="medium"
                    onClick={() => handleDeleteModalOpen()}
                  >
                    프로젝트 삭제
                  </MainButton>
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
        visible={modalOpen}
        title={"정말 삭제 하시겠습니까?"}
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
`;

const ModalBody = styled.div`
  overflow: auto;
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
  border-right: 1px solid #f0f0f0;
`;

const RightBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  height: 100%;
  width: 50%;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PaperContainer = styled.div`
  display: flex;
`;

// 자식들을 column방향으로 양 끝에 배치하고싶어.
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

const TextField = styled.div`
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
