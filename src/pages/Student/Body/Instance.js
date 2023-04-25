import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";

export default function Instance() {
  const [selecetedCol, setSelectedCol] = useState([]);
  return (
    <div>
      <div
        style={{
          fontWeight: 600,
          fontSize: "1.3rem",
          marginBottom: "1.5rem",
        }}
      >
        Instance
      </div>
      <Button></Button>
      <Table selectedCol={selecetedCol} setSelectedCol={setSelectedCol} />
    </div>
  );
}

const Button = styled.div``;
