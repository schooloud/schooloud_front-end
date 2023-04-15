import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsIcon from "@mui/icons-material/Dns";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";

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
      <Logo>
        <LogoImage src={logoImage} alt="" />
      </Logo>
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
  width: 16%;
  height: 100%;
  background-color: #ffffff;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 14%;
  background-color: #ffffff;
  color: #000000;
`;

const LogoImage = styled.img`
  height: 35%;
`;

const ListButton = styled.div`
  width: 100%;
  height: 8%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 8%;
  &.selected {
    background-color: #dfeedc;
  }
  &:hover {
    opacity: 80%;
    cursor: pointer;
  }
`;

const ListCategory = styled.div`
  width: 100%;
  height: 8%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 8%;
  color: #505050;
`;

const ListText = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.2%;
  margin-left: 5%;
  font-size: 1.1rem;
`;
