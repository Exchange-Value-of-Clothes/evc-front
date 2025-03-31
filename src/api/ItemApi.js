import axios from "axios";
import api from "./intercept";

const API_URL = process.env.REACT_APP_API_URL;


export const registerApi = async (datas) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/useditems`,
           
            data: datas,
            withCredentials: true,
        });

        console.log("등록성공", res);
        return res.data;
    } catch (err) {
        if (err.response) {
            console.error("등록실패 - 응답 에러", err.response);
        } else if (err.request) {
            console.error("등록실패 - 요청 에러", err.request);
        } else {
            console.error("등록실패 - 설정 에러", err.message);
        }
        throw err;  // 에러를 다시 던져서 호출한 곳에서 처리하도록
    }
};

export const getUsedItem = async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `${API_URL}/api/useditems`,
            withCredentials: true,
            params:{
                cursor:cursors,
            }
        });

        console.log(`$페이지 조회성공`, res);
        return res.data;
    } catch (err) {
        console.error("조회실패", err);
        throw err;
    }
};

export const getSpecUsedItem = async (itemId) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/useditems/${itemId}`,
            withCredentials: true,
           
        });

        console.log(`아이템 조회성공`, res);
        return res.data;
    } catch (err) {
        console.error("조회실패", err);
        throw err;
    }
};

export const postImg = async (imgPath, imgs) => {
    try {
        

        const res = await api({
            method: "post",
            url: `/api/images`,
            withCredentials: true,
         
        
            data:{
                prefix: imgPath,
                imageNames:imgs,
            },
        });

        console.log(`이미지 이름 전송 완료`, res);
        return res.data;
    } catch (err) {
        console.log("보낸거",imgs)
        console.error("이미지 이름 전송 실패", err);
        throw err;
    }
};

export const s3Img = async (signedUrl,type,file)=>{
    try {
        const res = await axios({
            method: "put",
            url: signedUrl,
            withCredentials: true,
            headers: {
                'Content-Type': type, 
                Authorization: undefined,
              },
            data:file,
        });

        console.log(`이미지 S3 전송 완료`, res);
        return res.data;
    } catch (err) {
        console.log("url",signedUrl,"타입",type,"파일",file)
        console.error('S3 Upload Error:', err.response?.data || err.message);

        throw err;
    }
};
