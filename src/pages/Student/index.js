import StudentDrawerList from "../../components/StudentDrawerList";
import styled from "styled-components";
import Body from "./Body";
import ProjectTabBar from "../../components/ProjectTabBar";
import { useParams } from "react-router-dom";
import logoImage from "../../assets/Logo.png";
import ExpiredCheck from "../../pages/ExpiredCheck";

export default function Student() {
  const params = useParams();

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
            <StudentDrawerList />
          </DrawerWrapper>
        </LeftBar>
        <Line />
      </LeftBarWapper>
      <MainWrapper>
        {["proposal", "writeproposal"].includes(params.selectedDrawer) || (
          <TabBarWrapper>
            <ProjectTabBar />
          </TabBarWrapper>
        )}
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

const TabBarWrapper = styled.div`
  width: 100%;
  height: 3.6rem;
  position: fixed;
  left: 15rem;
  top: 0;
  overflow: auto;
  z-index: 100;
  background-color: red;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
