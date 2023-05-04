import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";

export default function InstanceCreate({ setCreate }) {
  const [selecetedCol, setSelectedCol] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedModalTab, setSelectedModalTab] = useState(1);

  const handleRowClick = (id) => {
    console.log(id);
    setSelectedId(id);
    setModalOpen(true);
  };

  return (
    <Container>
      <TitleText>인스턴스 생성</TitleText>
      <Line />
      <CreateTitleText>Image</CreateTitleText>
      <Line />
      <Table
        selectedCol={selecetedCol}
        setSelectedCol={setSelectedCol}
        onClick={handleRowClick}
      />
      <Line />
      <CreateTitleText>Information</CreateTitleText>
      <Line />
      <InputLine>
        <Text>인스턴스 이름</Text>
        <Input type="text" name="name" />
      </InputLine>
      <InputLine>
        <Text>인스턴스 타입</Text>
        <Input type="text" name="type" />
        <MainButton size="small" color="medium" marginLeft={1}>
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
            setCreate(false);
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
            setCreate(false);
          }}
        >
          생성
        </MainButton>
      </ButtonContainer>
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
