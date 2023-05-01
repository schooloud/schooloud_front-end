import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import logoImage from "../assets/Logo.png";
import { Navigate } from "react-router-dom";
import Modal from "../components/Modal";
import MainButton from "../components/MainButton";

/*--extra-light: #E9F3E7;
    --light: #DFEEDC;
    --semi-light: #AAD8A1;
    --regular: #8EC083;
    --medium: #76B06A;
    --semi-dark: #509741;
    --dark: #2D791E;
    --extra-dark: #18610A;
    */

const SignUp = () => {
  //이메일 유효성 검사
  const [isEmailValid, setIsEmailValid] = useState(false);
  //이메일 중복 검사
  const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
  //비밀번호 일치 검사
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const [form, setForm] = useState({
    email: "",
    studentId: "",
    name: "",
    password: "",
    major: "",
    role: "STUDENT",
  });

  const onChangeEmail = useCallback(
    (e) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      const { name } = e.target;
      setForm({
        ...form,
        [name]: emailCurrent,
      });

      if (!emailRegex.test(emailCurrent)) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }
    },
    [form]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );
  const handleSubmit = useCallback((e) => {
    // e.preventDefault();
    // axios
    //   .post("/users/signup", {
    //     email: form.email,
    //     studentId: form.studentId,
    //     name: form.name,
    //     password: form.password,
    //     major: form.major,
    //     role: form.role,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    Navigate("/login");
  }, []);

  const handleDuplicateCheck = useCallback(() => {
    // axios
    //   .post("/users/duplicateCheck", {
    //     email: form.email,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    setIsEmailDuplicateChecked(true);
  }, []);

  const handlePasswordCheck = (e) => {
    const { value } = e.target;
    if (form.password === value) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  const formRef = useRef();

  return (
    <SignUpWrapper>
      <Container>
        <Logo>
          <LogoImage src={logoImage} alt="" />
        </Logo>
        <Box>
          <Title>회원가입</Title>
          <Form ref={formRef}>
            <Label>이메일</Label>
            <EmailDiv>
              <InputEmail
                type="text"
                name="email"
                onChange={onChangeEmail}
                required
              />
              <MainButton color="main" onClick={handleDuplicateCheck}>
                중복확인
              </MainButton>
            </EmailDiv>
            {isEmailValid ? (
              <EmailCheckMessage color="#2D791E">
                이메일 형식이 맞습니다.
              </EmailCheckMessage>
            ) : (
              <EmailCheckMessage>
                올바른 이메일 형식이 아닙니다.
              </EmailCheckMessage>
            )}
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
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
              name="studentId"
              onChange={handleChange}
              required
            />
            <Label>이름</Label>
            <Input type="text" name="name" onChange={handleChange} required />
            <Label>전공</Label>
            <Input type="text" name="major" onChange={handleChange} required />
          </Form>
          <SubmmitButton
            disabled={
              !(
                isEmailValid &&
                isEmailDuplicateChecked &&
                isPasswordSame &&
                form.email &&
                form.major &&
                form.name &&
                form.password &&
                form.studentId
              )
            }
            onClick={handleSubmit}
          >
            가입하기
          </SubmmitButton>
        </Box>
      </Container>
      <Modal></Modal>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 100vw;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 30rem;
`;
const EmailCheckWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
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
  height: 70%;
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

const EmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const PasswordCheckMessage = styled.div`
  width: 80%;
  margin-bottom: 10px;
  color: ${(props) => props.color || "red"};
  font-size: 0.8rem;
`;

const EmailCheckMessage = styled.div`
  width: 80%;
  margin-bottom: 10px;
  color: ${(props) => props.color || "red"};
  font-size: 0.8rem;
`;

const DuplicateCheckButton = styled.button`
  width: 20%;
  height: 40px;
  margin-bottom: 10px;
  border: none;
  color: white;
  font-size: normal;
  border-radius: 4px;
  background-color: var(--dark);
  border: 1px solid var(--extra-dark);
  cursor: pointer;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 10px;
`;

const InputEmail = styled.input`
  width: 70%;
  height: 40px;
  margin-bottom: 10px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 0 10px;
`;

const SubmmitButton = styled.button`
  width: 80%;
  height: 40px;
  margin-top: 10px;
  border: none;
  color: white;
  font-size: large;
  border-radius: 4px;
  background-color: var(--main);
  border: 1px solid var(--dark);
  cursor: pointer;
  letter-spacing: 1px;
`;
const Label = styled.div`
  text-align: left;
  width: 80%;
  margin-bottom: 5px;
  font-size: 0.8rem;
`;

export default SignUp;
