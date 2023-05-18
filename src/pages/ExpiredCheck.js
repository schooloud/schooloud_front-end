//check and logout
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import i from "rechart/lib/chart";
import styled, { css, keyframes } from "styled-components";

const ExpiredCheck = (props) => {
  const [isLogined, setIsLogined] = useState(null);
  const [cookies, removeCookie] = useCookies({});
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const isExpired = (expiredAt) => {
    let now = new Date().getTime();
    console.log("현재 시간은" + now);
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
        console.log("시간 만료돼서 삭제됨");
        removeCookie(key); // 쿠키 삭제
      }
      navigate("/"); // 1 페이지로 이동
    }
    //만료 안됐으면 로그인 상태 유지
    else {
      console.log("만료 안됐다. 이게 문제?");
      setIsLogined(cookies.name.slice(-2));
    }
  };

  useEffect(() => {
    authCheck(); // 로그인 체크 함수
  }, []);

  const handleLogOut = () => {
    for (let key in cookies) {
      removeCookie(key); // 쿠키 삭제
    }
    navigate("/"); // 메인 페이지로 이동
  };

  //유저박스에 마우스 올리면 로그아웃 버튼 보여주기
  const handleMouseOver = () => {
    setIsHover(true);
  };

  //유저박스에서 마우스 떼면 로그아웃 버튼 숨기기
  const handleMouseLeave = () => {
    setTimeout(() => setIsHover(false), 500);
  };

  return (
    <>
      {isLogined && (
        <UserBox
          className={isHover ? "hovered" : "unhovered"}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <NameCircle>{isLogined}</NameCircle>
          <Logout
            onClick={handleLogOut}
            className={isHover ? "hovered" : "unhovered"}
          >
            로그아웃
          </Logout>
        </UserBox>
      )}
    </>
  );
};

const UserBox = styled.div`
  //포지션
  position: fixed;
  top: 0.25rem;
  right: 1rem;

  //style
  width: 3rem;
  height: 3rem;
  /* border: 1px solid black; */
  border-radius: 3rem;

  z-index: 200;

  //내용물
  display: flex;
  align-items: center;

  cursor: pointer;
  font-size: 0.8rem;
  letter-spacing: 0.125rem;

  color: white;
  background-color: var(--main);

  transition: all 0.5s ease-in-out;

  &.hovered {
    width: 7rem;
  }
  &.unhovered {
    width: 3rem;
    transition-delay: 1s;
  }
`;

const NameCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logout = styled.div`
  position: fixed;
  top: 0.25rem;
  right: 0.6rem;
  width: 5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  color: white;

  @keyframes hovered {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes unhovered {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.hovered {
    display: flex;
    justify-content: center;
    animation: hovered 1s ease-in-out forwards;
    animation-delay: 0.5s;
  }
  &.unhovered {
    animation-play-state: paused;
    animation: unhovered 1s ease-in-out forwards;
  }
`;

export default ExpiredCheck;
