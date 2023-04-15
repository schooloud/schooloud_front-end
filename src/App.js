import Student from "./pages/Student";
import Professor from "./pages/Professor";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { globalStyles } from "./styles/globalStyles";
import styled from "styled-components";
import Login from "./pages/Login";

function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student/project" element={<Student />}>
          <Route path=":projectId" element={<Student />}>
            <Route path=":selectedDrawer" element={<Student />} />
          </Route>
        </Route>
        <Route path="/student" element={<Student />}>
          <Route path=":selectedDrawer" element={<Student />} />
        </Route>
        <Route path="/professor/:selectedDrawer" element={<Professor />} />
        <Route path="/admin/:selectedDrawer" element={<Admin />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: ${globalStyles.maxWidth}px;
  height: ${globalStyles.maxHeight}px;
  font-size: ${globalStyles.basicFont}px;
`;
