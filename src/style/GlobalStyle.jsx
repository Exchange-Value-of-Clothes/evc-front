import { createGlobalStyle } from "styled-components";
import Font1 from '../asset/font/font1.ttf';


const GlobalStyle=createGlobalStyle`
   @font-face {
        font-family: 'font';
        src: url(${Font1}) format('truetype');
        font-weight: normal;
        font-style: normal;
        }

    *{  
        font-family: 'font',sans-serif;
       
        color:#F4F4F4;
    }

`;
export default GlobalStyle;