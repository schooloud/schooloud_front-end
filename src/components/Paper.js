import React from "react";
import styled from "styled-components";

export default function Paper({
  title,
  usage,
  total,
  width,
  height,
  textSize = "medium",
  unit,
  children,
}) {
  return (
    <Card width={width} height={height}>
      <Title textSize={textSize}>{title}</Title>
      <Contents>
        <Usage textSize={textSize}>{usage}</Usage>
        {total && (
          <Total textSize={textSize}>
            &nbsp;/&nbsp;{total}
            &nbsp;{unit}
          </Total>
        )}
      </Contents>
      {children}
    </Card>
  );
}

const sizes = {
  large: {
    titleSize: "1.5rem",
    usageSize: "2rem",
  },
  medium: {
    titleSize: "1rem", //medium == 1rem
    usageSize: "1.5rem",
  },
  small: {
    titleSize: "0.8rem",
    usageSize: "1rem",
  },
};

const Card = styled.div`
  width: calc(${(props) => props.width}% - 1rem);
  height: ${(props) => props.height}rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  & + & {
    margin-left: 1rem;
  }
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.div`
  word-break: break-all;
  font-size: ${(props) => sizes[props.textSize].titleSize};
  font-weight: 200;
  margin: 1rem;
  color: grey;
`;

const Contents = styled.div`
  display: flex;
  margin: 1rem;
`;

const Usage = styled.div`
  font-size: ${(props) => sizes[props.textSize].usageSize};
  font-weight: bold;
`;

const Total = styled.div`
  font-size: ${(props) => sizes[props.textSize].usageSize};
  font-weight: bold;
`;
