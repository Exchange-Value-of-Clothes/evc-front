import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { payApi } from '../api/payApi';
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;

const PaymentPage = () => {
  const location = useLocation();
  const point = location.state?.point || 0;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true;

    const makePayment = async () => {
      try {
        // API 호출로 결제 정보 처리
        const res = await payApi(point);

        script.onload = () => {
          if (window.TossPayments) {
            const tossPayments = window.TossPayments(CLIENT_KEY);

            tossPayments
              .requestPayment("가상계좌", {
                amount: res.price,
                orderId: res.orderId,
                orderName: "테스트 결제",
                customerName: "김토스",
                successUrl: `${window.location.origin}/paySuccess?originId=${res.orderId}`,
                failUrl: `https://docs.tosspayments.com/guides/payment/test-fail`,
              })
              .catch((error) => {
                if (error.code === "USER_CANCEL") {
                  alert("결제가 취소되었습니다.");
                } else {
                  alert(`에러 발생: ${error.message}`);
                }
              });
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("결제 API 호출 중 오류 발생:", error);
      }
    };

    makePayment();

    return () => {
      document.body.removeChild(script); // script 제거
    };
  }, [point]);

  return (
    <div>
      <h1>결제 페이지 로딩 중...</h1>
    </div>
  );
};

export default PaymentPage;
