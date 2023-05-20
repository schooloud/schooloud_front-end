import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import MainButton from "./MainButton";

//darkBackground는 배경이 검은색인지 아닌지를 설정합니다.
function Modal({
  darkBackground,
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
  width,
  height,
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
    <DarkBackground darkBackground={darkBackground} disappear={!visible}>
      <ModalBlock
        width={width}
        height={height}
        darkBackground={darkBackground}
        diappear={!visible}
      >
        <Title>{title}</Title>
        <div>{children}</div>
        <ButtonGroup height={height}>
          {onCancel && (
            <MainButton
              size="small"
              marginRight={0.5}
              color="light"
              fontColor="var(--dark)"
              onClick={onCancel}
            >
              {cancelText}
            </MainButton>
          )}
          {onConfirm && (
            <MainButton size="small" color="main" onClick={onConfirm}>
              {confirmText}
            </MainButton>
          )}
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
    opacity:0;
    transform: translateY(200px);
  }
  to {
    opacity:1;
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    opacity:1;
    transform: translateY(0px);
  }
  to {
    opacity:0;
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  z-index: 200;
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

  ${(props) =>
    props.darkBackground ||
    css`
      background: none;
    `}
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
`;

const ModalBlock = styled.div`
  position: relative;
  width: ${(props) => `${props.width}rem` || "20rem"};
  height: ${(props) => `${props.height}rem` || "auto"};
  padding: 1.5rem;
  overflow-y: auto;
  background: white;
  border-radius: 5px;
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

  ${(props) =>
    props.darkBackground ||
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `}
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 1.2rem;
  /* margin-top: ${(props) => `${props.height - 9}rem` || "3rem"}; */
  display: flex;
  justify-content: flex-start;
`;

export default Modal;
