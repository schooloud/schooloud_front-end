import Student from "./pages/Student";
import Professor from "./pages/Professor";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import styled from "styled-components";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AppContainer>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/student/project" element={<Student />}>
            <Route path=":projectId" element={<Student />}>
              <Route path=":selectedDrawer" element={<Student />}>
                <Route path=":create" element={<Student />} />
              </Route>
            </Route>
          </Route>
          <Route path="/student" element={<Student />}>
            <Route path=":selectedDrawer" element={<Student />} />
          </Route>
          <Route path="/professor/:selectedDrawer" element={<Professor />} />
          <Route path="/admin/:selectedDrawer" element={<Admin />} />
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
