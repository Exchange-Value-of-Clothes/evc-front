import { Client } from '@stomp/stompjs';
import userStore from '../store/userStore';
import {refreshAccessToken} from '../api/authApi'

const WS_URL =process.env.REACT_APP_WS_URL;

let socket;
export const connectToRoom = async (roomId) => {
  let accessToken = userStore.getState().accessToken;
  console.log("채팅토큰있나요?",accessToken)

  if (!accessToken) {
    console.error('Access token is missing!');
    accessToken = await refreshAccessToken(); // 토큰 갱신 기다리기
    console.log("돌아온토큰",accessToken)
    if (!accessToken) {
      console.error('Access token is still missing after refresh!');
      return; // 갱신이 안 됐으면 종료
    }
    console.log('Access token:', accessToken); 
  }

  const stompClient = new Client({
    brokerURL: WS_URL, // 서버 WebSocket URL
    connectHeaders: {
      "Authorization": `Bearer ${accessToken}`, // 인증 헤더
      "Chat-Room-Id": roomId, // 채팅방 ID
    },
    onConnect: () => {
      console.log("Connected to WebSocket");
      // 방 구독
      stompClient.subscribe(`/topic/room.${roomId}`, (message) => {
        console.log("Received message:", JSON.parse(message.body));
      });
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
    console.log('Connecting to WebSocket at:', WS_URL);
    console.log('Using access token:', accessToken);
    stompClient.activate(); // 연결 시작
  });
};



export const sendMessage = async (stompClient, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/pub/chat.message`, // 서버의 메시지 수신 경로
      body: JSON.stringify({
        content: message, // 보낼 메시지
      }),
    });
    console.log('보낸 메시지:', message); // 콘솔에 보낸 메시지 출력
  } else {
    console.error("STOMP Client is not connected.");
  }
};


/*const client =new Client({
    webSocketFactory: () => {
        // WebSocket 엔드포인트 설정
        socket = new WebSocket(WS_URL); // WebSocket URL로 변경
        return socket;
      },
    reconnectDelay:5000,
    heartbeatIncoming:4000,
    heartbeatOutgoing:4000,
});


client.onConnect=(frame)=>{
    console.log("연결됨:",frame);

    const subscription =client.subscribe('/pub/chat.message',(msg)=>{
        console.log('Received message:', msg.body);
    });
    
    sendMessage('Hello, this is a message!');
};

function sendMessage(message) {
    if (accessToken) {
      client.publish({
        destination: '/pub/chat.message', 
        headers: { Authorization: `Bearer ${accessToken}` }, 
        body: message, // 보내고자 하는 메시지 본문
      });
    } else {
      console.log('Access token is missing!');
    }
  }

client.onStompError=(frame)=>{
    console.error('Broker reported error:', frame.headers['message']);
    console.error('Additional details:', frame.body);

    restartWebSocket();
};

client.activate();

function disconnect(){
    client.deactivate();
}

function restartWebSocket(){
  console.log('Attempting to restart WebSocket...');
  socket = new WebSocket(WS_URL); // WebSocket URL로 변경
  client.webSocketFactory = () => socket;

}

*/