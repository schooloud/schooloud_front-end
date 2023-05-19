import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import BottomModal from "../../../components/BottomModal";
import InstanceCreate from "./InstanceCreate";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useGetApi } from "../../../utils/http";

// const instanceData = [
//   {
//     id: "1",
//     name: "jsb-instance",
//     os: "Ubuntu Server 20.04 LTS",
//     ip: "192.168.0.8",
//     type: "u2.c1m1 (1vCPU, 1GB)",
//     keypair: "jsb-keypair",
//     status: "ON",
//   },
//   {
//     id: "2",
//     name: "yjh-instance",
//     os: "Ubuntu Server 20.04 LTS",
//     ip: "192.168.0.8",
//     type: "u2.c1m1 (1vCPU, 1GB)",
//     keypair: "yjh-keypair",
//     status: "ON",
//   },
//   {
//     id: "3",
//     name: "ksh-instance",
//     os: "Ubuntu Server 20.04 LTS",
//     ip: "192.168.0.8",
//     type: "u2.c1m1 (1vCPU, 1GB)",
//     keypair: "ksh-keypair",
//     status: "ON",
//   },
//   {
//     id: "4",
//     name: "lyr-instance",
//     os: "Ubuntu Server 20.04 LTS",
//     ip: "192.168.0.8",
//     type: "u2.c1m1 (1vCPU, 1GB)",
//     keypair: "lyr-keypair",
//     status: "ON",
//   },
//   {
//     id: "5",
//     name: "lsi-instance",
//     os: "Ubuntu Server 20.04 LTS",
//     ip: "192.168.0.8",
//     type: "u2.c1m1 (1vCPU, 1GB)",
//     keypair: "lsi-keypair",
//     status: "ON",
//   },
// ];

const pagnationDummy = [
  [
    {
      id: "1",
      name: "jsb-instance",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "jsb-keypair",
      status: "ON",
    },
    {
      id: "2",
      name: "yjh-instance",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "yjh-keypair",
      status: "ON",
    },
    {
      id: "3",
      name: "ksh-instance",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "ksh-keypair",
      status: "ON",
    },
    {
      id: "4",
      name: "lyr-instance",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "lyr-keypair",
      status: "ON",
    },
    {
      id: "5",
      name: "lsi-instance",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "lsi-keypair",
      status: "ON",
    },
  ],
  [
    {
      id: "6",
      name: "jsb-instance2",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "jsb-keypair",
      status: "ON",
    },
    {
      id: "7",
      name: "yjh-instance2",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "yjh-keypair",
      status: "ON",
    },
    {
      id: "8",
      name: "ksh-instance2",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "ksh-keypair",
      status: "ON",
    },
    {
      id: "9",
      name: "lyr-instance2",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "lyr-keypair",
      status: "ON",
    },
    {
      id: "10",
      name: "lsi-instance2",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "lsi-keypair",
      status: "ON",
    },
  ],
  [
    {
      id: "11",
      name: "jsb-instance3",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "jsb-keypair",
      status: "ON",
    },
    {
      id: "12",
      name: "yjh-instance3",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "yjh-keypair",
      status: "ON",
    },
    {
      id: "13",
      name: "ksh-instance3",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "ksh-keypair",
      status: "ON",
    },
    {
      id: "14",
      name: "lyr-instance3",
      os: "Ubuntu Server 20.04 LTS",
      ip: "192.168.0.8",
      type: "u2.c1m1 (1vCPU, 1GB)",
      keypair: "lyr-keypair",
      status: "ON",
    },
    // {
    //   id: "15",
    //   name: "lsi-instance3",
    //   os: "Ubuntu Server 20.04 LTS",
    //   ip: "192.168.0.8",
    //   type: "u2.c1m1 (1vCPU, 1GB)",
    //   keypair: "lsi-keypair",
    //   status: "ON",
    // },
  ],
];

