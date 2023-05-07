import styled from "styled-components";
import Table from "../../../components/Table";
export default function Proxy() {
  const handleRowClick = (id) => {};

  const dummy = [
    {
      id: "1",
      projectName: "project2",
      instanceId: "1",
      instanceName: "instance1",
      port: "24",
      domain: "ateam",
    },
    {
      id: "2",
      projectName: "project3",
      instanceId: "2",
      instanceName: "instance2",
      port: "24",
      domain: "ateam",
    },
    {
      id: "3",
      projectName: "project3",
      instanceId: "3",
      instanceName: "instance3",
      port: "24",
      domain: "ateam",
    },
    {
      id: "4",
      projectName: "project2",
      instanceId: "4",
      instanceName: "instance4",
      port: "24",
      domain: "ateam",
    },
    {
      id: "5",
      projectName: "project1",
      instanceId: "5",
      instanceName: "instance5",
      port: "24",
      domain: "ateam",
    },
  ];

  return (
    <Container>
      <TitleText>Proxy List</TitleText>
      <Table
        data={dummy}
        header={[
          "Project Name",
          "Instance Id",
          "Instance Name",
          "Port",
          "Domain",
        ]}
        onClick={handleRowClick}
        checkBox={false}
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
