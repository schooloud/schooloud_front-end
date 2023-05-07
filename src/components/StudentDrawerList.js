import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsIcon from "@mui/icons-material/Dns";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
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
    const projectId = params.projectId || "project1";

    if (newSelectedDrawer === selectedDrawer) {
      return;
    } else if (["proposal", "writeproposal"].includes(newSelectedDrawer)) {
      navigate(`/student/${newSelectedDrawer}`);
    } else {
      navigate(`/student/project/${projectId}/${newSelectedDrawer}`);
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
      <ListCategory>Compute</ListCategory>
      <ListButton
        id="instance"
        className={selectedDrawer === "instance" && "selected"}
        onClick={handleDrawerClick}
      >
        <DnsIcon />
        <ListText>Instance</ListText>
      </ListButton>
      <ListButton
        id="keypair"
        className={selectedDrawer === "keypair" && "selected"}
        onClick={handleDrawerClick}
      >
        <VpnKeyIcon />
        <ListText>Key Pair</ListText>
      </ListButton>
      <ListCategory>Proposal</ListCategory>
      <ListButton
        id="proposal"
        className={selectedDrawer === "proposal" && "selected"}
        onClick={handleDrawerClick}
      >
        <DescriptionIcon />
        <ListText>Proposal</ListText>
      </ListButton>
      <ListButton
        id="writeproposal"
        className={selectedDrawer === "writeproposal" && "selected"}
        onClick={handleDrawerClick}
      >
        <NoteAddIcon />
        <ListText>Write Proposal</ListText>
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

const ListCategory = styled.div`
  width: 100%;
  height: 3.6rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1.3rem;
  color: #505050;
`;

const ListText = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.9rem;
  font-size: 1.1rem;
`;
