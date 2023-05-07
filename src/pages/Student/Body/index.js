import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Instance from "./Instance";
import KeyPair from "./KeyPair";
import Proposal from "./Proposal";
import WriteProposal from "./WriteProposal";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
    <BodyContainer params={params}>
      <BodyWrapper>{content}</BodyWrapper>
    </BodyContainer>
  );
}

const BodyContainer = styled.div`
  width: calc(${window.screen.width}px - 15rem);
  height: ${({ params }) =>
    ["proposal", "writeproposal"].includes(params.selectedDrawer)
      ? "100%"
      : "calc(100% - 3.6rem)"};
  margin-top: ${({ params }) =>
    ["proposal", "writeproposal"].includes(params.selectedDrawer) || "3.6rem"};
`;

const BodyWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;
