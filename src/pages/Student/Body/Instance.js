import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import BottomModal from "../../../components/BottomModal";
import InstanceCreate from "./InstanceCreate";

export default function Instance() {
  const [selecetedCol, setSelectedCol] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedModalTab, setSelectedModalTab] = useState(1);
  const [create, setCreate] = useState(false);

  const handleRowClick = (id) => {
    console.log(id);
    setSelectedId(id);
    setModalOpen(true);
  };

  if (create) {
    return <InstanceCreate setCreate={setCreate} />;
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
            setCreate(true);
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
      <Table
        selectedCol={selecetedCol}
        setSelectedCol={setSelectedCol}
        onClick={handleRowClick}
      />
      <BottomModal open={modalOpen} setOpen={setModalOpen}>
        <TitleText>{selectedId}</TitleText>
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
                <Text>: {selectedId}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>OS</BoldText>
                <Text>: os</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Instance Type</BoldText>
                <Text>: instance type</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Keypair Name</BoldText>
                <Text>: keypair name</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Status</BoldText>
                <Text>: status</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>IP Address</BoldText>
                <Text>: ip address</Text>
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

const CreateTitleText = styled.div`
  font-weight: 600;
  margin: 0 1rem;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 10px;
`;
