import styled from "styled-components";
import Cookies from "universal-cookie";
import Student from "../Student";
import Professor from "../Professor";
import Admin from "../Admin";

export default function Home() {
  const cookies = new Cookies();
  const role = cookies.get("role");

  if (role === "STUDENT") {
    return <Student />;
  } else if (role === "PROFESSOR") {
    return <Professor />;
  } else if (role === "ADMIN") {
    return <Admin />;
  } else {
    return <div>권한이 없습니다.</div>;
  }
}

const Box = styled.div``;
