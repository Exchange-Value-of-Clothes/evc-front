import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import CommonBox from "../style/CommonBox";
import defaultImg from '../asset/image/defaultImg.png';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from "../asset/svgs/Back.svg";
import { getOrderList } from '../api/ItemApi';

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function ParcelFind() {
  const [cursor, setCursor] = useState(null);  // 초기값 null로 변경
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);  // 더 불러올게 없으면 true

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const fetchList = useCallback(async () => {
    if (loading || isLast) return;  // 중복 호출 방지 및 마지막 페이지 체크
    setLoading(true);

    try {
      const response = await getOrderList(cursor);
      if (!response) {
        console.error("response가 존재하지 않음!");
        setIsLast(true);
        return;
      }

      const newOrders = response.content || [];
      setOrders(prev => [...prev, ...newOrders]);  // 기존 데이터에 추가

      // cursor가 없거나 hasNext가 false면 마지막 페이지 처리
      if (!response.cursor || !response.hasNext || newOrders.length === 0) {
        setIsLast(true);
      } else {
        setCursor(response.cursor);
      }
    } catch (err) {
      console.error("❌ 방 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, isLast]);

  // 최초 마운트 시 데이터 한번 불러오기
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const onScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement || document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        // 스크롤이 바닥에서 100px 이내면 데이터 추가 요청
        fetchList();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchList]);

  return (
    <CommonBox>
      <PageStyle>
        <HeaderBox>
          <HeaderContent>
            <HeaderIcons>
              <HeaderLeft onClick={handleBack}><BackArrow /></HeaderLeft>
            </HeaderIcons>
            <HeaderTitle>택배조회</HeaderTitle>
          </HeaderContent>
        </HeaderBox>
        <AppMain>
          <ContentBox>
            {orders.map(order => (
              <Items
                key={order.orderId}
                onClick={() => navigate(`/DetailParcel/${order.orderId}`)}
              >
                <ItemImg src={order.imageName ? `${IMG_URL}/${order.imageName}` : defaultImg} alt='' />
                <Sdiv>
                  <ItemTitle>{order.title}</ItemTitle>
                  <OrderId>{order.orderId}</OrderId>
                </Sdiv>
              </Items>
            ))}
            {loading && <LoadingText>로딩중...</LoadingText>}
            {isLast && <LoadingText></LoadingText>}
          </ContentBox>
        </AppMain>
        <Footer />
      </PageStyle>
    </CommonBox>
  );
}

export default ParcelFind;

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
  gap: 16px;
  box-sizing: border-box;
`;

const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  background-color: #2C2C2E;
  padding: 15px 20px;
  font-size: 20px;
  display: flex;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
`;

const OrderId = styled.div`
  font-size: 16px;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  height: 85px;
  width: 100%;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ItemImg = styled.img`
  width: 48px;
  height: 48px;
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-family: 'NeoEB', sans-serif;
`;

const Sdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'NeoR', sans-serif;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 16px 0;
  color: #888;
`;
