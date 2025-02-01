import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerApi = async (userData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/api/members/register`,
      headers: { 
        "Content-Type": "application/json",
      },
      data: userData, 
    });

    console.log("회원가입 성공:", response);
    return response.data; 
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error; 
  }
};

export const logInApi = async (userData)=>{
    try{
        const res = await axios({
            method:'post',
            url: `${API_URL}/api/auth`,
            headers:{
                "Content-Type": "application/json",
            },
            data:userData,
        });
        console.log("로그인",res);
        return res.data;
    }catch(err){
        console.error("로그인 실패",err)
        throw err;
    }
}
