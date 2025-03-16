import { createGlobalStyle } from "styled-components";
import NeoB from '../asset/font/NeoB.ttf';
import NeoEB from '../asset/font/NeoEB.ttf';
import NeoH from '../asset/font/NeoH.ttf';
import NeoL from '../asset/font/NeoL.ttf';
import NeoM from '../asset/font/NeoM.ttf';
import NeoR from '../asset/font/NeoR.ttf';
import NeoSB from '../asset/font/NeoSB.ttf';
import NeoT from '../asset/font/NeoT.ttf';
import NeoUL from '../asset/font/NeoUL.ttf';



const GlobalStyle=createGlobalStyle`
   @font-face {
        font-family: 'NeoB';
        src: url(${NeoB}) format('truetype');
        font-weight: normal;
        font-style: normal;
        }
    @font-face {
        font-family: 'NeoEB';
        src: url(${NeoEB}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoH';
        src: url(${NeoH}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoL';
        src: url(${NeoL}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoM';
        src: url(${NeoM}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoR';
        src: url(${NeoR}) format('truetype');
        font-weight: normal;
        font-style: normal;
        }
    @font-face {
        font-family: 'NeoSB';
        src: url(${NeoSB}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoT';
        src: url(${NeoT}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NeoUL';
        src: url(${NeoUL}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    body, p, span, h1, h2, h3, h4, h5, h6, button, a,input,textarea {  
        font-family: 'NeoB',sans-serif;
       
        color:#F4F4F4;
       
    }
   

`;
export default GlobalStyle;