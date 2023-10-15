import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import PopUpModal from "../../../components/PopUpModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";
import paginate from "../../../utils/paginate";
import removeCookies from "../../../utils/removeCookies";
import { useNavigate } from "react-router-dom";

export default function KeyPair() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState([]);
  const [page, setPage] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [keypairCreatePopUp, setKeypairCreatePopUp] = useState(false);
  const [keypairName, setKeypairName] = useState("");
  const [keypairList, setKeypairList] = useState([]);
  const [keypairNameList, setKeypairNameList] = useState([]);
  const [createPrivateKey, setCreatePrivateKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const [publicKeyId, setPublicKeyId] = useState(1);

  const { isSuccess } = useQuery({
    queryKey: ["keypairs"],
    queryFn: () => useGetApi("keypair/list"),
    onSuccess: (data) => {
      setKeypairList([]);

      setTableData([]);
      setKeypairNameList([]);

      data.data.key_list.map((newKeypair, index) => {
        const newTableData = {};

        newTableData["id"] = index + 1;
        newTableData["name"] = newKeypair.keypair_name;
        newTableData["fingerprint"] = newKeypair.finger_print;

        const newKeypairObj = {
          ...newTableData,
          publicKey: newKeypair.public_key,
        };

        //키페어 목록
        setKeypairList((oldKeypair) => [...oldKeypair, newKeypairObj]);
        //키페어 이름 목록
        setKeypairNameList((oldKeypairNameList) => [
          ...oldKeypairNameList,
          newKeypair.keypair_name,
        ]);

        newTableData["publicKey"] = (
          <MainButton
            size="small"
            color="medium"
            onClick={() => setPublicModalOpen(true)}
          >
            보기
          </MainButton>
        );

        setTableData((oldTableData) => [...oldTableData, newTableData]);
      });
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  const keypairCreate = useMutation({
    mutationFn: (keypairName) =>
      usePostApi("keypair/create", { keypair_name: keypairName }),
    onSuccess: (data) => {
      console.log("keypair = ", data);
      setKeypairCreatePopUp(true);
      queryClient.invalidateQueries({ queryKey: ["keypairs"] });
      setCreatePrivateKey(data.data.private_key);
    },
  });

  const keypairDelete = useMutation({
    mutationFn: (keypairName) =>
      usePostApi("keypair/delete", { keypair_name: keypairName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keypairs"] });
      alert("삭제되었습니다.");
    },
  });

  const handleChangeKeyPairName = (e) => {
    // 영어만 입력 가능
    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(e.target.value)) {
      // 입력이 안되게
      return;
    }
    setKeypairName(e.target.value);
  };

  const handleKeypairSave = () => {
    const element = document.createElement("a");
    const file = new Blob([createPrivateKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${keypairName}.pem`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleKeypairDelete = () => {
    selectedRow.map((id) => {
      const deleteKeypairName = keypairList.find(
        (keypair) => keypair.id === id
      ).name;
      console.log(deleteKeypairName);
      keypairDelete.mutate(deleteKeypairName);
    });
    setSelectedRow([]);
  };

  const handleRowClick = (id) => {
    setPublicKeyId(id);
  };

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
          disabled={selectedRow.length === 0}
          onClick={() => handleKeypairDelete()}
        >
          키페어 삭제
        </MainButton>
      </ButtonContainer>
      {isSuccess ? (
        <Table
          data={paginate(tableData, 5)}
          header={["Name", "Fingerprint", "Public Key"]}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          onClick={handleRowClick}
          pagination={true}
          page={page}
          setPage={setPage}
        />
      ) : (
        <LoadingOverlayWrapper>
          <LoadingOverlay />
        </LoadingOverlayWrapper>
      )}
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
            placeholder="영어로 입력해주세요."
            value={keypairName}
            onChange={handleChangeKeyPairName}
          />
        </InputLine>
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
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
            !keypairNameList.includes(keypairName) &&
              keypairCreate.mutate(keypairName);
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
        <PublicKeyText>
          {
            keypairList?.find((keypair) => keypair.id === publicKeyId)
              ?.publicKey
          }
        </PublicKeyText>
        <MainButton
          size="small"
          color="medium"
          marginTop="1.2"
          onClick={() => setPublicModalOpen(false)}
        >
          닫기
        </MainButton>
      </PopUpModal>
      <PopUpModal
        width={25.4}
        darkBackground={false}
        visible={keypairCreatePopUp}
        title="키페어 생성"
      >
        <div>키페어 생성이 완료되었습니다.</div>
        <div>키페어 파일은 이 창을 닫으면 다시 다운 받을 수 없습니다.</div>

        <MainButton
          size="small"
          color="medium"
          marginTop="1.2"
          onClick={() => handleKeypairSave()}
        >
          키페어 저장
        </MainButton>
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
          marginLeft="0.3"
          marginTop="1.2"
          onClick={() => {
            setKeypairCreatePopUp(false);
            setKeypairName("");
          }}
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
