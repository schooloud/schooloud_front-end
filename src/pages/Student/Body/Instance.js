import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import BottomModal from "../../../components/BottomModal";

export default function Instance() {
  const [selecetedCol, setSelectedCol] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const handleRowClick = (id) => {
    console.log(id);
    setSelectedId(id);
    setModalOpen(true);
  };

  return (
    <Container>
      <TitleText>Instance</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => console.log("hi")}
        >
          인스턴스 생성
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          disabled
          onClick={() => console.log("인스턴스 중지")}
        >
          인스턴스 중지
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          disabled
          onClick={() => console.log("인스턴스 시작")}
        >
          인스턴스 시작
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          disabled
          onClick={() => console.log("인스턴스 삭제")}
        >
          인스턴스 삭제
        </MainButton>
      </ButtonContainer>
      <Table
        selectedCol={selecetedCol}
        setSelectedCol={setSelectedCol}
        onClick={handleRowClick}
      />
      <BottomModal open={modalOpen} setOpen={setModalOpen}>
        {selectedId}
      </BottomModal>
    </Container>
  );
}

const Container = styled.div``;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
