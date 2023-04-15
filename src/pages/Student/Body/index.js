import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Instance from "./Instance";
import KeyPair from "./KeyPair";
import Proposal from "./Proposal";
import WriteProposal from "./WriteProposal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectTabBar from "../../../components/ProjectTabBar";

export default function Body() {
  const params = useParams();
  const [content, setContent] = useState(<Dashboard />);

  useEffect(
    () =>
      setContent(
        {
          dashboard: <Dashboard />,
          instance: <Instance />,
          keypair: <KeyPair />,
          proposal: <Proposal />,
          writeproposal: <WriteProposal />,
        }[params.selectedDrawer || "dashboard"]
      ),
    [params]
  );

  return (
    <BodyContainer>
      <ProjectTabBar />
      <BodyWrapper params={params}>{content}</BodyWrapper>
    </BodyContainer>
  );
}

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const BodyWrapper = styled.div`
  height: ${({ params }) =>
    ["proposal", "writeproposal"].includes(params.selectedDrawer)
      ? "100%"
      : "93%"};
  padding: 2%;
  background-color: #ffffff;
`;
