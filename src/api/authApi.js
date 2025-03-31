import axios from "axios";
import userStore from '../store/userStore'

const API_URL = process.env.REACT_APP_API_URL;
const RandomStr = "cmakc2199r21ll1z"

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

    console.log("회원가입 성공:", response.data);
    return response.data; 
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error; 
  }
};

export const logInApi = async (userData)=>{
    axios.defaults.withCredentials=true;
  
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

export const RequestCodeApi = async (userEmail)=>{
  try{
      const res = await axios({
          method:'get',
          url: `${API_URL}/api/members/register/request-code`,
          params:{email:userEmail},
        
      });
      console.log("인증코드 재요청 성공",res);
      return res.data;
  }catch(err){
      console.error("인증코드 재요청 실패",err)
      throw err;
  }
}

export const refreshAccessToken = async ()=>{

  try{
      const res = await axios({
          method:'post',
          url: `${API_URL}/api/auth/refresh`,
          headers:{
            "Content-Type":  "application/json",
         
          },
          withCredentials:true,
       
         
      });
      console.log("토큰재요청성공",res);
      console.log("재요청해서 돌아온 토큰",res.data.accessToken)
      const  accessToken  = res.data.accessToken;
      userStore.getState().setAccessToken(accessToken);
      return res.data;
  }catch(err){
      console.error("토큰재요청실패",err)
      throw err;
  }
}

export const socialLogin = async (social)=>{
   
  try{
      const res = await axios({
          method:'get',
          url: `${API_URL}/api/auth/social`,
          params:{
            provider_type:social,
            state: RandomStr,
          } ,
      });
      console.log("소셜 로그인 요청 성공",res);
      return res.data;
  }catch(err){
      console.error("소셜 로그인 요청 실패",err)
      throw err;
  }
}


