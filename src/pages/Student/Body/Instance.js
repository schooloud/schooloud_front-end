import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import BottomModal from "../../../components/BottomModal";
import InstanceCreate from "./InstanceCreate";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useGetApi, usePostApi } from "../../../utils/http";
import PopUpModal from "../../../components/PopUpModal";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Instance() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedRow, setSelectedRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedModalTab, setSelectedModalTab] = useState(1);
  const [page, setPage] = useState(0);
  const [instanceList, setInstanceList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [domainName, setDomainName] = useState("");
  const [domainModal, setDomainModal] = useState(false);

  const { isSuccess } = useQuery({
    queryKey: ["instances"],
    queryFn: () => useGetApi(`instance/list/${params.projectId}`),
    onSuccess: (data) => {
      setInstanceList([]);
      setTableData([]);

      data.data.instance_list.map((newInstance) => {
        const newTableObj = {};
        newTableObj["id"] = newInstance.instance_id;
        newTableObj["name"] = newInstance.instance_name;
        newTableObj["image"] = newInstance.image_name;
        newTableObj["ip"] = (
          <div>
            <div>{newInstance.ip_addresses[0]}</div>
            <div>{newInstance.ip_addresses[1]}</div>
          </div>
        );
        newTableObj["flavor"] = newInstance.flavor;
        newTableObj["keypair"] = newInstance.keypair_name;
        newTableObj["status"] = newInstance.status;

        setTableData((oldinstance) => [...oldinstance, newTableObj]);

        const newInstanceObj = {
          ...newTableObj,
          domain: newInstance.domain,
          ipPort: newInstance.ip_addresses[1],
        };

        setInstanceList((oldinstance) => [...oldinstance, newInstanceObj]);
      });
    },
  });

  const selectedInstance = instanceList.find((row) => row.id === selectedId);

  const pauseInstance = useMutation({
    mutationFn: () =>
      selectedRow.map((instanceId) =>
        usePostApi("instance/pause", {
          project_id: params.projectId,
          instance_id: instanceId,
        })
      ),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["instances"] });
      console.log("중지 성공");
      !!data.data.message && alert(data.data.message);
    },
  });
  const unpauseInstance = useMutation({
    mutationFn: () =>
      selectedRow.map((instanceId) =>
        usePostApi("instance/unpause", {
          project_id: params.projectId,
          instance_id: instanceId,
        })
      ),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["instances"] });
      console.log("시작 성공");
      !!data.data.message && alert(data.data.message);
    },
  });

  const domainAssign = useMutation({
    mutationFn: (domain) =>
      usePostApi("domain/assign", {
        project_id: params.projectId,
        instance_id: selectedId,
        domain: domain,
      }),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["instances"] });
      !!data.data.message ? alert(data.data.message) : alert("삭제되었습니다.");
    },
  });

  const handleRowClick = (id) => {
    setSelectedRow([id]);
    setSelectedId(id);
    setModalOpen(true);
  };

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
          disabled={
            !(
              selectedRow.length > 0 &&
              instanceList
                .filter((data) => selectedRow.includes(data.id))
                .filter((data) => data.status === "ACTIVE").length ===
                selectedRow.length
            )
          }
          onClick={() => pauseInstance.mutate()}
        >
          인스턴스 중지
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={0.3}
          disabled={
            !(
              selectedRow.length > 0 &&
              instanceList
                .filter((data) => selectedRow.includes(data.id))
                .filter((data) => data.status === "PAUSED").length ===
                selectedRow.length
            )
          }
          onClick={() => unpauseInstance.mutate()}
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
        {isSuccess ? (
          <Table
            data={[tableData]}
            header={[
              "Name",
              "Image",
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
        ) : (
          <LoadingOverlayWrapper>
            <LoadingOverlay />
          </LoadingOverlayWrapper>
        )}
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
                <Text>: {selectedInstance?.image}</Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Instance Type</BoldText>
                <Text>: {selectedInstance?.flavor}</Text>
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
                <Text>:&nbsp;</Text>
                {selectedInstance?.ip}
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>Domain</BoldText>
                <Text>: {selectedInstance?.domain}</Text>
              </TextWrapper>
              <Line />
            </div>
          ) : selectedModalTab === 2 ? (
            <div>
              <FlexContainer>
                <MainButton
                  color="medium"
                  size="small"
                  marginLeft={0.5}
                  onClick={() => setDomainModal(true)}
                >
                  도메인 할당
                </MainButton>
              </FlexContainer>
              <Line />
              <TextWrapper>
                <BoldText>Domain</BoldText>
                <Text>: {selectedInstance?.domain}</Text>
              </TextWrapper>
              <Line />
            </div>
          ) : (
            <div>
              <Line />
              <TextWrapper>
                <BoldText>SSH 접속</BoldText>
                <Text>
                  : ssh -i {selectedInstance.keypair}.pem{" "}
                  {selectedInstance.image === "cirros-0.5.2-x86_64-disk"
                    ? "cirros"
                    : "ubuntu"}
                  @{selectedInstance.ipPort}
                </Text>
              </TextWrapper>
              <Line />
              <TextWrapper>
                <BoldText>HTTP 접속</BoldText>
                <Text>
                  :{" "}
                  {!!selectedInstance.domain &&
                    selectedInstance.domain + ".schooloud.cloud"}
                </Text>
              </TextWrapper>
              <Line />
            </div>
          )}
        </ModalBody>
      </BottomModal>
      <PopUpModal
        width={30}
        darkBackground={false}
        visible={domainModal}
        title="도메인 할당"
      >
        <TextWrapper>
          <DomainText>도메인</DomainText>
          <TextWrapper>
            <Div>:&nbsp;</Div>
            <Input
              type="text"
              name="domainName"
              value={domainName}
              onChange={(e) =>
                setDomainName(e.target.value.replace(/[^A-Za-z0-9]/gi, ""))
              }
            />
            .schooloud.cloud
          </TextWrapper>
        </TextWrapper>
        <MainButton
          size="small"
          color="light"
          fontColor="var(--dark)"
          marginTop="1"
          onClick={() => {
            setDomainName("");
            setDomainModal(false);
          }}
        >
          취소
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          marginLeft={1}
          onClick={() => {
            domainAssign.mutate(domainName);
            setDomainModal(false);
            setDomainName("");
          }}
          disabled={!domainName}
        >
          할당
        </MainButton>
      </PopUpModal>
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

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

const DomainText = styled.div`
  min-width: 4rem;
  font-weight: 400;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 10rem;
  height: 1.8rem;
  border: 0.5px solid gray;
  margin-right: 0.2rem;
  border-radius: 0.3rem;
  padding: 0 0.3rem;
`;

const Div = styled.div`
  font-weight: 400;
`;
