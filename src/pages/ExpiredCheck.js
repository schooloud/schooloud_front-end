//check and logout
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import removeCookies from "../utils/removeCookies";
import { useMutation } from "react-query";
import { usePostApi } from "../utils/http";

/*
로그인을 하면 쿠키 값을 저장하고
useEffect로 쿠키 값이 있는지 확인
쿠키 시간이 만료되거나 로그아웃을 하면 쿠키 삭제
*/

const ExpiredCheck = (props) => {
  const [isLogined, setIsLogined] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [first, setFirst] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();

  //쿠키를 지우고 메인 페이지로 이동
  async function removeAndNavigate() {
    await removeCookies();
    navigate("/");
  }

  //토큰 만료시간 체크
  const isExpired = (expiredAt) => {
    //현재 시간
    let now = new Date().getTime();
    //토큰 만료 시간
    expiredAt = new Date(expiredAt).getTime();

    console.log("현재 시간은 : " + now);
    console.log("토큰 만료 시간은 : " + expiredAt);

    if (now > expiredAt) {
      return true;
    } else {
      return false;
    }
  };

  //쿠키에 name이 있으면 로그인 상태로 변경
  useEffect(() => {
    if (!!cookies.get("name")) {
      setIsLogined(cookies.get("name").slice(-2));
    }
  }, []);

  // 쿠키에 토큰이 있으면 토큰 만료시간 체크
  const authCheck = () => {
    const exp = cookies.get("expired_at");
    const sessionKey = cookies.get("session_key");
    //토큰이 없거나 만료됐으면 쿠키 삭제 및 로그아웃
    if (!sessionKey || isExpired(exp)) {
      console.log("토큰이 만료됐습니다.");
      removeAndNavigate();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      authCheck();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  authCheck();

  //logout hook
  const logoutMutation = useMutation({
    mutationFn: () => usePostApi("user/logout"),
    onSuccess: () => {
      removeAndNavigate();
    },
  });

  //로그아웃 버튼 클릭 시
  const handleLogOut = () => {
    logoutMutation.mutate();
  };

  //유저박스에 마우스 올리면 로그아웃 버튼 보여주기
  const handleMouseOver = () => {
    setIsHover(true);
  };

  //유저박스에서 마우스 떼면 로그아웃 버튼 숨기기
  const handleMouseLeave = () => {
    if (first) {
      setFirst(false);
    }
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
            className={isHover ? "hovered" : !first && "unhovered"}
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
  top: 0.26rem;
  right: 1rem;

  //style
  width: 3rem;
  height: 3rem;
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
    animation: unhovered 1s ease-in-out forwards;
  }
`;

export default ExpiredCheck;
