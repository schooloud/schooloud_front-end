import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import ShareIcon from "@mui/icons-material/Share";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function StudentDrawerList() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDrawer, setSelectedDrawer] = useState(
    params.selectedDrawer || "dashboard"
  );

  useEffect(() => setSelectedDrawer(params.selectedDrawer), [params]);

  const handleDrawerClick = (event) => {
    const newSelectedDrawer = event.currentTarget.id;

    if (newSelectedDrawer === selectedDrawer) {
      return;
    } else {
      navigate(`/${newSelectedDrawer}`);
    }
  };

  return (
    <DrawerWrapper>
      <ListButton
        id="dashboard"
        className={selectedDrawer === "dashboard" && "selected"}
        onClick={handleDrawerClick}
      >
        <DashboardIcon />
        <ListText>Dashboard</ListText>
      </ListButton>
      <ListButton
        id="quota"
        className={selectedDrawer === "quota" && "selected"}
        onClick={handleDrawerClick}
      >
        <UploadFileIcon />
        <ListText>Quota</ListText>
      </ListButton>
      <ListButton
        id="proposal"
        className={selectedDrawer === "proposal" && "selected"}
        onClick={handleDrawerClick}
      >
        <DescriptionIcon />
        <ListText>Proposal</ListText>
      </ListButton>
      <ListButton
        id="project"
        className={selectedDrawer === "project" && "selected"}
        onClick={handleDrawerClick}
      >
        <FolderIcon />
        <ListText>Project</ListText>
      </ListButton>
      <ListButton
        id="proxy"
        className={selectedDrawer === "proxy" && "selected"}
        onClick={handleDrawerClick}
      >
        <ShareIcon />
        <ListText>Proxy</ListText>
      </ListButton>
      <ListButton
        id="user"
        className={selectedDrawer === "user" && "selected"}
        onClick={handleDrawerClick}
      >
        <PersonIcon />
        <ListText>User</ListText>
      </ListButton>
    </DrawerWrapper>
  );
}
const DrawerWrapper = styled.div`
  width: 15rem;
  height: 100%;
  overflow: auto;
`;

const ListButton = styled.div`
  width: 100%;
  height: 3.6rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1.3rem;
  &.selected {
    background-color: var(--light);
  }
  &:hover {
    background-color: var(--light);
    cursor: pointer;
  }
`;

const ListText = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.9rem;
  font-size: 1.1rem;
`;
