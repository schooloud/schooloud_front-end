//check and logout
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ExpiredCheck = (props) => {
  const [isLogined, setIsLogined] = useState(null);
  const [cookies, removeCookie] = useCookies(null);
  const navigate = useNavigate();

  const isExpired = (expiredAt) => {
    let now = new Date().getTime();
    console.log("현재 시간은은은" + now);
    //compare now and expiredAt

    console.log("토큰 만료시간은" + expiredAt);
    if (now > expiredAt) {
      console.log("토큰 만료시간이 지났습니다.");
      return true;
    } else {
      console.log("토큰 만료시간이 지나지 않았습니다.");
      return false;
    }
  };

  //토큰 만료시간 체크
  const authCheck = () => {
    const exp = cookies.expiredAt;
    //토큰이 만료됐으면 쿠키 삭제 및 로그아웃
    if (!exp || isExpired(exp)) {
      for (let key in cookies) {
        removeCookie(key); // 쿠키 삭제
      }
      navigate("/"); // 메인 페이지로 이동
    }
    //만료 안됐으면 로그인 상태 유지
    else {
      setIsLogined(cookies.name);
    }
  };

  useEffect(() => {
    authCheck(); // 로그인 체크 함수
  });

  const logOut = () => {
    for (let key in cookies) {
      removeCookie(key); // 쿠키 삭제
    }
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <>
      {/* isLogined에 props를 넣어서 컴포넌트를 띄우면 될 듯 */}
      {isLogined && (
        <UserInfo>
          Welcome, {isLogined}!
          {/* <Button onClick={logOut}>로그아웃</Button> */}
        </UserInfo>
      )}
    </>
  );
};

const UserInfo = styled.div`
  position: fixed;
  right: 1rem;
  top: 1rem;
  height: 4.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  font-size: 1.2rem;
  background-color: var(--extra-light);
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  z-index: 101;

  &:hover {
  }
`;

const Button = styled.button`
  height: 1.2rem;
`;
export default ExpiredCheck;
