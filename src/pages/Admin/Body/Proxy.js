import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
export default function Proxy() {
  const [toggle, setToggle] = useState("SSH");
  const [page, setPage] = useState(0);

  const handleRowClick = (id) => {};
  const handleToggleClick = (to) => {
    setPage(0);
    setToggle(to); 
  };
  
  const dummy = [
    {
      id: "1",
      projectName: "project2",
      instanceId: "1",
      instanceName: "instance1",
      port: "2001",
      domain: "ateam",
    },
    {
      id: "2",
      projectName: "project3",
      instanceId: "2",
      instanceName: "instance2",
      port: "2002",
      domain: "bteam",
    },
    {
      id: "3",
      projectName: "project3",
      instanceId: "3",
      instanceName: "instance3",
      port: "2003",
      domain: "cteam",
    },
    {
      id: "4",
      projectName: "project2",
      instanceId: "4",
      instanceName: "instance4",
      port: "2004",
      domain: "",
    },
    {
      id: "5",
      projectName: "project1",
      instanceId: "5",
      instanceName: "instance5",
      port: "2005",
      domain: "",
    },
  ];

  const sshList = dummy.map(({domain, ...rest}) => rest);
  const domainList = dummy.filter((row) => !!row.domain === true).map(({port, ...rest}) => rest);


  return (
    <Container>
      <TitleText>Proxy - {toggle} List</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle === "SSH"}
          onClick={() => handleToggleClick("SSH")}
        >
          SSH List
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle === "Domain"}
          marginLeft={0.3}
          onClick={() => handleToggleClick("Domain")}
        >
          Domain List
        </MainButton>
      </ButtonContainer>
      <Line />
      <Table
        data={toggle === "SSH" ? [sshList] : [domainList]}
        header={toggle === "SSH" ? [
          "Project Name",
          "Instance Id",
          "Instance Name",
          "Port",
        ] : [
          "Project Name",
          "Instance Id",
          "Instance Name",
          "Domain",
        ]}
        onClick={handleRowClick}
        checkBox={false}
        pagination={true}
        page={page}
        setPage={setPage}
      />
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;
