import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [keypairName, setKeypairName] = useState("");
  const handleRowClick = (id) => {
    console.log(id);
  };

  return (
    <Container>
      <TitleText>Key Pair</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => setModalOpen(true)}
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
      <PopUpModal
        width={30}
        darkBackground={false}
        visible={modalOpen}
        title="키페어 생성"
      >
        <InputLine>
          <Text>키페어 이름</Text>
          <Input
            type="text"
            name="name"
            value={keypairName}
            onChange={(e) => setKeypairName(e.target.value)}
          />
        </InputLine>
        <MainButton
          size="small"
          color="light"
          marginTop="1"
          onClick={() => {
            setKeypairName("");
            setModalOpen(false);
          }}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => {
            setModalOpen(false);
          }}
          disabled={!keypairName}
        >
          생성
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const InputLine = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  min-width: 6rem;
  font-weight: 400;
`;

const Input = styled.input`
  width: 20rem;
  height: 2rem;
  margin-left: 1rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 0 10px;
`;
