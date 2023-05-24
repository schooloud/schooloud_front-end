import styled from "styled-components";
import Table from "../../../components/Table";
import { useState } from "react";
import MainButton from "../../../components/MainButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi } from "../../../utils/http";
import paginate from "../../../utils/paginate";

export default function Proxy() {
  const [toggle, setToggle] = useState("SSH");
  const [page, setPage] = useState(0);
  const [proxyList, setProxyList] = useState([]);
  const queryClient = useQueryClient();

  const proxy = useQuery({
    queryKey: ["proxy"],
    queryFn: () => useGetApi("domain/list"),
    onSuccess: (data) => {
      setProxyList([]);
      data.data.domain_list.map((proxy, index) => {
        const newProxyList = [];

        newProxyList["id"] = index;
        newProxyList["projectName"] = proxy.project_name;
        newProxyList["instanceId"] = proxy.instance_id;
        newProxyList["instanceName"] = proxy.instance_name;
        newProxyList["port"] = proxy.port;
        newProxyList["domain"] = proxy.domain;

        setProxyList((oldProxyList) => [...oldProxyList, newProxyList]);
      });
    },
  });

  const handleRowClick = (id) => {};
  const handleToggleClick = (to) => {
    setPage(0);
    setToggle(to);
  };

  const sshList = proxyList?.map(({ domain, ...rest }) => rest);
  const domainList = proxyList
    ?.filter((row) => !!row.domain === true)
    .map(({ port, ...rest }) => rest);

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
        data={toggle === "SSH" ? paginate(sshList, 5) : paginate(domainList, 5)}
        header={
          toggle === "SSH"
            ? ["Project Name", "Instance Id", "Instance Name", "Port"]
            : ["Project Name", "Instance Id", "Instance Name", "Domain"]
        }
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
