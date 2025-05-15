import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { payConfirmApi } from '../api/payApi';

const PaySuccess = () => {
  const location = useLocation();  // URL 쿼리 파라미터를 가져옴
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);  // URL 파라미터 추출

    const orderId = queryParams.get('originId');
    const paymentKey = queryParams.get('paymentKey');
    const amount = queryParams.get('amount');

    // payConfirmApi 호출
    const confirmPayment = async () => {
      try {
        if (orderId && paymentKey && amount) {
          await payConfirmApi(orderId, paymentKey, amount);  // API 호출

          // 성공 시, 마이 페이지로 이동
          navigate('/mypage');
        } else {
          console.error('필요한 파라미터가 부족합니다.');
        }
      } catch (error) {
        console.error('결제 확인 중 오류 발생:', error);
      }
    };

    confirmPayment();  // API 호출 실행

  }, [location, navigate]);

  return (
    <div>
      <h1>결제 성공 처리 중...</h1>
    </div>
  );
};

export default PaySuccess;
