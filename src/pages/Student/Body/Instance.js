import styled from "styled-components";
import BasicTable from "../../../components/BasicTable";

export default function Instance() {
  return (
    <div>
      <div
        style={{
          fontWeight: 600,
          fontSize: "1.3rem",
        }}
      >
        Instance
      </div>
      <Button></Button>
      <BasicTable />
    </div>
  );
}

const Button = styled.div``;
