import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Quota from "./Quota";
import Proposal from "./Proposal";
import Project from "./Project";
import Proxy from "./Proxy";
import User from "./User";
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
          quota: <Quota />,
          proposal: <Proposal />,
          project: <Project />,
          proxy: <Proxy />,
          user: <User />,
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
  height: 100%;
`;

const BodyWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;
