import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const serverDummy = {
  id: "test",
  password: "1234",
};

const tokenDummy = {
  sessionKey: "1",
  //get now time and add 1 minutes
  expiredAt: new Date().getTime() + 1000 * 60 * 1,
  email: "cat1181123@naver.com",
  name: "김석희",
};

const Login = (props) => {
  const formRef = useRef();
  const [cookies, setCookie] = useCookies({}); // 쿠키 훅
  const navigate = useNavigate();

  // const login = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/users/login", {
  //       // 로그인 요청
  //       id: formRef.current.id.value,
  //       password: formRef.current.passWord.value,
  //     })
  //     .then((res) => {
  //       setCookie("id", res.data.token); // 쿠키에 토큰 저장
  //     });
  // };

  const login = (e) => {
    e.preventDefault();
    if (
      formRef.current.id.value === serverDummy.id &&
      formRef.current.passWord.value === serverDummy.password
    ) {
      //토큰 저장
      for (let key in tokenDummy) {
        setCookie(key, tokenDummy[key]);
        console.log(key);
      }
      navigate("/home"); // 로그인 성공시 메인 페이지로 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <LoginWapper>
      <Header>schooloud</Header>
      <Container>
        <Box>
          <Title>로그인</Title>
          <Form ref={formRef}>
            <Input type="text" name="id" placeholder="이메일" required />
            <Input
              type="password"
              name="passWord"
              placeholder="비밀번호"
              required
            />
            <Button onClick={login}>로그인</Button>
          </Form>
        </Box>
      </Container>
    </LoginWapper>
  );
};

const LoginWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

//make header left side
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  font-size: 30px;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 10px;
`;

const Button = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

export default Login;
