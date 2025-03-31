import React, { useState ,useEffect,useRef} from 'react';
import styled from 'styled-components';
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import eximg from '../asset/image/샌즈.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as Selling } from "../asset/svgs/selling.svg";
import { ReactComponent as Add } from "../asset/svgs/ProfileAdd.svg";
import { ReactComponent as Upload } from "../asset/svgs/Upload.svg";
import { ReactComponent as Album } from "../asset/svgs/Album.svg";
import { ReactComponent as Label } from "../asset/svgs/Label.svg";
import Message from '../component/Message';
import { useParams,useLocation } from "react-router-dom";
import {connectToRoom,sendMessage} from '../hook/useChat'
import {joinRoom} from '../api/chatApi'


function ChattingPage() {
  const { roomId } = useParams();
  const { state } = useLocation(); // navigate로 전달된 state를 받음
  const [roomData, setRoomData] = useState(state?.roomData || null);

  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState(''); // 단일 메시지를 관리하는 상태로 변경
  const [messages, setMessages] = useState([]); // 수신된 메시지를 관리하는 배열
  const [isExpanded, setIsExpanded] = useState(false); // 상태 변수로 MessageDiv 펼쳐짐 여부 관리
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  
  
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomData,messages]); 

  // 버튼 클릭 시 펼침/접힘 토글
  const handleAddClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // 메시지 입력값 변경
  const handleMessageChange = (e) => {
    setMessage(e.target.value); // messages 대신 message 상태 업데이트
  };

  // 엔터 키로 메시지 전송
  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      const timestamp = new Date().toISOString(); // 현재 시간을 ISO 형식으로 저장
  
      const newMessage = {
        user: 'me',
        msg: message,
        createdAt: timestamp, // 클라이언트에서만 사용할 타임스탬프
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]); // UI 업데이트
      sendMessage(stompClient, message); // 서버로는 메시지만 전송
      setMessage(''); // 입력란 초기화
    }
  };
  

  
useEffect(() => {
  if (!roomId) return;
  console.log('Room data:', roomData);

  const fetchAdditionalRooms = async () => {
    try {
      let newRoomData = { ...roomData };

      while (newRoomData.hasNext) {
        console.log('🔄 hasNext가 true이므로 joinRoom 실행:', newRoomData.cursor);

        // 추가 데이터 요청
        const additionalData = await joinRoom(roomId, newRoomData.cursor);

        if (!additionalData || !additionalData.content) {
          console.error('❌ 추가 데이터가 없습니다!');
          break;
        }

        // 기존 roomData에 새로운 데이터 추가
        newRoomData = {
          ...newRoomData,
          content: [...newRoomData.content, ...additionalData.content],
          cursor: additionalData.cursor,
          hasNext: additionalData.hasNext,
        };

        setRoomData(newRoomData);
      }
    } catch (error) {
      console.error('❌ 추가 데이터 가져오기 실패:', error);
    }
  };

  fetchAdditionalRooms();
 
  const initStompClient = async () => {
    try {
      const client = await connectToRoom(roomId);
      setStompClient(client);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
  console.error('Error details:', error.message); // error message를 출력
  setConnectionStatus('disconnected');
    }
  };

  initStompClient();

  return () => {
    if (stompClient) {
      stompClient.deactivate();
      setConnectionStatus('disconnected');
      console.log('WebSocket Disconnected');
    }
  };
}, [roomId]);
  return (
    <CommonBox>
      <PageStyle>
        <Header2 title={"채팅"} icon={<BackIcon />} extra={<MoreVertIcon />} />

        <ProfileBox>
          <ImgBox>
            <ProfileImg src={eximg} alt='' />
          </ImgBox>
          <InformDiv>
            <ItemTitleDiv>
              <ItemTitle> 거래물품 </ItemTitle>
              <Selling />
            </ItemTitleDiv>
            <PriceDiv>{(50000).toLocaleString()}</PriceDiv>
          </InformDiv>
        </ProfileBox>

        <AppMain>
        <Chatting>
          {
            roomData.content.slice().reverse().map((message, index) => (
              <MessageList key={index} user={message.isMine ? 'me' : 'other'}>
                <Message user={message.isMine ? 'me' : 'other'} msg={message.message} time={String(message.createdAt)} />
              </MessageList>
            ))
          }
          {messages.map((message, index) => (
            <MessageList key={index} user={message.user}>
              <Message user={message.user} msg={message.msg} time={message.createdAt} />
            </MessageList>
          ))}
          <div ref={bottomRef} /> 
        </Chatting>

        </AppMain>

        <MessageDiv isExpanded={isExpanded}>
          <MessageContent>
            <Add onClick={handleAddClick} /> {/* Add 버튼 클릭 시 상태 토글 */}
            <MessageInput
              placeholder='메시지를 입력하세요'
              value={message} // message 상태로 바인딩
              onChange={handleMessageChange}
              onKeyDown={handleSendMessage} // 엔터 키로 메시지 전송
            />
            <Upload />
          </MessageContent>

          {/* 펼쳐졌을 때만 보이는 콘텐츠 */}
          {isExpanded && (
            <ExpandedContent>
              <AlbumBox>
                <Album />
                앨범
              </AlbumBox>
              <LabelBox>
                <Label />
                라벨
              </LabelBox>
            </ExpandedContent>
          )}
        </MessageDiv>
      </PageStyle>
    </CommonBox>
  );
}

export default ChattingPage;

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AppMain = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap: 1px;
  margin-bottom: 15px;
 
  
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 32px;
  box-sizing: border-box;
  border-bottom: solid 1px #4A4A4A;
`;

const ImgBox = styled.div`
  background-color: #F4F4F4;
  min-width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InformDiv = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemTitleDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'NeoM', sans-serif;
`;

const ItemTitle = styled.div``;

const PriceDiv = styled.div`
  width: 100%;
  font-family: 'NeoEB', sans-serif;
`;

const MessageDiv = styled.div`
  width: 100%;
  height: ${({ isExpanded }) => (isExpanded ? '50vh' : '52px')}; 
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  transition: height 0.3s ease; 
  z-index: 3;
  overflow: hidden;  
  
`;

const MessageInput = styled.input`
  width: 80%;
  height: 18px;
  border-radius: 8px;
  padding: 8px;
  border: none;
  background-color: #444448;
  font-family: 'NeoM', sans-serif;
  &::placeholder {
    font-family: 'NeoM', sans-serif;
    color: #FFFFFF;
  }
`;

const ExpandedContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 16px;

  color: #fff;
  font-family: 'NeoM', sans-serif;
  display: flex;
  
  gap: 16px;
  box-sizing: border-box;
`

const Chatting = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;

`
const MessageList=styled.div`
    min-height: 40px;
    width: 100%;
    display: flex;
    justify-content: ${({ user }) => (user ==='me' ? 'flex-end' : 'flex-start')}; 
    margin-bottom: 15px;
`

const MessageContent = styled.div`
    width: 100%;
    min-height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    gap: 5px;
    background-color: #2C2C2E;
    padding: 0 16px;

`
const AlbumBox = styled.div`
    width: 67px;
    height: 67px;
    background-color:#444448;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-family: 'NeoM', sans-serif;

`   
const LabelBox = styled.div`
    width: 67px;
    height: 67px;
    background-color:#444448;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-family: 'NeoM', sans-serif;

`