export default function Instance() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedRow, setSelectedRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedModalTab, setSelectedModalTab] = useState(1);
  const [page, setPage] = useState(0);

  // useQuery({
  //   queryKey: ["instances"],
  //   queryFn: () =>
  //     useGetApi("instance/list", "", { project_id: params.projectId }),
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  const handleRowClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  // const selectedInstance = instanceData.find((row) => row.id === selectedId);
  const selectedInstance = pagnationDummy[page].find(
    (row) => row.id === selectedId
  );

  if (params.create === "create") {
    return <InstanceCreate params={params} navigate={navigate} />;
  }

  return (
    <Container>
      <TitleText>Instance</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          onClick={() => {
            console.log("인스턴스 생성");
            navigate(`/projectId/${params.projectId}/instance/create`);
          }}
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
      <TableWrapper>
        <Table
          data={pagnationDummy}
          header={[
            "Name",
            "OS",
            "IP Adress",
            "Instance Type",
            "KeyPair",
            "Status",
          ]}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          onClick={handleRowClick}
          pagination={true}
          page={page}
          setPage={setPage}
        />
      </TableWrapper>
      <BottomModal open={modalOpen} setOpen={setModalOpen}>
        <TitleText>{selectedInstance?.name}</TitleText>
        <ModalTab>
          <TabBox
            className={selectedModalTab === 1 ? "selected" : "unSelected"}
            onClick={() => setSelectedModalTab(1)}
          >
            기본 정보
          </TabBox>
          <TabBox
            className={selectedModalTab === 2 ? "selected" : "unSelected"}
            onClick={() => setSelectedModalTab(2)}
          >
            네트워크
          </TabBox>
          <TabBox
            className={selectedModalTab === 3 ? "selected" : "unSelected"}
            onClick={() => setSelectedModalTab(3)}
          >
            접속 정보
          </TabBox>
        </ModalTab>
        <ModalBody>
          {selectedModalTab === 1 ? (
            <div>
              <Line />
              <TextWrapper>
                <BoldText>Instance Name</BoldText>
                <Text>: {selectedInstance?.name}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>OS</BoldText>
                <Text>: {selectedInstance?.os}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Instance Type</BoldText>
                <Text>: {selectedInstance?.type}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Keypair Name</BoldText>
                <Text>: {selectedInstance?.keypair}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Status</BoldText>
                <Text>: {selectedInstance?.status}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>IP Address</BoldText>
                <Text>: {selectedInstance?.ip}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Domain</BoldText>
                <Text>: domain</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Floating IP</BoldText>
                <Text>: floating ip</Text>
              </TextWrapper>
              <Line />
            </div>
          ) : selectedModalTab === 2 ? (
            <div>
              <FlexContainer>
                <MainButton color="medium" size="small">
                  Floating IP 할당
                </MainButton>
                <MainButton color="medium" size="small" marginLeft={0.5}>
                  도메인 할당
                </MainButton>
              </FlexContainer>
              <Line />
              <TextWrapper>
                <BoldText>Floating IP</BoldText>
                <Text>: none</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Domain</BoldText>
                <Text>: none</Text>
              </TextWrapper>
              <Line />
            </div>
          ) : (
            <div>
              <Line />
              <TextWrapper>
                <Text>ssh -i keypir.pem ubuntu@192.168.0.100</Text>
              </TextWrapper>
              <Line />
            </div>
          )}
        </ModalBody>
      </BottomModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const TableWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTab = styled.div`
  position: relative;
  display: flex;
  min-height: 2.4rem;
  overflow-x: scroll;
  white-space: nowrap;
`;

const TabBox = styled.div`
  position: relative;
  width: 8rem;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.2rem;

  &.unSelected {
    border-top: 2px solid #b0b0b0;
    &:hover {
      background-color: #ffffff;
      cursor: pointer;
    }
  }

  &.selected {
    border-top: 2px solid var(--semi-dark);
    background-color: #ffffff;
    &:hover {
      background-color: #ffffff;
      cursor: default;
    }
  }
`;

const ModalBody = styled.div`
  margin-top: 1rem;
  overflow: auto;
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BoldText = styled.div`
  margin-left: 2rem;
  font-weight: 600;
  width: 8rem;
`;
const Text = styled.div`
  margin-left: 2rem;
  font-weight: 400;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
