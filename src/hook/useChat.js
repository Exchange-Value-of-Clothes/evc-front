import { Client } from '@stomp/stompjs';
import userStore from '../store/userStore';
import {refreshAccessToken} from '../api/authApi'

const WS_URL =process.env.REACT_APP_WS_URL;

let stompClient;
export const connectToRoom = async (roomId,type) => {
  let accessToken = userStore.getState().accessToken;

  if (!accessToken) {
    console.error('Access token is missing!');
    accessToken = await refreshAccessToken(); // 토큰 갱신 기다리기
    if (!accessToken) {
      console.error('Access token is still missing after refresh!');
      return; // 갱신이 안 됐으면 종료
    }
  }
  let headerKey = "Chat-Room-Id";


  if (type === "auction") {
    headerKey = "Auction-Room-Id";
   
  } 
  const stompClient = new Client({
    brokerURL: WS_URL, 
    connectHeaders: {
      "Authorization": `Bearer ${accessToken}`, 
      [headerKey]: roomId, 
    },
   
    onStompError: (frame) => {
      console.error("STOMP Error:", frame);
      console.error("Error details:", frame.body);
    },
    onWebSocketError: (error) => {
      console.error("WebSocket Error:", error);
      console.error("Error details:", error.message);
    },
  });

  return new Promise((resolve, reject) => {
    stompClient.onConnect = () => {
     
      resolve(stompClient);
    };
    stompClient.onStompError = (frame) => {
      reject(frame);
    };
   
    stompClient.activate(); // 연결 시작
  });
};

export const disconnect = () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate(); // This will close the WebSocket connection and clean up resources
  } else {
    console.log('STOMP Client is not active or already disconnected.');
  }
};


export const sendMessage = async (stompClient,id, message,created) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/pub/chat.message`, 
      body: JSON.stringify({
        memberId:id,
        msg: message, 
        createdAt:created
      }),
    });
  } else {
    console.error("STOMP Client is not connected.");
  }
};

export const sendPrice = async (stompClient,id, price) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/pub/auction.message`, 
      body: JSON.stringify({
        auctionId:id,
        point: price, 
      }),
    });
  } else {
    console.error("STOMP Client is not connected.");
  }
};


