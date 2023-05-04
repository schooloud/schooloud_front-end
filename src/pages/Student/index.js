import StudentDrawerList from "../../components/StudentDrawerList";
import styled from "styled-components";
import Body from "./Body";

export default function Student() {
  return (
    <PageWrapper>
      <StudentDrawerList />
      <Line />
      <MainWrapper>
        <Body />
      </MainWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #000000;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #f0f0f0;
`;

const MainWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;
