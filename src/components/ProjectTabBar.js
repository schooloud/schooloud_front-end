import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import { useQueryClient } from "react-query";
export default function ProjectTabBar() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState(
    params.projectId || "project1"
  );
  const queryClient = useQueryClient();
  const projects = queryClient.getQueryData("projects")?.data?.projects;

  useEffect(() => setSelectedProject(params.projectId), [params]);

  const handleProjectClick = (event) => {
    const newProjectId = event.currentTarget.id;
    const selectedDrawer = params.selectedDrawer || projects[0].project_id;

    if (newProjectId === selectedProject) {
      return;
    } else {
      navigate(`/projectId/${newProjectId}/${selectedDrawer}`);
    }
  };

  return (
    <TabWrapper>
      {projects?.map(({ project_id, project_name }) => (
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
      {/* <TabBox
        id={"project2"}
        className={selectedProject === "project2" ? "selected" : "unSelected"}
        onClick={handleProjectClick}
      >
        {selectedProject === "project2" ? (
          <FolderIcon />
        ) : (
          <FolderIcon style={{ color: "#b0b0b0" }} />
        )}
        <TabBoxText className={selectedProject === "project2" || "unSelected"}>
          Project2
        </TabBoxText>
      </TabBox>
      <TabBox
        id={"project3"}
        className={selectedProject === "project3" ? "selected" : "unSelected"}
        onClick={handleProjectClick}
      >
        {selectedProject === "project3" ? (
          <FolderIcon />
        ) : (
          <FolderIcon style={{ color: "#b0b0b0" }} />
        )}
        <TabBoxText className={selectedProject === "project3" || "unSelected"}>
          Project3
        </TabBoxText>
      </TabBox> */}
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
