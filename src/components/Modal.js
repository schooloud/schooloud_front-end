import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import MainButton from "./MainButton";

function Modal({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;
  return (
    <DarkBackground diappear={!visible}>
      <ModalBlock diappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <MainButton
            marginRight={0.5}
            color={"extra-light"}
            onClick={onCancel}
          >
            {cancelText}
          </MainButton>
          <MainButton color={"main"} onClick={onConfirm}>
            {confirmText}
          </MainButton>
        </ButtonGroup>
      </ModalBlock>
    </DarkBackground>
  );
}

Modal.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slidUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.diappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const ModalBlock = styled.div`
  width: 20rem;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slidUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.diappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

export default Modal;
