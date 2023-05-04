import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";

const dummy = [
  {
    id: "1",
    name: "jsb-keypair",
    fingerprint: "20:c3:85:13:2d:47:b2:c4:f2:48:d0:b0:b9:41:b0:b2",
    publickey: (
      <MainButton size="small" color="medium" onClick={() => {}}>
        보기
      </MainButton>
    ),
  },
  {
    id: "2",
    name: "abc-keypair",
    fingerprint: "20:c3:85:13:2d:47:b2:c4:f2:48:d0:b0:b9:41:b0:b2",
    publickey: (
      <MainButton size="small" color="medium" onClick={() => {}}>
        보기
      </MainButton>
    ),
  },
];

export default function KeyPair() {
  const [selecetedCol, setSelectedCol] = useState([]);
  const [selectedId, setSelectedId] = useState();

  const handleRowClick = (id) => {
    console.log(id);
    setSelectedId(id);
  };

  return (
    <Container>
      <TitleText>Key Pair</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => console.log("키페어 생성ㅇ")}
        >
          키페어 생성
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          disabled
          onClick={() => console.log("키페어 삭제")}
        >
          키페어 삭제
        </MainButton>
      </ButtonContainer>
      <Table
        data={dummy}
        header={["Name", "Fingerprint", "Public Key"]}
        selectedCol={selecetedCol}
        setSelectedCol={setSelectedCol}
        onClick={handleRowClick}
      />
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
  margin-bottom: 1.5rem;
`;
