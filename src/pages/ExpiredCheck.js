//check and logout
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiUser } from "react-icons/ci";

const ExpiredCheck = (props) => {
  const [isLogined, setIsLogined] = useState(null);
  const [cookies, removeCookie] = useCookies(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

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

  const handleOver = () => {
    //클릭하면 아래에 로그아웃 버튼이 생성되고, 로그아웃 버튼을 누르면 로그아웃
    if (isLogined) {
      setShowLogoutButton(true);
    }
  };

  const handleLeave = () => {
    setShowLogoutButton(false);
  };

  return (
    <>
      {isLogined && (
        <UserIcon onMouseOver={handleOver} onMouseLeave={handleLeave}>
          <CiUser size="30" />
          <UserName>{isLogined}</UserName>
        </UserIcon>
      )}
      {showLogoutButton && (
        <LogOutButton
          onClick={logOut}
          onMouseOver={(e) => setShowLogoutButton(true)}
          onMouseLeave={(e) => setShowLogoutButton(false)}
        >
          로그아웃
        </LogOutButton>
      )}
    </>
  );
};

const UserIcon = styled.div`
  position: fixed;
  top: 1rem;
  right: 2.7rem;

  z-index: 200;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 100;
`;

const LogOutButton = styled.button`
  //same width with UserIcon
  width: 4.8rem;

  box-shadow: 1px 2px rgba(0, 0, 0, 0.12);
  border: none;
  position: fixed;
  top: 2.9rem;
  right: 2.7rem;
  z-index: 201;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;
  //글자 중간정렬
  justify-content: center;

  background-color: white;
`;

export default ExpiredCheck;
