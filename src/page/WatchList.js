import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import Itemcard from '../component/Itemcard'
import { getLikeItem } from '../api/ItemApi';
import { useInView } from "react-intersection-observer";

 
function WatchList() {
  const hasCalledRef = useRef(false);
  const appMainRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [isLast, setIsLast] = useState(false);

 const fetchLikedItems = async () => {
  if (isFetching || isLast) return;

  setIsFetching(true);
  try {
    const res = await getLikeItem(cursor);

    const newItems = Array.isArray(res?.content) ? res.content : [];
    const hasMore = !!res?.hasNext;
    const nextCursor = res?.cursor || null;

    if (newItems.length > 0) {
      setItems(prev => [...prev, ...newItems]);
      setCursor(nextCursor);
    }

    if (newItems.length === 0 || !hasMore) {
      setIsLast(true); // 🔒 더 이상 불러올 게 없다면 안전하게 종료
    }

  } catch (err) {
    console.error("❌ 관심 목록 불러오기 실패:", err);
  } finally {
    setIsFetching(false);
    hasCalledRef.current = false;
  }
};

  useEffect(() => {
      console.log("📍 inView:", inView, "isLast:", isLast, "isFetching:", isFetching);

  if (!inView || isFetching || isLast) return;

  hasCalledRef.current = true;
  fetchLikedItems();
}, [inView]);


  useEffect(() => {
    
    fetchLikedItems();
  }, []);
   
    
  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"관심 목록"} icon={<BackIcon/>}></Header2>      
            <AppMain ref={appMainRef}>
               {items.length > 0 ? (
                  items.map(item => (
                    <Itemcard
                      key={item.itemId}
                      item={item}
                      imgName={item.imageName}
                      isAuc={item.transactionMode === "AUCTION" ?'AUCTION':'USEDITEM'}
                      id2={item.itemId}
                      isliked={true}
                    />
                  ))
                ) : (
                  <p>아이템이 없습니다.</p>
                )}

                {!isLast && <div ref={ref}></div>}

              

           
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default WatchList

const PageStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
  flex-direction: column;
`
const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;

`



