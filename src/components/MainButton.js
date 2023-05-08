import React from "react";
import styled, { css } from "styled-components";

//outline, fullWidth, color, size 설정해서 사용하면 됩니다.
//margin은 버튼 두 개 이상 시 그 사이에 생기는 margin입니다. 두 값을 같은 값을 사용하시고, 혹여나 다른 값이라면 뒤에 오는 값이 적용됩니다.
// ex) <MainButton outline fullWidth color="blue" size="large">Button</MainButton>
// ex> <MainButton color="blue" size="large">Button</MainButton>
function MainButton({
  children,
  color,
  size = "medium",
  outline,
  fullWidth = false,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  disabled = false,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      disabled={disabled}
      className={disabled ? "deactive" : "active"}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const colorStyles = css`
  ${({ color }) => {
    return css`
      background-color: var(${`--${color}`});
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
      width: 100%;
      justify-content: center;
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */

  outline: none;
  border-style: none;
  border-radius: 4px;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}

  /* margin */
  margin-left: ${({ marginLeft }) => `${marginLeft}rem`};
  margin-right: ${({ marginRight }) => `${marginRight}rem`};
  margin-top: ${({ marginTop }) => `${marginTop}rem`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}rem`};

  ${fullWidthStyle}

  &.active {
    /* 색상 */
    ${colorStyles}
    cursor: pointer;
  }

  &.deactive {
    background-color: #f0f0f0;
    color: #909090;
    cursor: default;
  }
`;

export default MainButton;
