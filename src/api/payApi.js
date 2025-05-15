import api from "./intercept";

const API_URL = process.env.REACT_APP_API_URL;

export const payApi = async (point) => {
    try {
      const response = await api({
        method: "post",
        url: `${API_URL}/api/point`,
        headers: { 
          "Content-Type": "application/json",
          
        },
        data:{
            "price" : point
        } 
      });
  
      return response.data; 
    } catch (error) {
      console.error("결제생성 실패:", error);
      throw error; 
    }
  };

  export const payConfirmApi = async (id,key,price) => {
    try {
      const response = await api({
        method: "post",
        url: `${API_URL}/api/point/confirm`,
        headers: { 
          "Content-Type": "application/json",
          
        },
        data:{
            "orderId" : id,
            "paymentKey" : key,
            "amount" : price,
          } 
      });
  
      return response.data; 
    } catch (error) {
      console.error("결제승인 실패:", error);
      throw error; 
    }
  };