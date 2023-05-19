import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";

const imageData = [
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

const typeData = [
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
  const [selectedImageRow, setSelectedImageRow] = useState([]);
  const [selectedTypeRow, setSelectedTypeRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const [keypairCreate, setKeypairCreate] = useState(false);

  const handleImageRowClick = (id) => {
    if (selectedImageRow.includes(id)) {
      setSelectedImageRow([]);
    } else {
      setSelectedImageRow([id]);
    }
  };

  const handleTypeRowClick = (id) => {
    if (selectedTypeRow.includes(id)) {
      setSelectedTypeRow([]);
    } else {
      setSelectedTypeRow([id]);
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
          data={imageData}
          header={["Name", "Description", "Min Block Storage(GB)", "BIT"]}
          selectedRow={selectedImageRow}
          setSelectedRow={setSelectedImageRow}
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
        <Input type="text" name="type" value={selectedType} readOnly />
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
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => setKeypairCreate((state) => !state)}
        >
          {keypairCreate ? "닫기" : "생성"}
        </MainButton>
      </InputLine>
      {keypairCreate && (
        <KeypairCreateBox>
          <InputLine>
            <Text>키페어 이름</Text>
            <Input type="text" name="name" />
            <MainButton
              size="small"
              color="medium"
              marginLeft={1}
              onClick={() => console.log("키페어 생성")}
            >
              생성
            </MainButton>
          </InputLine>
        </KeypairCreateBox>
      )}
      <Line />
      <ButtonContainer>
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
          onClick={() => {
            console.log("취소");
            navigate(`/projectId/${params.projectId}/instance`);
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
            navigate(`/projectId/${params.projectId}/instance`);
          }}
        >
          생성
        </MainButton>
      </ButtonContainer>
      <PopUpModal
        width={30}
        darkBackground={false}
        visible={modalOpen}
        title="인스턴스 타입 선택"
      >
        <Table
          data={typeData}
          header={["Type", "Name", "vCPU", "RAM"]}
          selectedRow={selectedTypeRow}
          setSelectedRow={setSelectedTypeRow}
          onClick={handleTypeRowClick}
          multiSelect={false}
        />
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
          marginTop="1"
          onClick={() => setModalOpen(false)}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => {
            setModalOpen(false);
            setSelectedType(
              typeData.find((data) => data.id === selectedTypeRow[0]).name
            );
          }}
          disabled={selectedTypeRow.length === 0}
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
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
`;

const Select = styled.select`
  width: 20rem;
  height: 2rem;
  margin-left: 2rem;
  border: 0.5px solid gray;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
`;

const InputLine = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
`;

const KeypairCreateBox = styled.div`
  width: 40rem;
  background-color: var(--light);
`;
