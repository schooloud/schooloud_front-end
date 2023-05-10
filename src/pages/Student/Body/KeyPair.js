import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";

export default function KeyPair() {
  const [selecetedRow, setSelectedRow] = useState([]);
  const [page, setPage] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [keypairName, setKeypairName] = useState("");

  const handleRowClick = (id) => {
    console.log(id);
  };

  const publicKey =
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAlX8IJ3JRMwpuNh+7e4H8hzR5pM8y02gA6NnnA13pPy3VIPmedBzESe2FcNJxTTNtaLPGgA41wIyRLz3ksCDtInWm+BW5x3BpG8yETuDXOKWSH8W8qGRPY0iOs0I40K7LEIVlMwSJBaFHC18SasXjP+9e97/Rf58Z3Zs9mT64FV7cYCXpmrsBSufjljCJF08XJQ8rthgGGb1mMtIzMJ37a3TVLoprEDHbWcDkumUb+QtUkIFS9MBMyAEpRGkRcCGZ+0yuLljJIAvBKEsjts77cIwp0TkVM0PGQfvA9PXzlMFi1tTJ0qnzvqZsFbnMe1hWQWROsF2ykB2hA0iEevhv Generated-by-Nova";

  const dummy = [
    {
      id: "1",
      name: "jsb-keypair",
      fingerprint: "20:c3:85:13:2d:47:b2:c4:f2:48:d0:b0:b9:41:b0:b2",
      publickey: (
        <MainButton
          size="small"
          color="medium"
          onClick={() => setPublicModalOpen(true)}
        >
          보기
        </MainButton>
      ),
    },
    {
      id: "2",
      name: "abc-keypair",
      fingerprint: "20:c3:85:13:2d:47:b2:c4:f2:48:d0:b0:b9:41:b0:b2",
      publickey: (
        <MainButton
          size="small"
          color="medium"
          onClick={() => setPublicModalOpen(true)}
        >
          보기
        </MainButton>
      ),
    },
  ];

  return (
    <Container>
      <TitleText>Key Pair</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => setCreateModalOpen(true)}
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
        data={[dummy]}
        header={["Name", "Fingerprint", "Public Key"]}
        selectedRow={selecetedRow}
        setSelectedRow={setSelectedRow}
        onClick={handleRowClick}
        pagination={true}
        page={page}
        setPage={setPage}
      />
      <PopUpModal
        width={30}
        darkBackground={false}
        visible={createModalOpen}
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
            setCreateModalOpen(false);
          }}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => {
            setCreateModalOpen(false);
          }}
          disabled={!keypairName}
        >
          생성
        </MainButton>
      </PopUpModal>
      <PopUpModal
        width={50}
        darkBackground={false}
        visible={publicModalOpen}
        title="Public Key"
      >
        <PublicKeyText>{publicKey}</PublicKeyText>
        <MainButton
          size="small"
          color="medium"
          marginTop="1"
          onClick={() => setPublicModalOpen(false)}
        >
          닫기
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

const PublicKeyText = styled.div`
  width: 100%;
  font-weight: 100;
  font-size: 0.9rem;
  background-color: var(--light);
  color: var(--medium);
  border: 1px solid var(--medium);
  border-radius: 0.3rem;
  padding: 0.5rem 0.5rem;
  word-break: break-all;
`;
