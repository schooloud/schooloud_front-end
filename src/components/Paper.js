import React from "react";
import styled from "styled-components";

export default function Paper({
  title,
  usage,
  total,
  width,
  height,
  unit,
  children,
}) {
  return (
    <Card width={width} height={height}>
      <Title>{title}</Title>
      <Contents>
        <Usage>{usage}</Usage>
        {total && (
          <Total>
            &nbsp;/&nbsp;{total}
            &nbsp;{unit}
          </Total>
        )}
      </Contents>
      {children}
    </Card>
  );
}

const Card = styled.div`
  width: ${(props) => props.width}%;
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
  font-size: 1rem;
  font-weight: 200;
  margin: 1rem;
  color: grey;
`;

const Contents = styled.div`
  display: flex;
  margin: 1rem;
`;

const Usage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Total = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
