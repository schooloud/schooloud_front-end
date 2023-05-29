import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { useGetApi } from "../../../utils/http";
import paginate from "../../../utils/paginate";
import removeCookies from "../../../utils/removeCookies";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [toggle, setToggle] = useState("Student");
  const [page, setPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useQuery({
    queryKey: ["users"],
    queryFn: () => useGetApi("user/list"),
    onSuccess: (data) => {
      console.log(data);
      setUserList([]);
      data.data.users.map((user, index) => {
        const newUserList = [];

        newUserList["id"] = index;
        newUserList["name"] = user.name;
        newUserList["email"] = user.email;
        newUserList["major"] = user.major;
        newUserList["num"] = user.student_id;
        newUserList["role"] = user.role;

        setUserList((oldUserList) => [...oldUserList, newUserList]);
      });
    },
    onError: () => {
      alert("중복 접속이 감지되었습니다.");
      removeCookies();
      navigate("/");
    },
  });

  const handleRowClick = (id) => {};

  const handleToggleClick = (to) => {
    setPage(0);
    setToggle(to);
  };

  const studentList = userList.filter((row) => row.role === "STUDENT");
  const professorList = userList.filter((row) => row.role === "PROFESSOR");

  return (
    <Container>
      <TitleText>User - {toggle} List</TitleText>
      <ButtonContainer>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle === "Student"}
          onClick={() => handleToggleClick("Student")}
        >
          Student List
        </MainButton>
        <MainButton
          size="small"
          color="medium"
          disabled={toggle !== "Student"}
          marginLeft={0.3}
          onClick={() => handleToggleClick("Professor")}
        >
          Professor List
        </MainButton>
      </ButtonContainer>
      <Line />
      <Table
        data={
          toggle === "Student"
            ? paginate(studentList, 5)
            : paginate(professorList, 5)
        }
        header={["Name", "Email", "Major", "Num", "Role"]}
        onClick={handleRowClick}
        checkBox={false}
        pagination={true}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;
