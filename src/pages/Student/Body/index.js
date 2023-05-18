import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Instance from "./Instance";
import KeyPair from "./KeyPair";
import Proposal from "./Proposal";
import WriteProposal from "./WriteProposal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQueryClient } from "react-query";

export default function Body() {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(<Dashboard />);
  const queryClient = useQueryClient();
  const projects = queryClient.getQueryData("projects") || [];
  const projectList = [];

  projects.data?.projects?.map((project) =>
    projectList.push(project.project_id)
  );
  useEffect(() => {
    //잘못된 URL 접근 시 홈으로 이동
    if (
      !["proposal", "writeproposal"].includes(params.selectedDrawer) &&
      !projectList.includes(params.projectId)
    ) {
      navigate("/");
    }
    setContent(
      {
        dashboard: <Dashboard />,
        instance: <Instance />,
        keypair: <KeyPair />,
        proposal: <Proposal />,
        writeproposal: <WriteProposal />,
      }[params.selectedDrawer || "dashboard"]
    );
  }, [params]);

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
