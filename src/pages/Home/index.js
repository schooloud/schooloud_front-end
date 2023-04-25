import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ExpiredCheck from "../ExpiredCheck";

export default function Home() {
  const navigate = useNavigate();
  const isSelected = useRef();

  return (
    <div>
      <ExpiredCheck />
      <div>Login Page</div>
      <button onClick={() => navigate(`/student/project/project1/dashboard`)}>
        Student
      </button>
      <button onClick={() => navigate("/professor/proposal")}>Professor</button>
      <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
    </div>
  );
}

const Box = styled.div``;
