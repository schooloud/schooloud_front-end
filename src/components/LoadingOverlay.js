import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingOverlay() {
  return (
    <Container>
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        visible={true}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
