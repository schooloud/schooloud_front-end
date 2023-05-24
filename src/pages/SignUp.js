/* eslint-disable */
import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../components/PopUpModal";
import MainButton from "../components/MainButton";
import { useMutation } from "@tanstack/react-query";
import { usePostApi } from "../utils/http";

const SignUp = () => {
  const navigate = useNavigate();
  //이메일 유효성 검사
  const [isEmailValid, setIsEmailValid] = useState(false);
  //이메일 중복검사 클릭 시 모달
  const [isEmailDuplicateModalOpen, setIsEmailDuplicateModalOpen] =
    useState(false);
  //이메일 중복 검사
  const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
  //사용가능한 이메일
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  //비밀번호 일치 검사
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  //비밀번호 유효성 검사
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");

  //현재 input창에 캐시 때문에 들어가있는 값을 form에 넣어주기
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // form
  const [form, setForm] = useState({
    email: "",
    student_id: "",
    name: "",
    password: "",
    major: "",
    role: "STUDENT",
  });

  //이메일 변경 시
  const handleEmailChange = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    const { name } = e.target;
    setIsEmailAvailable(false);
    setForm({
      ...form,
      [name]: emailCurrent,
    });

    if (!emailRegex.test(emailCurrent)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  //password 값 변경 시
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    regPass.test(value) ? setIsPasswordValid(true) : setIsPasswordValid(false);

    if (value === passwordCheck) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  //비밀번호 재확인
  const handlePasswordCheck = (e) => {
    const { value } = e.target;
    setPasswordCheck(value);

    if (form.password === value) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  //input 값 변경 시
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // 회원가입 hook
  const signUpMutation = useMutation({
    mutationFn: (form) => usePostApi("user/register", form),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.log("서버에 문제가 있습니다.");
    },
  });

  // 이메일 중복확인 hook
  const checkEmailDuplicateMutation = useMutation({
    mutationFn: (email) => usePostApi("user/email-check", email),
    onError: (error) => {
      setIsEmailAvailable(false);
      setIsEmailDuplicateModalOpen(true);
    },
    onSuccess: () => {
      setIsEmailAvailable(true);
      setIsEmailDuplicateModalOpen(true);
    },
  });

  //가입하기 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault();
    //가입 api
    signUpMutation.mutate(form);
  };

  //로그인으로 돌아가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate("/");
  };

  //중복확인 클릭 시
  const handleDuplicateCheck = (e) => {
    e.preventDefault();

    //중복확인 api
    const emailForm = {};
    emailForm.email = form.email;

    checkEmailDuplicateMutation.mutate(emailForm);
  };

  //이 이메일을 사용하시겠습니까?
  const onEmailAvailConfirm = () => {
    setIsEmailDuplicateChecked(true);
    setIsEmailDuplicateModalOpen(false);
  };

  //이 이메일을 사용하지 않겠습니까?
  const onEmailAvailCancel = () => {
    setIsEmailDuplicateChecked(false);
    setIsEmailDuplicateModalOpen(false);
  };

  //이메일 중복 : 이메일을 다시 입력해주세요.
  const onEmailNotAvailConfirm = () => {
    setIsEmailDuplicateModalOpen(false);
  };

  return (
    <SignupContainer>
      <SignUpWrapper>
        <BoxContainer>
          <Logo>
            <LogoImage src={logoImage} alt="" />
          </Logo>
          <Box>
            <BoxWrapper>
              <Title>회원가입</Title>
              <Form>
                <Label>이메일</Label>
                <EmailDiv>
                  <InputEmail
                    ref={emailInputRef}
                    type="text"
                    name="email"
                    onChange={handleEmailChange}
                    required
                  />
                  <MainButton
                    color="main"
                    // border={"dark"}
                    disabled={!isEmailValid}
                    onClick={handleDuplicateCheck}
                  >
                    중복 확인
                  </MainButton>
                </EmailDiv>
                {isEmailValid ? (
                  isEmailDuplicateChecked ? (
                    <EmailCheckMessage color="#2D791E">
                      중복 확인이 완료되었습니다.
                    </EmailCheckMessage>
                  ) : (
                    <EmailCheckMessage color="#2D791E">
                      이메일 형식이 맞습니다. 중복 확인을 해주세요.
                    </EmailCheckMessage>
                  )
                ) : (
                  <EmailCheckMessage>
                    올바른 이메일 형식이 아닙니다.
                  </EmailCheckMessage>
                )}
                <Label>비밀번호</Label>
                <Input
                  ref={passwordInputRef}
                  type="password"
                  name="password"
                  onChange={handlePasswordChange}
                  required
                />
                {isPasswordValid ? (
                  <PasswordCheckMessage color="#2D791E">
                    비밀번호가 유효합니다.
                  </PasswordCheckMessage>
                ) : (
                  <PasswordCheckMessage>
                    영문, 숫자, 특수문자를 포함한 8~25자리 숫자를 입력하세요.
                  </PasswordCheckMessage>
                )}
                <Label>비밀번호 재확인</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handlePasswordCheck}
                  required
                />
                {isPasswordSame ? (
                  <PasswordCheckMessage color="#2D791E">
                    비밀번호가 일치합니다.
                  </PasswordCheckMessage>
                ) : (
                  <PasswordCheckMessage>
                    비밀번호가 일치하지 않습니다.
                  </PasswordCheckMessage>
                )}
                <Label>학번</Label>
                <Input
                  type="text"
                  name="student_id"
                  onChange={handleInputChange}
                  required
                />
                <Label>이름</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
                <Label>전공</Label>
                <Input
                  type="text"
                  name="major"
                  onChange={handleInputChange}
                  required
                />
              </Form>
              <MainButton
                color="main"
                // border="dark"
                fullWidth={true}
                disabled={
                  !(
                    isEmailValid &&
                    isEmailDuplicateChecked &&
                    isPasswordSame &&
                    isPasswordValid &&
                    form.email &&
                    form.major &&
                    form.name &&
                    form.password &&
                    form.student_id
                  )
                }
                marginTop={1}
                onClick={handleSubmit}
              >
                가입하기
              </MainButton>
            </BoxWrapper>
          </Box>
        </BoxContainer>
        <BackButton onClick={handleBackClick}>로그인으로 돌아가기</BackButton>
        {/* 이메일 중복 확인 모달 */}
        {/* 중복확인 mutation이 성공이라면 */}
        {isEmailAvailable && (
          <PopUpModal
            width={30}
            height={15}
            darkBackground={true}
            title="사용가능한 이메일입니다."
            onConfirm={onEmailAvailConfirm}
            onCancel={onEmailAvailCancel}
            visible={isEmailDuplicateModalOpen}
          >
            이 이메일을 사용하시겠습니까?
          </PopUpModal>
        )}
        {/* 중복확인 mutation이 실패라면 */}
        {!isEmailAvailable && (
          <PopUpModal
            width={30}
            height={15}
            darkBackground={true}
            title="사용 불가능한 이메일입니다."
            onConfirm={onEmailNotAvailConfirm}
            visible={isEmailDuplicateModalOpen}
          >
            다른 이메일을 입력해주세요.
          </PopUpModal>
        )}
      </SignUpWrapper>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 100%;
  min-width: 32rem;
  margin: 2rem 0;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  margin-top: 1rem;
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

const Box = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  border-radius: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.h1`
  margin: 3.4rem 0 1.4rem 0;
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

const EmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PasswordCheckMessage = styled.div`
  width: 100%;
  margin-bottom: 0.6rem;
  color: ${(props) => props.color || "red"};
  font-size: 0.8rem;
`;

const EmailCheckMessage = styled.div`
  width: 100%;
  margin-bottom: 0.6rem;
  color: ${(props) => props.color || "red"};
  font-size: 0.8rem;
`;

const Input = styled.input`
  width: 100%;
  height: 2.4rem;
  margin-bottom: 0.6rem;
  border: 0.5px solid grey;
  border-radius: 0.3rem;
  padding: 0 10px;
`;

const InputEmail = styled.input`
  width: 70%;
  height: 2.4rem;
  margin-bottom: 0.6rem;
  border: 0.5px solid grey;
  border-radius: 0.3rem;
  padding: 0 0.6rem;
`;

const BoxWrapper = styled.div`
  width: 80%;
  position: relative;
  bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
`;

const BackButton = styled.div`
  margin-top: 10px;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

export default SignUp;
