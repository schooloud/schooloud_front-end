import Student from "./pages/Student";
import Professor from "./pages/Professor";
import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  return (
    <AppContainer>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/projectId" element={<Home />}>
            <Route path=":projectId" element={<Home />}>
              <Route path=":selectedDrawer" element={<Home />}>
                <Route path=":create" element={<Home />} />
              </Route>
            </Route>
          </Route>
          <Route path=":selectedDrawer" element={<Home />} />
          <Route
            path="/*"
            element={
              <LoadingOverlayWrapper>
                <LoadingOverlay />
                <Text>This is Infinite Storm.</Text>
                <Text>Please don't come here.</Text>
              </LoadingOverlayWrapper>
            }
          />
        </Routes>
      </AppWrapper>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
`;

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;

const LoadingOverlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #4fa94d;
  font-size: 1rem;
`;
