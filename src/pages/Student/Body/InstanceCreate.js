import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";

const dummy = [
  {
    id: "1",
    name: "Ubuntu Server 20.04 LTS",
    desc: "Ubuntu Server 20.04 LTS(2023.03.21)",
    minblock: "20 GB",
    bit: "64 BIT",
  },
  {
    id: "2",
    name: "Ubuntu Server 20.04 LTS",
    desc: "Ubuntu Server 20.04 LTS(2023.03.21)",
    minblock: "20 GB",
    bit: "64 BIT",
  },
  {
    id: "3",
    name: "Ubuntu Server 20.04 LTS",
    desc: "Ubuntu Server 20.04 LTS(2023.03.21)",
    minblock: "20 GB",
    bit: "64 BIT",
  },
  {
    id: "4",
    name: "Ubuntu Server 20.04 LTS",
    desc: "Ubuntu Server 20.04 LTS(2023.03.21)",
    minblock: "20 GB",
    bit: "64 BIT",
  },
];

const dummy2 = [
  {
    id: "1",
    type: "t2",
    name: "t2.c1m1",
    vCPU: "1",
    RAM: "1GB",
  },
  {
    id: "2",
    type: "m2",
    name: "m2.c1m2",
    vCPU: "1",
    RAM: "2GB",
  },
  {
    id: "3",
    type: "m2",
    name: "m2.c2m4",
    vCPU: "2",
    RAM: "4GB",
  },
  {
    id: "4",
    type: "m2",
    name: "m2.c4m8",
    vCPU: "4",
    RAM: "8GB",
  },
];

export default function InstanceCreate({ params, navigate }) {
  const [selectedImageCol, setSelectedImageCol] = useState([]);
  const [selectedTypeCol, setSelectedTypeCol] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageRowClick = (id) => {
    if (selectedImageCol.includes(id)) {
      setSelectedImageCol([]);
    } else {
      setSelectedImageCol([id]);
    }
  };

  const handleTypeRowClick = (id) => {
    if (selectedTypeCol.includes(id)) {
      setSelectedTypeCol([]);
    } else {
      setSelectedTypeCol([id]);
    }
  };

  return (
    <Container>
      <TitleText>인스턴스 생성</TitleText>
      <Line />
      <CreateTitleText>Image</CreateTitleText>
      <Line />
      <TableWrapper>
        <Table
          data={dummy}
          header={["Name", "Description", "Min Block Storage(GB)", "BIT"]}
          selectedCol={selectedImageCol}
          setSelectedCol={setSelectedImageCol}
          onClick={handleImageRowClick}
          multiSelect={false}
        />
      </TableWrapper>
      <Line />
      <CreateTitleText>Information</CreateTitleText>
      <Line />
      <InputLine>
        <Text>인스턴스 이름</Text>
        <Input type="text" name="name" />
      </InputLine>
      <InputLine>
        <Text>인스턴스 타입</Text>
        <Input type="text" name="type" readOnly />
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => setModalOpen(true)}
        >
          인스턴스 타입 선택
        </MainButton>
      </InputLine>
      <InputLine>
        <Text>키 페어</Text>
        <Select />
        <MainButton size="small" color="medium" marginLeft={1}>
          생성
        </MainButton>
      </InputLine>
      <Line />
      <ButtonContainer>
        <MainButton
          size="small"
          color="light"
          onClick={() => {
            console.log("취소");
            navigate(`/student/project/${params.projectId}/instance`);
          }}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => {
            console.log("생성");
            navigate(`/student/project/${params.projectId}/instance`);
          }}
        >
          생성
        </MainButton>
      </ButtonContainer>
      <PopUpModal
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
        title="인스턴스 타입 선택"
      >
        <Table
          data={dummy2}
          header={["Type", "Name", "vCPU", "RAM"]}
          selectedCol={selectedTypeCol}
          setSelectedCol={setSelectedTypeCol}
          onClick={handleTypeRowClick}
          multiSelect={false}
        />
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
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;

const TableWrapper = styled.div`
  margin: 0 2rem;
`;

const Text = styled.div`
  min-width: 6rem;
  margin-left: 2rem;
  font-weight: 400;
`;

const CreateTitleText = styled.div`
  font-weight: 600;
  margin: 0 1rem;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 20rem;
  height: 2rem;
  margin-left: 2rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 0 10px;
`;

const Select = styled.select`
  width: 20rem;
  height: 2rem;
  margin-left: 2rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 0 10px;
`;

const InputLine = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
`;
