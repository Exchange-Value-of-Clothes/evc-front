import React, { useState ,useEffect,useRef,useCallback} from 'react';
import styled from 'styled-components';
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import defaultImg from '../asset/image/defaultImg.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as Add } from "../asset/svgs/ProfileAdd.svg";
import { ReactComponent as Upload } from "../asset/svgs/Upload.svg";
import { ReactComponent as Album } from "../asset/svgs/Album.svg";
import { ReactComponent as Label } from "../asset/svgs/Label.svg";
import Message from '../component/Message';
import { useParams,useLocation } from "react-router-dom";
import {connectToRoom,sendMessage} from '../hook/useChat'
import {joinRoom} from '../api/chatApi'
import { s3Img,postImg } from '../api/ItemApi';
import ParcelModal from '../component/ParcelModal';

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function ChattingPage() {
  const { roomId } = useParams();
  const { state } = useLocation(); // navigate로 전달된 state를 받음
  const [roomData, setRoomData] = useState(state?.roomData || null);
  const stompClientRef = useRef(null); // stompClient를 useRef로 관리
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState(''); // 단일 메시지를 관리하는 상태로 변경
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // 상태 변수로 MessageDiv 펼쳐짐 여부 관리
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isOpen,setIsOpen]=useState(false);

  const isSellMode = roomData.transactionMode === "SELL";
  const [postData, setPostData] = useState({
  itemType: roomData.itemType,
  itemId: roomData.itemId,
  buyerId: isSellMode ? 
    (roomData.yourId === roomData.ownerId ? roomData.otherPersonId : roomData.yourId)
    :
    (roomData.yourId === roomData.ownerId ? roomData.yourId : roomData.otherPersonId),
    
  sellerId: isSellMode ? 
    (roomData.yourId === roomData.ownerId ? roomData.yourId : roomData.otherPersonId)
    :
    (roomData.yourId === roomData.ownerId ? roomData.otherPersonId : roomData.yourId),
});
  const fileInputRef = React.useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomData,messages]); 

  const setModal=useCallback(()=>{
    setIsOpen((prev)=>!prev);
  },[])

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
      sendMessage(stompClient, roomData.yourId,message,timestamp); // 서버로는 메시지만 전송//id및 타임스탬프필요
      setMessage(''); // 입력란 초기화
    }
  };
  
  const handleAddIconClick = () => {
    fileInputRef.current.click(); // AddIcon 클릭 시 input 열기
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const file = files[0];
    const fileName = file.name;
    const fileType = file.type.split('/')[1];
  
    try {
      // 2. 서버에 이미지 이름 전달
      const presignResponse = await postImg('chat',[fileName]) 
      const [{ presignedURL, imageName }] = presignResponse
      // 4. presignedUrl로 S3에 PUT 업로드
      await s3Img(presignedURL, fileType, file);
  
      // 5. 이미지 클라우드프론트 주소 구성
      const imageUrl = `${IMG_URL}/${imageName}`;
  
      // 5. 메시지 전송
      const imageMessage = {
        type: 'IMAGE',
        content: imageUrl,
      };
      const timestamp = new Date().toISOString();
      sendMessage(stompClient, roomData.yourId,JSON.stringify(imageMessage),timestamp);//id+타임스탬프
  
      // UI에 추가
      
      setMessages((prev) => [
        ...prev,
        {
          user: 'me',
          msg: imageUrl,
          createdAt: timestamp,
          isImage: true, // 이걸로 렌더링 구분
        },
      ]);

    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다.');
    }
  
    // input 초기화
    e.target.value = null;
  };
  
  
useEffect(() => {
  if (!roomId) return;

  const fetchAdditionalRooms = async () => {
    try {
      let newRoomData = { ...roomData };

      while (newRoomData.hasNext) {

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
  let client;

  const initStompClient = async () => {
    try {
      client = await connectToRoom(roomId);
      stompClientRef.current = client;

      setStompClient(client);
      setConnectionStatus('connected');
      const topicPath = `/topic/room.${roomId}`;
      client.subscribe(topicPath, (message) => {
        const text = message.body;
        let payload;
        try {
          // JSON 형태면 객체로 파싱
          payload = JSON.parse(text);
        } catch (e) {
          // 순수 텍스트면 content 프로퍼티로 감싸서 사용
          payload = { content: text };
        }
        if(payload.memberId!== roomData.yourId){
          setMessages(prev => {
            const next = [...prev, payload];
            return next; //현재 콘텐츠 ㅇㅇ 이런식으로와서 user msg createdAt이랑 매칭이안됨
          });

        }
        
      });
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
  console.error('Error details:', error.message); // error message를 출력
  setConnectionStatus('disconnected');
    }
  };

  initStompClient();

  return () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate(); // WebSocket 연결 종료

      setConnectionStatus('disconnected');
    }
  };
}, [roomId]);

useEffect(() => {
  if (roomData?.content) {
    const transformed = roomData.content.map((item) => ({
      user: item.isMine ? 'me' : 'other',
      msg: item.message,
      createdAt: item.createdAt,
    }));

    setMessages((prev) => {
      const alreadyExists = new Set(prev.map((m) => m.createdAt + m.msg));
      const newOnes = transformed.filter(
        (m) => !alreadyExists.has(m.createdAt + m.msg)
      );
      const updatedMessages = [...newOnes.reverse(), ...prev]; // 최신순 정렬 유지

      // 스크롤은 setMessages 이후 실행되도록 타이머로 처리
      if (updatedMessages.length > 0) {
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // DOM 렌더링 완료 후 실행
      }

      return updatedMessages;
    });
  }
}, [roomData]);




  return (
    <CommonBox>
      <PageStyle>
        <Header2 title={"채팅"} icon={<BackIcon />} extra={<MoreVertIcon />} />

        <ProfileBox>
          <ImgBox>
            <ProfileImg src={roomData.otherPersonProfileName?`${IMG_URL}/${roomData.otherPersonProfileName}` : defaultImg} alt='' />
          </ImgBox>
          <InformDiv>
            <ItemTitleDiv>
              <ItemTitle> {roomData.title} </ItemTitle>
            </ItemTitleDiv>
            <PriceDiv>{(roomData.price).toLocaleString()}</PriceDiv>
          </InformDiv>
        </ProfileBox>

        <AppMain>
        <Chatting>
              {messages.map((message, index) => {
        const { msg, isImage } = message;
        let content = msg;
        let shouldRenderImage = isImage;

        if (!isImage) {
          try {
            const parsed = JSON.parse(msg);
            if (parsed?.type === 'IMAGE') {
              content = parsed.content;
              shouldRenderImage = true;
            }
          } catch {
            // 그냥 텍스트로 처리
          }
        }

        return (
          <MessageList key={index} user={message.user}>
            <Message
              profile={roomData.otherPersonProfileName?`${IMG_URL}/${roomData.otherPersonProfileName}` : defaultImg}
              user={message.user}
              msg={
                shouldRenderImage ? (
                  <img
                    src={content}
                    alt="sent"
                    style={{ maxWidth: '100%', borderRadius: '8px'}}
                  />
                ) : (
                  content
                )
              }
              time={message.createdAt}
              
            />
          </MessageList>
          );
        })}

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
                <Album  onClick={handleAddIconClick} />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    />
                앨범
              </AlbumBox>
              <LabelBox  onClick={setModal}>
                <Label />
                택배정보 
              </LabelBox>
            </ExpandedContent>
          )}
        </MessageDiv>
        <ParcelModal  postData={postData}  isOpen={isOpen} close={setModal}
        
        />
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
