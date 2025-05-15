import React, { useEffect } from 'react';
import { refreshAccessToken } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

function Social() {
  const navigate = useNavigate();
  const { setAccessToken } = userStore();

  useEffect(() => {
    const fetchAccessToken = async () => {

      if (window.location.pathname === "/social-login-success") {

        try {
          const data = await refreshAccessToken();

          localStorage.setItem('LoginState', true);
          const { accessToken } = data;
          
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
