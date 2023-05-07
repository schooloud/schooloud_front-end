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

//현재의 오류
//tokenDummy의 expiredAt이 로그인할 때 마다 업데이트 되지 않음
//로그인할 때 마다 새로운 토큰을 발급해야함

const tokenDummy = {
  sessionKey: "1",
  //get now time and add 10 minutes
  expiredAt: new Date().getTime() + 1000 * 60 * 1000,
  email: "cat1181123@naver.com",
  name: "김석희",
};

console.log(tokenDummy.expiredAt);
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
      console.log("로그인 성공");
      navigate("/home"); // 로그인 성공시 메인 페이지로 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Container>
          <Logo>
            <LogoImage src={logoImage} alt="" />
          </Logo>
          <Box>
            <BoxContainer>
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
                  marginTop={1}
                  onClick={login}
                  disabled={
                    form.id === "" || form.password === "" ? true : false
                  }
                  // marginTop={"1rem"}
                >
                  로그인
                </MainButton>
              </Form>
            </BoxContainer>
          </Box>
          <SignUpButton onClick={handleClick}>회원가입</SignUpButton>
        </Container>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 100%; //바뀜
  min-width: 32rem;
`;

const Container = styled.div`
  position: relative;
  top: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 100%;
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
  padding: 3rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.h1`
  margin: 0 0 20px 0;
  width: 100%;
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
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 10px;
`;

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
