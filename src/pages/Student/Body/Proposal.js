import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import BottomModal from "../../../components/BottomModal";

export default function Proposal() {
  const [selectedRow, setSelectedRow] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [toggle, setToggle] = useState("Waiting");

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  const handleToggleClick = (to) => {
    setPage(0);
    setBottomModalOpen(false);
    setToggle(to);
    setSelectedRow([]);
    setSelectedRowId();
  };

  const dummy = [
    {
      id: "1",
      name: "project3",
      createdAt: "2023-05-07",
      status: "waiting",
    },
    {
      id: "2",
      name: "project2",
      createdAt: "2023-05-06",
      status: "rejected",
    },
    {
      id: "3",
      name: "project1",
      createdAt: "2023-05-05",
      status: "approved",
    },
  ];

  const selectedRowName = dummy.find((row) => row.id === selectedRowId)?.name;
  const waitingList = dummy.filter((row) => row.status === "waiting");
  const processedList = dummy.filter((row) => row.status !== "waiting");
  console.log("processedList:", processedList);
  console.log("selectedRow", selectedRow);

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
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          disabled
          marginBottom={1}
          onClick={() => console.log("키페어 삭제")}
        >
          제안서 삭제
        </MainButton>
      </ButtonContainer>
      <Table
        data={toggle === "Waiting" ? [waitingList] : [processedList]}
        header={["Name", "Created At", "Status"]}
        onClick={handleRowClick}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        pagination={true}
        page={page}
        setPage={setPage}
      />
      <BottomModal open={bottomModalOpen} setOpen={setBottomModalOpen}>
        <TitleText>{selectedRowName}</TitleText>
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
