//check and logout
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ExpiredCheck = (props) => {
  const [isLogined, setisLogined] = useState(null);
  const [cookies, removeCookie] = useCookies(null);
  const navigate = useNavigate();

  const isExpired = (expiredAt) => {
    let now = new Date();
    console.log("현재 시간은" + now);
    let expiredAtDate = new Date(expiredAt);
    console.log("토큰 만료시간은" + expiredAtDate);
    if (now > expiredAtDate) {
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
      setisLogined(cookies.name);
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
      {isLogined && <h1>{isLogined}님 환영합니다!</h1>}
      <button onClick={logOut}>로그아웃</button>
    </>
  );
};
export default ExpiredCheck;
