import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";

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
      formRef.current.password.value === serverDummy.password
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
      <Container>
        <Logo>
          <LogoImage src={logoImage} alt="" />
        </Logo>
        <Box>
          <Title>로그인</Title>
          <Form ref={formRef}>
            <Input type="text" name="id" placeholder="이메일" required />
            <Input
              type="password"
              name="password"
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
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  height: 100%; //고정
  width: 100vw; //바뀜
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40rem;
  width: 35rem;
`;

//make header left side
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: #ffffff;
  color: #000000;
`;

const LogoImage = styled.img`
  height: 35%;
`;
const Box = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  border-radius: 10px;

  /* padding-left: 10px; */
`;

const Title = styled.h1`
  margin: 50px 0 30px 0;
  width: 80%;

  /* font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px; */
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
  border: none;
  color: white;
  border-radius: 5px;
  background-color: green;
  cursor: pointer;
`;

export default Login;
