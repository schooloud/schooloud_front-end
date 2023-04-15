import ProfessorDrawerList from "../../components/ProfessorDrawerList";
import styled from "styled-components";
import Body from "./Body";

export default function Student() {
  return (
    <PageWrapper>
      <ProfessorDrawerList />
      <Line />
      <MainWrapper>
        <BodyWrapper>
          <Body />
        </BodyWrapper>
      </MainWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #f0f0f0;
`;

const MainWrapper = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 2%;
`;
