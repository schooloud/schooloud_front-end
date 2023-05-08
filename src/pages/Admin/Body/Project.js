import styled from "styled-components";
import { useState } from "react";
import Table from "../../../components/Table";
import BottomModal from "../../../components/BottomModal";

export default function Project() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  const dummy = [
    {
      id: "1",
      name: "project3",
      memberNum: "5",
    },
    {
      id: "2",
      name: "project2",
      memberNum: "4",
    },
    {
      id: "3",
      name: "project1",
      memberNum: "6",
    },
  ];

  const selectedRowName = dummy.find((row) => row.id === selectedRowId)?.name;

  return (
    <Container>
      <TitleText>Project List</TitleText>
      <Table
        data={dummy}
        header={["Name", "Member Num"]}
        onClick={handleRowClick}
        checkBox={false}
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
