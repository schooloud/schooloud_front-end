import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";

export default function Instance() {
  const [selecetedCol, setSelectedCol] = useState([]);

  const handleRowClick = (id) => {
    console.log(id);
  };

  return (
    <Container>
      <TitleText>Instance</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => console.log("hi")}
          margin={0.3}
        >
          인스턴스 생성
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          margin={0.3}
          disabled
          onClick={() => console.log("인스턴스 중지")}
        >
          인스턴스 중지
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          margin={0.3}
          disabled
          onClick={() => console.log("인스턴스 시작")}
        >
          인스턴스 시작
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          margin={0.3}
          disabled
          onClick={() => console.log("인스턴스 삭제")}
        >
          인스턴스 삭제
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          margin={0.3}
          disabled
          onClick={() => console.log("도메인 할당")}
        >
          도메인 할당
        </MainButton>
      </ButtonContainer>
      <Table
        selectedCol={selecetedCol}
        setSelectedCol={setSelectedCol}
        onClick={handleRowClick}
      />
    </Container>
  );
}

const Container = styled.div``;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
