/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";
import MainButton from "../components/MainButton";
import { usePostApi } from "../utils/http";
import { useMutation } from "react-query";
import removeCookies from "../utils/removeCookies";

const serverDummy = {
  id: "test@naver.com",
  password: "1234",
};

//현재의 오류
//tokenDummy의 expiredAt이 로그인할 때 마다 업데이트 되지 않음

const Login = (props) => {
  const location = useLocation();
  const cookies = new Cookies();
  const navigate = useNavigate();

  //만약 쿠키에 들고 있는 토큰이 있다면 그 토큰이 유효한지 검사하고 유효하다면 로그인 처리
  //만약 쿠키에 들고 있는 토큰이 있다면 그 토큰이 유효하지 않다면 쿠키를 삭제하고 로그인 페이지로 이동
  //form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //input 값 변경 시
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

  // 로그인 hook
  const loginMutation = useMutation({
    mutationFn: (form) => usePostApi("user/login", form),
    onSuccess: (data) => {
      // console.log(data);
      // navigate("/student/project/project1/dashboard");
      alert("login success");
    },
  });

  //로그인 hook
  // const loginMutation = useMutation(usePostApi("/auth/login", form));

  //로그인 버튼 클릭 시
  const handleClickLogin = (e) => {
    e.preventDefault();
    // const response = usePostApi("user/login", form);
    //토큰 dummy
    // const tokenDummy = {
    //   sessionKey: "1",
    //   //get now time and add 10 minutes
    //   expiredAt: new Date().getTime() + 1000 * 60 * 10,
    //   email: "cat1181123@naver.com",
    //   role: "STUDENT",
    //   name: "김뚱이",
    // };
    // 이메일 중복확인 hook

    loginMutation.mutate(form);

    //로그인 성공
    // if  {
    //   //토큰 저장
    //   for (let key in tokenDummy) {
    //     cookies.set(key, tokenDummy[key]);
    //   }
    //   //쿠키 출력

    //   navigate("/home"); // 로그인 성공시 role에 따라 페이지 이동
    // } else {
    //   alert("아이디 또는 비밀번호가 틀렸습니다.");
    // }
  };

  console.log(loginMutation);

  //회원가입 버튼 클릭 시
  const handleClick = () => {
    navigate("/signup");
  };

  // useEffect(() => {
  //   if (!!cookies.sessionKey) {
  //     console.log("쿠키가 있다.");
  //     //토큰 만료시간이 안 지났다면 로그인 처리
  //     if (cookies.expiredAt.getTime() > new Date().getTime()) {
  //       navigate("/home");
  //     } else {
  //       //쿠키 삭제
  //       // removeCookies();
  //     }
  //   } else {
  //     console.log(cookies?.expiredAt);
  //     // removeCookies();
  //   }
  // }, [location]);

  return (
    <LoginContainer>
      <LoginWrapper>
        <Container>
          <Logo>
            <LogoImage src={logoImage} alt="" />
          </Logo>
          <BoxContainer>
            <Box>
              <Title>로그인</Title>
              <Form>
                <Input
                  type="email"
                  name="email"
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
                  onClick={handleClickLogin}
                  disabled={
                    form.email === "" || form.password === "" ? true : false
                  }
                  // marginTop={"1rem"}
                >
                  로그인
                </MainButton>
              </Form>
            </Box>
          </BoxContainer>
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

const Box = styled.div`
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
  margin-bottom: 1.5rem;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const BoxContainer = styled.div`
  padding: 3rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.h1`
  margin: 0 0 1.4rem 0;
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
  margin-bottom: 0.6rem;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 0.6rem;
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
