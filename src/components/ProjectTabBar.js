import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetApi } from "../utils/http";
export default function ProjectTabBar() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState(
    params.projectId || "project1"
  );
  const [projectList, setProjectList] = useState([]);
  const queryClient = useQueryClient();
  // const projects = queryClient.getQueryData("projects")?.data?.projects;

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => useGetApi("project/list"),
    onSuccess: (data) => {
      if (!data.data.projects.length) {
        setDisabled(true);
      }
      setProjectList([...data.data.projects]);
    },
  });

  useEffect(() => setSelectedProject(params.projectId), [params]);

  const handleProjectClick = (event) => {
    const newProjectId = event.currentTarget.id;
    const selectedDrawer = params.selectedDrawer || projects[0].project_id;

    if (newProjectId === selectedProject) {
      return;
    } else {
      navigate(`/projectId/${newProjectId}/${selectedDrawer}`);
      queryClient.removeQueries({ queryKey: ["instances"] });
    }
  };

  return (
    <TabWrapper>
      {projectList?.map(({ project_id, project_name }) => (
        <TabBox
          key={project_id}
          id={project_id}
          className={selectedProject === project_id ? "selected" : "unSelected"}
          onClick={handleProjectClick}
        >
          {selectedProject === project_id ? (
            <FolderIcon />
          ) : (
            <FolderIcon style={{ color: "#b0b0b0" }} />
          )}
          <TabBoxText
            className={selectedProject === project_id || "unSelected"}
          >
            {project_name}
          </TabBoxText>
        </TabBox>
      ))}
    </TabWrapper>
  );
}

const TabWrapper = styled.div`
  width: calc(${window.screen.width}px - 15rem);
  height: 3.6rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: flex-end;
  overflow: auto;
`;

const TabBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding-left: 1%;
  margin-right: 0.3%;

  &.unSelected {
    border-top: 2px solid #b0b0b0;
    &:hover {
      background-color: #ffffff;
      cursor: pointer;
    }
  }

  &.selected {
    border-top: 2px solid var(--semi-dark);
    background-color: #ffffff;
    &:hover {
      background-color: #ffffff;
      cursor: default;
    }
  }
`;

const TabBoxText = styled.div`
  margin-left: 4%;

  &.unSelected {
    color: #b0b0b0;
  }
`;
