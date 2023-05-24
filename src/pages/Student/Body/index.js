import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Instance from "./Instance";
import KeyPair from "./KeyPair";
import Proposal from "./Proposal";
import WriteProposal from "./WriteProposal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi } from "../../../utils/http";
import removeCookies from "../../../utils/removeCookies";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function Body() {
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(<LoadingOverlay />);

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => useGetApi("project/list"),
    onSuccess: (data) => {
      //잘못된 URL 접근 시 쿠키 삭제 후 홈으로 이동
      const projectList = [];
      data.data.projects.map((project) => {
        projectList.push(project.project_id);
      });
      if (
        !["proposal", "writeproposal"].includes(params.selectedDrawer) &&
        !projectList.includes(params.projectId)
      ) {
        removeCookies();
        navigate("/");
      }
    },
  });

  useEffect(() => {
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
