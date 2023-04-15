import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";

export default function ProfessorDrawerList() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDrawer, setSelectedDrawer] = useState(
    params.selectedDrawer || "proposal"
  );

  useEffect(() => setSelectedDrawer(params.selectedDrawer), [params]);

  const handleDrawerClick = (event) => {
    const newSelectedDrawer = event.currentTarget.id;

    if (newSelectedDrawer === selectedDrawer) {
      return;
    } else {
      navigate(`/professor/${newSelectedDrawer}`);
    }
  };

  return (
    <DrawerWrapper>
      <Logo>
        <LogoImage src={logoImage} alt="" />
      </Logo>
      <ListCategory>Proposal</ListCategory>
      <ListButton
        id="proposal"
        className={selectedDrawer === "proposal" && "selected"}
        onClick={handleDrawerClick}
      >
        <DescriptionIcon />
        <ListText>Proposal</ListText>
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
