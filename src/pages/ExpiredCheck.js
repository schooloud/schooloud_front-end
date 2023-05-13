//check and logout
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import i from "rechart/lib/chart";
import styled, { css, keyframes } from "styled-components";

const ExpiredCheck = (props) => {
  const [isLogined, setIsLogined] = useState(null);
  const [cookies, removeCookie] = useCookies(null);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const isExpired = (expiredAt) => {
    let now = new Date().getTime();
    console.log("현재 시간은은은" + now);
    //compare now and expiredAt

    if (now > expiredAt) {
      return true;
    } else {
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
      setIsLogined(cookies.name.slice(-2));
    }
  };

  useEffect(() => {
    authCheck(); // 로그인 체크 함수
  }, []);

  const logOut = () => {
    for (let key in cookies) {
      removeCookie(key); // 쿠키 삭제
    }
    navigate("/"); // 메인 페이지로 이동
  };

  const changeNameLogout = () => {
    setTimeout(() => {
      setIsLogined(isLogined + " 로그아웃");
    }, 1000);
  };

  //유저박스에 마우스 올리면 로그아웃 버튼 보여주기
  const handleMouseOver = () => {
    console.log("마우스 올라옴");
    // setReadyForLogout(false);
    changeNameLogout();
    setIsHover(true);
  };

  //유저박스에서 마우스 떼면 로그아웃 버튼 숨기기
  const handleMouseLeave = () => {
    console.log("마우스 떼짐");
    // setReadyForLogout(true);
    // setIsLogined(cookies.name.slice(-2));
    setIsHover(false);
    setIsLogined(isLogined.slice(0, -4));
  };

  console.log("로그인상태:" + isLogined);

  return (
    <>
      {isLogined && (
        <UserBox
          className={isHover ? "hovered" : ""}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {/* {isHover ? (
            <Div className="logout">{isLogined} 로그아웃</Div>
          ) : (
            <Div className="">석희</Div>
          )} */}
          {isLogined}
        </UserBox>
      )}
    </>
  );
};

const fadeIn = keyframes`
  from {
    display: none;
  }
  to {
    opacity: block;
  }
`;

const UserBox = styled.div`
  //포지션
  position: fixed;
  top: 0.25rem;
  right: 1rem;

  //style
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 50%;

  z-index: 200;

  //내용물
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 2px;

  background-color: white;

  transition: all 0.3s ease-in-out;

  &:hover {
    width: 8rem;
    border-radius: 50px;
  }
`;

const Div = styled.div`
  transition: all 2s ease-in-out;
  width: 100%;
  display: flex;
  justify-content: center;

  //에니메이션
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
  animation-name: none;
  animation-fill-mode: forwards;

  &.logout {
    animation-name: ${fadeIn};
  }
`;

export default ExpiredCheck;

/* ${(props) =>
    props.diappear &&
    css`
      animation-name: ${fadeIn};
    `} */
