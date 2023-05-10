import styled from "styled-components";
import MainButton from "../../../components/MainButton";
import { useState } from "react";
import Table from "../../../components/Table";

export default function User() {
  const [toggle, setToggle] = useState("Student");
  const [page, setPage] = useState(0);

  const handleRowClick = (id) => {};

  const handleToggleClick = (to) => {
    setPage(0);
    setToggle(to);
  };

  const dummy = [
    {
      id: "1",
      name: "정눌엉",
      email: "jsb@naver.com",
      major: "jungle",
      num: "123131312",
      role: "student",
    },
    {
      id: "2",
      name: "유동라재진",
      email: "yjh@naver.com",
      major: "adCarry",
      num: "123423424",
      role: "professor",
    },
    {
      id: "3",
      name: "예리미양",
      email: "lyr@naver.com",
      major: "supporter",
      num: "132421342",
      role: "student",
    },
    {
      id: "4",
      name: "석키스",
      email: "ksh@naver.com",
      major: "mangnani",
      num: "12424124",
      role: "student",
    },
    {
      id: "5",
      name: "리쉰",
      email: "lsi@naver.com",
      major: "faker",
      num: "12423423",
      role: "student",
    },
  ];

  const studentList = dummy.filter((row) => row.role === "student");
  const professorList = dummy.filter((row) => row.role === "professor");

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
        data={toggle === "Student" ? [studentList] : [professorList]}
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
