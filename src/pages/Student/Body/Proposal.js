import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import BottomModal from "../../../components/BottomModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";
import paginate from "../../../utils/paginate";
import removeCookies from "../../../utils/removeCookies";
import { useNavigate } from "react-router-dom";
export default function Proposal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //check box 선택된 행
  const [selectedRow, setSelectedRow] = useState([]);
  const [page, setPage] = useState(0);
  //클릭된 행
  const [selectedRowId, setSelectedRowId] = useState("");
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");
  //제안서 목록
  const [proposalTableData, setPropoosalTableData] = useState([]);

  //클릭된 행 id => bottomModal에 표시
  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  //waiting List, progress List
  const handleToggleClick = (to) => {
    setPage(0);
    setBottomModalOpen(false);
    setToggle(to);
    setSelectedRow([]);
    setSelectedRowId();
  };

  //제안서 목록 가져오기
  const { isSuccess } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => useGetApi("proposal/list"),
    onSuccess: (data) => {
      setPropoosalTableData([]);
      data.data.proposals.map((proposal) => {
        const newProposalTableData = {};
        const created_date = new Date(proposal.create_at);
        const end_date = new Date(proposal.end_at);

        for (let key in proposal) {
          //키값 변경
          if (key === "proposal_id") {
            newProposalTableData["id"] = proposal[key];
          } else if (key === "create_at") {
            //날짜 형식 변경
            newProposalTableData["create_at"] =
              created_date.getFullYear() +
              "-" +
              (created_date.getMonth() + 1) +
              "-" +
              (created_date.getDate() - 1);
          } else if (key === "end_at") {
            //날짜 형식 변경
            newProposalTableData["end_at"] =
              end_date.getFullYear() +
              "-" +
              (end_date.getMonth() + 1) +
              "-" +
              end_date.getDate();
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
    retry: 1,
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  // 제안서 삭제 hook
  const proposalDelete = useMutation({
    mutationFn: (id) => usePostApi("proposal/delete", { proposal_id: id }),
    onSuccess: () => {
      //삭제 후 제안서 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      alert("제안서 삭제를 완료했습니다.");
    },
    onError: () => {
      alert("제안서 삭제를 실패했습니다.");
    },
  });

  //제안서 삭제클릭
  const handleProposalDelete = () => {
    selectedRow.map((id) => {
      proposalDelete.mutate(id);
    });
    setSelectedRow([]);
  };

  //클릭한 제안서 이름
  const selectedRowName = proposalTableData.find(
    (row) => row.id === selectedRowId
  )?.project_name;

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
      {toggle === "Waiting" && (
        <ButtonContainer>
          <MainButton
            size="small"
            color="medium"
            //selectedRow의 길이가 0이거나 proposalData의 id가 selectedRow인 데이터의 status가 APPROVED인 것이 포함돼있으면 삭제 불가능
            disabled={selectedRow.length === 0}
            onClick={() => handleProposalDelete()}
            marginBottom={1}
          >
            제안서 삭제
          </MainButton>
        </ButtonContainer>
      )}
      {isSuccess ? (
        <Table
          checkBox={toggle === "Waiting" ? true : false}
          data={
            toggle === "Waiting"
              ? paginate(waitingListData, 3)
              : paginate(processedListData, 3)
          }
          header={["Name", "Created At", "Status"]}
          //행 클릭 했을 때
          onClick={handleRowClick}
          //check box 클릭 했을 때
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
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
        <ModalBody>
          <TextWrapper>
            <BoldText>Project Name</BoldText>
            <Text>: {selectedRowName}</Text>
          </TextWrapper>
          <Line />
          <TextWrapper>
            <BoldText>Project Purpose</BoldText>
            <DescText>
              {" "}
              :{" "}
              {
                proposalTableData.find((row) => row.id === selectedRowId)
                  ?.purpose
              }
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
              }
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
              }
            </Text>
          </TextWrapper>
          <Line />
        </ModalBody>
      </BottomModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const TitleText = styled.div`
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

const ModalBody = styled.div`
  overflow: auto;
  margin-top: 1.5rem;
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
