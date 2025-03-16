import axios from 'axios';
import userStore from '../store/userStore';
import {refreshAccessToken} from './authApi'

const API_URL = process.env.REACT_APP_API_URL;

const api=axios.create({
    baseURL:API_URL,
});

api.interceptors.request.use(
    async (config) => {
      let accessToken = userStore.getState().accessToken?.accessToken;
  
      if (!accessToken) {
        
        try {
          accessToken = await refreshAccessToken(); 
          config.headers['Authorization'] = `Bearer ${accessToken?.accessToken}`; 
          console.log('새 엑세스 토큰을 헤더에 추가:', config.headers['Authorization']);
        } catch (error) {
          console.error('엑세스 토큰 갱신 실패:', error.message);
          // 실패 시 로그인 화면으로 리디렉션하거나 다른 처리를 할 수 있음
          return Promise.reject(error);
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log('헤더에 엑세스 토큰이 설정되었습니다:', config.headers['Authorization']);
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originReq=error.config;
        if (error.response && error.response.status === 401  && !originReq._retry) {
            originReq._retry = true;

            try{
                const newAccessToken = await refreshAccessToken();
                userStore.getState().setAccessToken(newAccessToken);

                
                originReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
                console.log("엑세스 토큰 갱신 후 재요청:", originReq);

                return axios(originReq);
            }catch(refreshErr){
                console.error("리프레시 토큰 갱신 실패:", refreshErr);

                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
        
);
export default api;