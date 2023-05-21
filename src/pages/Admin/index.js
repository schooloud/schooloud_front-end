import AdminDrawerList from "../../components/AdminDrawerList";
import styled from "styled-components";
import Body from "./Body";
import ExpiredCheck from "../../pages/ExpiredCheck";
import logoImage from "../../assets/Logo.png";

export default function Admin() {

  //제안서 목록 가져오기
  const { isSuccess } = useQuery({
    queryKey: ["adminProposals"],
    queryFn: () => useGetApi("proposal/list"),
    onSuccess: (data) => {
      setPropoosalTableData([]);
      data.data.proposals.map((proposal) => {
        //Table에 넣을 데이터
        const newProposalTableData = {};

        for (let key in proposal) {
          //키값 변경
          if (key === "proposal_id") {
            newProposalTableData["id"] = proposal[key];
          }
          //project_name 이랑 status만 가져오기
          else if (
            key === "project_name" ||
            key === "status" ||
            key === "create_at"
          ) {
            newProposalTableData[key] = proposal[key];
          }
        }

        setPropoosalTableData((oldProposalData) => [
          ...oldProposalData,
          newProposalTableData,
        ]);
      });
    },
  });
  
  return (
    <PageWrapper>
      <LeftBarWapper>
        <LeftBar>
          <LogoWrapper>
            <Logo>
              <LogoImage src={logoImage} alt="logo" />
            </Logo>
          </LogoWrapper>
          <DrawerWrapper>
            <AdminDrawerList />
          </DrawerWrapper>
        </LeftBar>
        <Line />
      </LeftBarWapper>
      <MainWrapper>
        <BodyWrapper>
          <Body />
        </BodyWrapper>
      </MainWrapper>
      <ExpiredCheck />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const LeftBarWapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  z-index: 102;
`;

const LeftBar = styled.div`
  width: 15rem;
  height: 100%;
`;

const LogoWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 7.2rem;
  background-color: #ffffff;
`;

const LogoImage = styled.img`
  height: 36%;
`;

const DrawerWrapper = styled.div`
  height: calc(100% - 7.2rem);
  width: 15rem;
  margin-top: 7.2rem;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #f0f0f0;
`;

const MainWrapper = styled.div`
  margin-left: 15rem;
  width: calc(100% - 15rem);
  height: 100%;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
