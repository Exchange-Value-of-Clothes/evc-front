import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommonBox from '../style/CommonBox';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import BackIcon from '../component/icons/BackIcon';
import ChatCard from '../component/ChatCard';
import Filter from '../component/Filter';
import { useLocation,useNavigate } from 'react-router-dom';
import usePageFilterStore from '../store/filterStore';
import { useSwipeable } from 'react-swipeable';
import {getRooms,joinRoom,exitRoom} from '../api/chatApi'


function ChatPage() {
  const location = useLocation();
  const { filters, setFilter } = usePageFilterStore();
  const currentPage = location.pathname;
  const selectedFilter = filters[currentPage];

  const [rooms, setRooms] = useState([]);
  const [cursor, setCursor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
    
  const handleCardClick = async (roomId) => {
    try {
      // 방에 입장
      const roomData = await joinRoom(roomId); // joinRoom API 호출

    // 방에 입장 후, 상태와 함께 방으로 이동
      navigate(`/chat/rooms/${roomId}`, { state: { roomData } });
    } catch (err) {
      console.error("❌ 방 입장 실패:", err);
      setError("Failed to join the room");
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    console.log("📌 cursor 업데이트됨:", cursor);
  }, [cursor]);
  

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      console.log("📢 응답 객체:", response);

      if (!response || !response.content) {
        console.error("❌ response.content가 존재하지 않음!");
        return;
      }

      // `isSwiped: false` 추가하여 상태 저장
      const roomsWithSwipeState = response.content.map(room => ({
        ...room,
        isSwiped: false
      }));

      setRooms(roomsWithSwipeState);
      setCursor(response.cursor);
      console.log("📌 setCursor 호출됨, 새로운 값:", response.cursor);

      console.log("✅ rooms 상태 업데이트:", roomsWithSwipeState);
    } catch (err) {
      console.error("❌ 방 목록 조회 실패:", err);
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeLeft = (id) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.chatRoomId === id ? { ...room, isSwiped: true } : { ...room, isSwiped: false }
      )
    );
  };

  const handleSwipeRight = (id) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.chatRoomId === id ? { ...room, isSwiped: false } : room
      )
    );
  };

  const handleDelete = (id) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.chatRoomId !== id));
    exitRoom(id);
  };

  return (
    <CommonBox>
      <PageStyle>
        <Header2 title={'채팅'} icon={<BackIcon />} />
        
        <Filter
          filterShape={'ham'}
          addAuc={true}
          selectedFilter={selectedFilter}
          setSelectedFilter={(val) => {
            if (selectedFilter !== val) setFilter(currentPage, val);
          }}
        />

        <AppMain>
          {rooms.map((room) => (
            <SwipeableChatCard
              key={room.chatRoomId}
              id={room.chatRoomId}
              isSwiped={room.isSwiped}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onDelete={handleDelete}
            >
              <ChatCard 
                roomid={room.chatRoomId}
                cursor={room.createdAt}
                lastChat={room.lastMessage}
                onClick={() => handleCardClick(room.chatRoomId)}
              />
            </SwipeableChatCard>
          ))}
        </AppMain>
        <Footer />
      </PageStyle>
    </CommonBox>
  );
}

export default ChatPage;


// 🔥 스와이프 가능한 카드 컴포넌트
const SwipeableChatCard = ({ id, isSwiped, onSwipeLeft, onSwipeRight, onDelete, children }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(id), // 왼쪽으로 스와이프하면 삭제 버튼 보이기
    onSwipedRight: () => onSwipeRight(id), // 오른쪽으로 스와이프하면 원래 상태로 복귀
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <CardWrapper>
      <UtilButtons isSwiped={isSwiped}>
        <ReadCheckButton onClick={() => onDelete(id)}>
          읽음표시
        </ReadCheckButton>
        <DeleteButton onClick={() => onDelete(id)}>
          삭제하기
        </DeleteButton>

      </UtilButtons>
     
      <CardContainer {...handlers} isSwiped={isSwiped}>
        {children}
      </CardContainer>
    </CardWrapper>
  );
};

// 🔥 스타일링 추가
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
  margin-top: 18px;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const CardContainer = styled.div`
  width: 100%;
  transition: transform 0.3s ease;
  transform: ${({ isSwiped }) => (isSwiped ? 'translateX(-40%)' : 'translateX(0)')};
`;

const UtilButtons = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  width: 40%; /* 두 버튼이 나란히 보이도록 할 수 있는 너비 */
  height: 100%;
  transition: opacity 0.3s ease;
  opacity: ${({ isSwiped }) => (isSwiped ? '1' : '0')}; /* 스와이프 시 버튼들 보이기 */
`;

const DeleteButton = styled.button`
  height: 100%;
  width: 50%; 
  background-color: #E43530;
  color: white;
  border: none;
  padding: 16px 0;
  cursor: pointer;
  font-family: 'NeoM',sans-serif;

`;

const ReadCheckButton = styled.button`
  height: 100%;
  width: 50%; 
  background-color: #444448;
  color: white;
  border: none;
  padding: 16px 0;
  cursor: pointer;
  font-family: 'NeoM',sans-serif;

`;