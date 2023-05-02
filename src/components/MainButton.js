import React from "react";
import styled, { css } from "styled-components";

//outline, fullWidth, color, size 설정해서 사용하면 됩니다.
//margin은 버튼 두 개 이상 시 그 사이에 생기는 margin입니다. 두 값을 같은 값을 사용하시고, 혹여나 다른 값이라면 뒤에 오는 값이 적용됩니다.
// ex) <MainButton outline fullWidth color="blue" size="large">Button</MainButton>
// ex> <MainButton color="blue" size="large">Button</MainButton>

const colorStyles = css`
  ${({ color }) => {
    const computedStyles = window.getComputedStyle(document.documentElement);
    const selected = computedStyles.getPropertyValue(`—-${color}`);

    return css`
      background-color: var(${`--${color}`});
      &:hover {
        background-color: var(${`--${color}`});
        opacity: 0.8; // lighten이 되어 있던 자리
      }
      &:active {
        background-color: var(${`--${color}`});
        //darken이 되어 있던 자리
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background-color: none;
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
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyle = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */

  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}

  /* 기타 */
  & + & {
    margin-left: ${({ margin }) => `${margin}rem`};
  }

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

function MainButton({
  children,
  color,
  size,
  outline,
  fullWidth,
  margin = 1,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      margin={margin}
      className={{ ...rest }?.disabled ? "deactive" : "active"}
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
