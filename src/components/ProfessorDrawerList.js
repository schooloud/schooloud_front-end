import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  width: 15rem;
  height: 100%;
  overflow: auto;
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
