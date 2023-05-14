import styled from "styled-components";
import { useState } from "react";
import Table from "../../../components/Table";
import BottomModal from "../../../components/BottomModal";
import Paper from "../../../components/Paper";

const proposalDetailDummy = {
  projectName: "이기자",
  projectDescription:
    "우리가 이기기 위해서는 이 프로젝트의 승인이 꼭 필요합니다. 무조건 승인해주세요.",
  // 현재 사용량
  currentCPU: 1,
  currentRAM: 2,
  currentSTORAGE: 20,
  //전체 사용량
  totalCPU: 2,
  totalRAM: 4,
  totalSTORAGE: 40,
  userNum: 5,
  endDate: "2023-10-07",
  createdAt: "2021-05-07",
};

const flavorDataDummy = [
  {
    id: "1",
    flalvorName: "u2.c1m1",
    flavorRam: "1GB",
    flavorDisk: "20GB",
    cpu: 1,
    num: 1,
  },
  {
    id: "2",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
    num: 2,
  },
  {
    id: "3",
    flalvorName: "u2.c2m2",
    flavorRam: "2GB",
    flavorDisk: "40GB",
    cpu: 2,
    num: 3,
  },
];

export default function Project() {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [page, setPage] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    setBottomModalOpen(true);
  };

  const dummy = [
    {
      id: "1",
      name: "project3",
      memberNum: "5",
    },
    {
      id: "2",
      name: "project2",
      memberNum: "4",
    },
    {
      id: "3",
      name: "project1",
      memberNum: "6",
    },
  ];
  const member = [
    {
      id: "1",
      name: "이수인",
      e_mail: "cat1231@naver.com",
    },
    {
      id: "2",
      name: "김석희",
      e_mail: "cat1231@naver.com",
    },
    {
      id: "3",
      name: "정세벽",
      e_mail: "cat1231@naver.com",
    },
    {
      id: "4",
      name: "딸래미",
      e_mail: "cat1231@naver.com",
    },
    {
      id: "5",
      name: "아저씨",
      e_mail: "cat1231@naver.com",
    },
  ];

  const selectedRowName = dummy.find((row) => row.id === selectedRowId)?.name;

  return (
    <Container>
      <TitleText>Project List</TitleText>
      <Table
        data={[dummy]}
        header={["Name", "Member Num"]}
        onClick={handleRowClick}
        checkBox={false}
        pagination={true}
        page={page}
        setPage={setPage}
      />
      <BottomModal open={bottomModalOpen} setOpen={setBottomModalOpen}>
        <TitleText>{selectedRowName}</TitleText>
        <ModalBody>
          <BodyContainer>
            <LeftBody>
              <Title>Information</Title>
              <Line className="modal" />
              <Div>
                <Label>quata</Label>
                <PaperContainer>
                  <Paper
                    title={"current usage / total CPU"}
                    usage={proposalDetailDummy.currentCPU}
                    total={proposalDetailDummy.totalCPU}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"core"}
                  ></Paper>
                  <Paper
                    title={"current usage / total RAM"}
                    usage={proposalDetailDummy.currentRAM}
                    total={proposalDetailDummy.totalRAM}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"GB"}
                  ></Paper>
                  <Paper
                    title={"current usage / total STORAGE"}
                    usage={proposalDetailDummy.currentSTORAGE}
                    total={proposalDetailDummy.totalSTORAGE}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={"GB"}
                  ></Paper>
                  <Paper
                    title={"total USER"}
                    usage={proposalDetailDummy.userNum}
                    width={7.5}
                    height={10}
                    textSize="small"
                    unit={""}
                  ></Paper>
                </PaperContainer>
              </Div>
              <Line className="modal" />

              <Div>
                <Label>description</Label>
                <TextField>{proposalDetailDummy.projectDescription}</TextField>
              </Div>
              <Line className="modal" />

              <Div>
                <Label>end date</Label>
                <TextField>{proposalDetailDummy.createdAt}</TextField>
              </Div>
              <Line className="modal" />

              <Div>
                <Label>created at</Label>
                <TextField>{proposalDetailDummy.endDate}</TextField>
              </Div>
            </LeftBody>
            <RightBody>
              <Title>Member</Title>
              <RightBodyContainer>
                <Table
                  checkBox={false}
                  data={member}
                  header={["Name", "e-mail"]}
                  onClick={() => {}}
                />
              </RightBodyContainer>
            </RightBody>
          </BodyContainer>
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

const ModalBody = styled.div`
  overflow: auto;
`;

const Line = styled.div`
  &.modal {
    margin: 0;
  }
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
  min-width: 8rem;
`;

const Text = styled.div`
  margin-left: 2rem;
  font-weight: 400;
`;

const DescText = styled.div`
  margin-left: 2rem;
  word-break: break-all;
  font-weight: 400;
`;

const BodyContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  width: 100%;
  padding: 0 0.2rem;
`;

const LeftBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: visible;
  padding-right: 1rem;
  border-right: 1px solid #f0f0f0;
`;

const RightBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  height: 100%;
  width: 50%;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PaperContainer = styled.div`
  display: flex;
`;

const RightBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 600;
`;

const TextField = styled.div`
  display: flex;
  align-items: flex-start;
`;
