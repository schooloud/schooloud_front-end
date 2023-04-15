import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProjectTabBar() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState(
    params.projectId || "project1"
  );

  useEffect(() => setSelectedProject(params.projectId), [params]);

  if (params.projectId === undefined) {
    return <div></div>;
  }

  const handleProjectClick = (event) => {
    const newProjectId = event.currentTarget.id;
    const selectedDrawer = params.selectedDrawer || "project1";

    if (newProjectId === selectedProject) {
      return;
    } else {
      navigate(`/student/project/${newProjectId}/${selectedDrawer}`);
    }
  };

  return (
    <TabWrapper>
      <TabBox
        id={"project1"}
        className={selectedProject === "project1" ? "selected" : "unSelected"}
        onClick={handleProjectClick}
      >
        Project1
      </TabBox>
      <TabBox
        id={"project2"}
        className={selectedProject === "project2" ? "selected" : "unSelected"}
        onClick={handleProjectClick}
      >
        Project2
      </TabBox>
      <TabBox
        id={"project3"}
        className={selectedProject === "project3" ? "selected" : "unSelected"}
        onClick={handleProjectClick}
      >
        Project3
      </TabBox>
    </TabWrapper>
  );
}

const TabWrapper = styled.div`
  width: 100%;
  height: 7%;
  background-color: #f0f0f0;
  display: flex;
  align-items: flex-end;
  /* padding-left: 1%; */
`;

const TabBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding-left: 4%;
  margin-right: 0.3%;

  &.unSelected {
    border-top: 2px solid #b0b0b0;
    &:hover {
      background-color: #ffffff;
      cursor: pointer;
    }
  }

  &.selected {
    border-top: 2px solid #4f9f51;
    background-color: #ffffff;
    &:hover {
      background-color: #ffffff;
      cursor: default;
    }
  }
`;
