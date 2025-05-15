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
        } catch (error) {
          console.error('엑세스 토큰 갱신 실패:', error.message);
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
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