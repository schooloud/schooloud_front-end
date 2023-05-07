import React from "react";
import styled from "styled-components";
import Table from "../../../components/Table";

export default function Dashboard() {
  return (
    <Container>
      <TitleText>DashBoard</TitleText>
      <TitleText2 id="member">Member</TitleText2>
      <Table />
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

const TitleText2 = styled(TitleText)`
  font-weight: 400;
`;
