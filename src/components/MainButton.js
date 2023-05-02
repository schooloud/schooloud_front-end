import React from "react";
import styled, { css } from "styled-components";

//outline, fullWidth, color, size 설정해서 사용하면 됩니다.
// ex) <MainButton outline fullWidth color="blue" size="large">Button</MainButton>
// ex> <MainButton color="blue" size="large">Button</MainButton>

const colorStyles = css`
  ${({ color, border }) => {
    return css`
      background-color: var(${`--${color}`});
      border: 1px solid var(${`--${border}`});
      &:hover {
        background-color: var(${`--${color}`});
        opacity: 0.8; // lighten이 되어 있던 자리
      }
      &:active {
        background-color: var(${`--${color}`});
        opacity: 1;
      }
      ${(props) =>
        props.outline &&
        css`
          color: var(${`--${color}`});
          background: none;
          border: 1px solid var(${`--${color}`});
          &:hover {
            background-color: var(${`--${color}`});
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: "3rem",
    fontSize: "large",
  },
  medium: {
    height: "2.5rem",
    fontSize: "medium", //medium == 1rem
  },
  small: {
    height: "2rem",
    fontSize: "small",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

//fullWidth가 true일 때의 스타일 설정, 부모의 80%를 차지하고 가운데 정렬
const fullWidthStyle = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 80%;
      justify-content: center;
      & + & {
        margin-left: 0;
      }
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  outline: none;

  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}
  /* 색상 */
  ${colorStyles}
  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
  ${fullWidthStyle}

  &:disabled {
    background: var(--medium);
    /* border: 1px solid var(--dark); */
    cursor: not-allowed;
  }

  ${(props) =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

function MainButton({
  children,
  border,
  color,
  size,
  outline,
  fullWidth,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      border={border}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

MainButton.defaultProps = {
  color: "#3CC23F",
  size: "medium",
};

export default MainButton;
