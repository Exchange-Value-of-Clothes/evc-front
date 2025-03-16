import axios from "axios";
import api from "./intercept";

const API_URL = process.env.REACT_APP_API_URL;

export const registerApi = async (formData) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/useditems`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
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

export const getUsedItem = async (page) => {
    try {
        const res = await axios({
            method: "get",
            url: `${API_URL}/api/useditems`,
            withCredentials: true,
            params:{
                page:page,
            }
        });

        console.log(`${page}페이지 조회성공`, res);
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