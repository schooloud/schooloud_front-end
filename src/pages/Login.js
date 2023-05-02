import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";
import MainButton from "../components/MainButton";

const serverDummy = {
  id: "test@naver.com",
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
  const [cookies, setCookie] = useCookies({}); // 쿠키 훅
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = useCallback(
    (e) => {
      const { name } = e.target;
      setForm({
        ...form,
        [name]: e.target.value,
      });
    },
    [form]
  );

  console.log(form.id);
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
    if (form.id === serverDummy.id && form.password === serverDummy.password) {
      //토큰 저장
      for (let key in tokenDummy) {
        setCookie(key, tokenDummy[key]);
      }
      navigate("/home"); // 로그인 성공시 메인 페이지로 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <LoginWrapper>
      <Container>
        <Logo>
          <LogoImage src={logoImage} alt="" />
        </Logo>
        <Box>
          <Title>로그인</Title>
          <Form>
            <Input
              type="email"
              name="id"
              placeholder="이메일"
              required
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              required
              onChange={handleChange}
            />
            <MainButton
              color={"main"}
              fullWidth={true}
              marginTop={"1rem"}
              onClick={login}
              disabled={form.id === "" || form.password === "" ? true : false}
              // marginTop={"1rem"}
            >
              로그인
            </MainButton>
          </Form>
        </Box>
        <SignUpButton onClick={handleClick}>회원가입</SignUpButton>
      </Container>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  height: 100%; //고정
  width: 100vw; //바뀜
`;

const Container = styled.div`
  position: relative;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  width: 30rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 3rem;
  background-color: #ffffff;
  color: #000000;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const Box = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.h1`
  margin: 50px 0 20px 0;
  width: 80%;
  font-size: 1rem;
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
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 10px;
`;

// const LoginButton = styled.button`
//   width: 80%;
//   height: 40px;
//   margin-top: 10px;
//   border: none;
//   color: white;
//   font-size: large;
//   border-radius: 4px;
//   background-color: var(--main);
//   border: 1px solid var(--medium);
//   cursor: pointer;
//   letter-spacing: 1px;
//   &:disabled {
//     background-color: var(--medium);
//     cursor: not-allowed;
//   }
// `;

const SignUpButton = styled.div`
  margin-top: 10px;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1rem;
  width: 5rem;
  font-size: 1rem;
  cursor: pointer;
`;

export default Login;
