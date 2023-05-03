import { createGlobalStyle } from "styled-components";
import PretendardExtraBold from "../assets/fonts//Pretendard-ExtraBold.woff2";
import PretendardBold from "../assets/fonts//Pretendard-Bold.woff2";
import PretendardSemiBold from "../assets/fonts//Pretendard-SemiBold.woff2";
import PretendardRegular from "../assets/fonts/Pretendard-Regular.woff2";
import PretendardLight from "../assets/fonts/Pretendard-Light.woff2";
import PretendardExtraLight from "../assets/fonts/Pretendard-ExtraLight.woff2";
import PretendardThin from "../assets/fonts/Pretendard-Thin.woff2";

export default createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-ExtraBold"), url(${PretendardExtraBold}) format("woff2");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-Bold"), url(${PretendardBold}) format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-SemiBoldd"), url(${PretendardSemiBold}) format("woff2");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-Regular"), url(${PretendardRegular}) format("woff2");
    font-weight: 400;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-Light"), url(${PretendardLight}) format("woff2");
    font-weight: 300;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-ExtraLight"), url(${PretendardExtraLight}) format("woff2");
    font-weight: 200;
  }

  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard-Thin"), url(${PretendardThin}) format("woff2");
    font-weight: 100;
  }

  :root {
    --extra-light: #E9F3E7;
    --light: #DFEEDC;
    --semi-light: #AAD8A1;
    --regular: #8EC083;
    --medium: #76B06A;
    --main: #3CC23F;
    --semi-dark: #509741;
    --dark: #2D791E;
    --extra-dark: #18610A;
  }

  *{
    box-sizing: border-box;
    font-family: 'Pretendard';
    font-weight: '300';
  }
`;

export const basicStyles = {
  maxWidth: 1440 * (window.screen.width / 1440),
  maxHeight: window.screen.height,
  basicFont: 16 * (window.screen.width / 1440),
};
