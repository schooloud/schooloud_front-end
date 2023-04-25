import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ExpiredCheck from "../ExpiredCheck";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>Login Page</div>
      <button onClick={() => navigate(`/student/project/project1/dashboard`)}>
        Student
      </button>
      <button onClick={() => navigate("/professor/proposal")}>Professor</button>
      <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
      {/* <ExpiredCheck /> */}
    </div>
  );
}

const Box = styled.div``;
