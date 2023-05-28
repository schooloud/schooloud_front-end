/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";
import MainButton from "../components/MainButton";
import { useGetApi, usePostApi } from "../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import removeCookies from "../utils/removeCookies";

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();

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
    onSuccess: () => {
      // console.log("로그인 성공");
    },
    onError: () => {
      if (error.response.status === 404) {
        alert("로그인에 실패했습니다.", error);
      }
    },
  });

  //만약 쿠키에 들고 있는 토큰이 있다면 그 토큰이 유효한지 검사하고 유효하다면 로그인 처리
  //만약 쿠키에 들고 있는 토큰이 있다면 그 토큰이 유효하지 않다면 쿠키를 삭제하고 로그인 페이지로 이동
  useEffect(() => {
    if (!!cookies.get("session_key")) {
      //토큰 만료시간이 안 지났다면 로그인 처리
      if (
        new Date(cookies.get("expired_at")).getTime() <= new Date().getTime()
      ) {
        //토큰 만료시간이 지났다면 쿠키 삭제
        removeCookies();
      }
    } else {
      //세션키가 없다면 나머지 쿠키 삭제
      removeCookies();
    }
  }, [location]);

  //프로젝트 목록 가져오기
  useQuery({
    queryKey: ["projects"],
    queryFn: () => useGetApi("project/list"),
    enabled: !!cookies.get("session_key"),
    onSuccess: (data) => {
      //계정에 프로젝트가 있으면 대시보드 페이지로 이동
      if (!!data.data.projects.length) {
        if (cookies.get("role") === "STUDENT") {
          navigate(`/projectId/${data.data.projects[0].project_id}/dashboard`);
        } else if (cookies.get("role") === "PROFESSOR") {
          navigate("/proposal");
        } else if (cookies.get("role") === "ADMIN") {
          navigate("/dashboard");
        }
      } else {
        //계정에 프로젝트가 없다면 제안서 페이지로 이동
        if (cookies.get("role") === "STUDENT") {
          navigate(`/proposal`);
        } else if (cookies.get("role") === "PROFESSOR") {
          navigate("/proposal");
        } else if (cookies.get("role") === "ADMIN") {
          navigate("/dashboard");
        }
      }
    },
    onError: (error) => {
      if (error.response.status === 404) {
        alert("로그인에 실패했습니다.", error);
      }
    },
  });

  //로그인 버튼 클릭 시
  const handleClickLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  //회원가입 버튼 클릭 시
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
