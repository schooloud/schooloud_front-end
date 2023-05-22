import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import PopUpModal from "../../../components/PopUpModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function InstanceCreate({ params, navigate }) {
  const queryClient = useQueryClient();
  const [selectedImageRow, setSelectedImageRow] = useState([]);
  const [selectedTypeRow, setSelectedTypeRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isKeypairCreate, setIsKeypairCreate] = useState(false);
  const [keypairCreatePopUp, setKeypairCreatePopUp] = useState(false);
  const [selectedKeypair, setSelectedKeypair] = useState("");
  const [keypairList, setKeypairList] = useState([]);
  const [createKeypairName, setCreateKeypairName] = useState("");
  const [createPrivateKey, setCreatePrivateKey] = useState("");
  const [instanceName, setInstanceName] = useState("");
  const [imageList, setImageList] = useState([]);
  const [flavorList, setFlavorList] = useState([]);
  const [fetchingModal, setFetchingModal] = useState(false);

  useQuery({
    queryKey: ["keypairs"],
    queryFn: () => useGetApi("keypair/list"),
    onSuccess: (data) => {
      setKeypairList([]);
      data.data.key_list.map((newKeypair) =>
        setKeypairList((oldKeypair) => [...oldKeypair, newKeypair.keypair_name])
      );
    },
  });

  const { isSuccess } = useQuery({
    queryKey: ["images"],
    queryFn: () => useGetApi("image/list"),
    onSuccess: (data) => {
      setImageList([]);
      data.data.images.map((newImage) => {
        const newImageObj = {};

        newImageObj["id"] = newImage.id;
        newImageObj["name"] = newImage.image_name;
        newImageObj["description"] = newImage.description;
        newImageObj["size"] = newImage.size;

        setImageList((oldImage) => [...oldImage, newImageObj]);
      });
    },
  });

  useQuery({
    queryKey: ["flavors"],
    queryFn: () => useGetApi("flavor/list"),
    onSuccess: (data) => {
      setFlavorList([]);
      data.data.flavors.map((newFlavor) => {
        const newFlavorObj = {};

        newFlavorObj["id"] = newFlavor.id;
        newFlavorObj["name"] = newFlavor.name;
        newFlavorObj["ram"] = newFlavor.ram;
        newFlavorObj["disk"] = newFlavor.disk;
        newFlavorObj["cpu"] = newFlavor.cpu;

        setFlavorList((oldFlavor) => [...oldFlavor, newFlavorObj]);
      });
    },
  });

  const keypairCreate = useMutation({
    mutationFn: (keypairName) =>
      usePostApi("keypair/create", { keypair_name: keypairName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["keypairs"] });
      setCreatePrivateKey(data.data.private_key);
    },
  });

  const InstanceCreate = useMutation({
    mutationFn: () =>
      usePostApi("instance/create", {
        project_id: params.projectId,
        instance_name: instanceName,
        keypair_name: selectedKeypair,
        image_name: imageList.find((image) => image.id === selectedImageRow[0])
          .name,
        flavor_name: selectedType,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("instances");
      setFetchingModal(false);
      navigate(`/projectId/${params.projectId}/instance`);
    },
  });

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

  const handleKeypairSave = () => {
    const element = document.createElement("a");
    const file = new Blob([createPrivateKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${createKeypairName}.pem`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // console.log({
  //   project_id: params.projectId,
  //   instance_name: instanceName,
  //   keypair_name: selectedKeypair,
  //   image_name: imageList.find((image) => image.id === selectedImageRow[0])
  //     .name,
  //   flavor_name: selectedType,
  // });
  return (
    <Container>
      <TitleText>인스턴스 생성</TitleText>
      <Line />
      <CreateTitleText>Image</CreateTitleText>
      <Line />
      <TableWrapper>
        {isSuccess ? (
          <Table
            data={imageList}
            header={["Name", "Description", "Image Size"]}
            selectedRow={selectedImageRow}
            setSelectedRow={setSelectedImageRow}
            onClick={handleImageRowClick}
            multiSelect={false}
          />
        ) : (
          <LoadingOverlayWrapper>
            <LoadingOverlay />
          </LoadingOverlayWrapper>
        )}
      </TableWrapper>
      <Line />
      <CreateTitleText>Information</CreateTitleText>
      <Line />
      <InputLine>
        <Text>인스턴스 이름</Text>
        <Input
          type="text"
          name="name"
          onBlur={(e) => setInstanceName(e.target.value)}
        />
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
        <Select
          name="keypair"
          value={selectedKeypair}
          onChange={(e) => setSelectedKeypair(e.target.value)}
          required
        >
          <option value="" disabled>
            키페어를 선택해주세요.
          </option>
          {keypairList?.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => setIsKeypairCreate((state) => !state)}
        >
          {isKeypairCreate ? "닫기" : "생성"}
        </MainButton>
      </InputLine>
      {isKeypairCreate && (
        <KeypairCreateBox>
          <InputLine>
            <Text>키페어 이름</Text>
            <Input
              type="text"
              name="name"
              onBlur={(e) => setCreateKeypairName(e.target.value)}
            />
            <MainButton
              size="small"
              color="medium"
              marginLeft={1}
              onClick={() => {
                !keypairList.includes(createKeypairName) &&
                  keypairCreate.mutate(createKeypairName);
                setKeypairCreatePopUp(true);
              }}
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
          disabled={
            !instanceName ||
            !selectedKeypair ||
            !selectedImageRow.length ||
            !selectedType
          }
          onClick={() => {
            InstanceCreate.mutate();
            setFetchingModal(true);
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
          data={flavorList}
          header={["Name", "RAM", "Disk", "vCPU"]}
          selectedRow={selectedTypeRow}
          setSelectedRow={setSelectedTypeRow}
          onClick={handleTypeRowClick}
          multiSelect={false}
        />
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
          marginTop="1.2"
          onClick={() => setModalOpen(false)}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft="1"
          onClick={() => {
            setSelectedType(
              flavorList.find((data) => data.id === selectedTypeRow[0]).name
            );
            setModalOpen(false);
          }}
          disabled={selectedTypeRow.length === 0}
        >
          확인
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
            setIsKeypairCreate(false);
            setCreateKeypairName("");
          }}
        >
          닫기
        </MainButton>
      </PopUpModal>
      <PopUpModal
        width={20}
        darkBackground={true}
        visible={fetchingModal}
        title="인스턴스 생성"
      >
        <div>인스턴스 생성 중입니다...</div>
        <LoadingOverlay />
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
