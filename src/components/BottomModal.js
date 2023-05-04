import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Crop169Icon from "@mui/icons-material/Crop169";
import Crop32Icon from "@mui/icons-material/Crop32";
import Crop75Icon from "@mui/icons-material/Crop75";
import { useState } from "react";
export default function BottomModal({ open, setOpen, children }) {
  const [modalHeight, setModalHeight] = useState("medium");

  return (
    <ModalContainer Height={modalHeight} open={open}>
      <ModalWrapper>
        {children}
        <ModalControlContainer>
          <IconWrapper
            className={modalHeight === "small" && "selected"}
            onClick={() => setModalHeight("small")}
          >
            <Crop169Icon />
          </IconWrapper>
          <IconWrapper
            className={modalHeight === "medium" && "selected"}
            onClick={() => setModalHeight("medium")}
          >
            <Crop32Icon />
          </IconWrapper>
          <IconWrapper
            className={modalHeight === "large" && "selected"}
            onClick={() => setModalHeight("large")}
          >
            <Crop75Icon />
          </IconWrapper>
          <IconWrapper
            className="closeIcon"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconWrapper>
        </ModalControlContainer>
      </ModalWrapper>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: ${`${window.screen.width * 0.862}px`};
  /* width: 86.2%; */
  /* min-width: 1100px; */
  height: ${({ Height, open }) =>
    open
      ? Height === "large"
        ? "70%"
        : Height === "medium"
        ? "50%"
        : "30%"
      : "0"};
  position: fixed;
  bottom: 0;
  left: ${`${window.screen.width * 0.138}px`};
  display: flex;
  justify-content: center;
  transition: height 0.5s;
`;

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  /* border: 1px solid #000000; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.48);
  background-color: white;
  margin: 0 1.5rem;
  margin-top: 0.5rem;
  padding: 1.6rem 1.8rem;
`;

const ModalControlContainer = styled.div`
  position: absolute;
  height: 1rem;
  top: 1rem;
  right: 0.8rem;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 0.2rem;
  cursor: pointer;
  color: #c0c0c0;

  &:hover {
    color: black;
  }
  &.selected {
    color: black;
  }

  &.closeIcon {
    margin-left: 0.8rem;
    color: black;
  }
`;
