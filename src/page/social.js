import React, { useEffect } from 'react';
import { refreshAccessToken } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

function Social() {
  const navigate = useNavigate();
  const { setAccessToken } = userStore();

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("소셜성공");

      if (window.location.pathname === "/social-login-success") {
        console.log("찾았다");

        try {
          const data = await refreshAccessToken();
          console.log(data);

          localStorage.setItem('LoginState', true);
          const { accessToken } = data;
          console.log(accessToken);
          
          setAccessToken(accessToken);
          navigate('/home',accessToken);
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
        }
      }
    };

    fetchAccessToken();
  }, [navigate, setAccessToken]);

  return <div>social</div>;
}

export default Social;
