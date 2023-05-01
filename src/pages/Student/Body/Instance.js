import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";

export default function Instance() {
  const [selecetedCol, setSelectedCol] = useState([]);

  return (
    <Container>
      <TitleText
        style={{
          fontWeight: 600,
          fontSize: "1.3rem",
          marginBottom: "1.5rem",
        }}
      >
        Instance
      </TitleText>
      <Button></Button>
      <Table selectedCol={selecetedCol} setSelectedCol={setSelectedCol} />
    </Container>
  );
}

const Container = styled.div``;

const TitleText = styled.div`
  font-weight: 600;
  font-size: "1.3rem";
  margin-bottom: "1.5rem";
`;

const Button = styled.div``;
