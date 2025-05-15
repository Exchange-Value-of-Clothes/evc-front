import React,{useState,useRef,useEffect}from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import EtcIcon from '../component/icons/EtcIcon';
import Footer from '../component/Footer';
import SlidingPanel from '../component/Sliding';
import { useLocation } from "react-router-dom";
import usePageFilterStore from '../store/filterStore';
import Filter from '../component/Filter';
import Itemcard from "../component/Itemcard";
import { useInView } from "react-intersection-observer";
import { getMyitem,getMyAuc } from '../api/ItemApi';

function WhoStore() {
    const hasCalledRef = useRef(false);
    const targetRef = useRef(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const location=useLocation();
    const {filters,setFilter} = usePageFilterStore();
    const currentPage = location.pathname;
    const selectedFilter=filters[currentPage];
    const scrollPositionsRef = useRef({});
    const appMainRef = useRef(null);
    const [isFetching, setIsFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [cursor, setCursor] = useState(null);
    const { ref, inView } = useInView({ threshold: 0.1});
    const [isLast, setIsLast] = useState(false);
    const [count,setCount] =useState(0);
    const profileImg = location.state?.profileImg;
    const [selectedItemId, setSelectedItemId] = useState(null); 
    const [kind,setKind] = useState('');


  const togglePanel = (e,kind,itemId) => {
    e.stopPropagation();
    setSelectedItemId(itemId); 
    setKind(kind)
    setIsPanelOpen(!isPanelOpen);
  };
  const handleClosePanel = () => {
  setIsPanelOpen(false);
};
  const fetchItems = async () => {
    if (isFetching || isLast) return;
  
    setIsFetching(true);
    try {
      let data;
      let content = [];
      let nextCursor = null;
      let hasNext = false;
  
      if (selectedFilter === 'ALL' || selectedFilter === 'BUY' || selectedFilter === 'SELL') {
        const mode = selectedFilter === 'ALL' ? null : selectedFilter;
        data = await getMyitem(cursor, mode);
        if (data?.myOrMemberUsedItems?.content && Array.isArray(data.myOrMemberUsedItems.content)) {
          content = data.myOrMemberUsedItems.content;
          nextCursor = data.cursor;
          hasNext = data.hasNext;
          setCount(data.postItemCount)
        }
      } else if (selectedFilter === 'AUCTION') {
        data = await getMyAuc(cursor);
        if (data?.myOrMemberAuctionItems?.content && Array.isArray(data.myOrMemberAuctionItems.content)) {
          content = data.myOrMemberAuctionItems.content;
          nextCursor = data.cursor;
          hasNext = data.hasNext;
          setCount(data.postItemCount)
        }
      }
  
      if (content.length > 0) {
        setCursor(nextCursor);
        setItems(prevItems => [...prevItems, ...content]);
      }
  
      if (!hasNext) {
        setIsLast(true);
      }
  
    } catch (err) {
      console.error("아이템 요청 실패", err);
    } finally {
      setIsFetching(false);
      hasCalledRef.current = false;
    }
  };
  
  
  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'BUY') return item.transactionMode === 'BUY';
    if (selectedFilter === 'SELL') return item.transactionMode === 'SELL';
    if (selectedFilter === 'AUCTION') return item.transactionMode === 'AUCTION';

    return true;
  });
  useEffect(() => {
    // 필터 변경 시 기존 상태 초기화 후 새로 요청
    setItems([]);
    setCursor(null);
    setIsLast(false);
    hasCalledRef.current = false;
    fetchItems();
  }, [selectedFilter]);
  useEffect(() => {
    if (inView && !isLast && !isFetching && !hasCalledRef.current) {
      hasCalledRef.current = true;
      fetchItems();
      
    }
  }, [inView, isLast, isFetching, selectedFilter]);
  
  
    useEffect(() => {
      return () => {
        if (appMainRef.current) {
          scrollPositionsRef.current[selectedFilter] = appMainRef.current.scrollTop;
        }
      };
    }, [selectedFilter]);
    useEffect(() => {
      const pos = scrollPositionsRef.current[selectedFilter] || 0;
      if (appMainRef.current) {
        appMainRef.current.scrollTop = pos;
      }
    }, [selectedFilter]);
    
  return (
    <CommonBox ref={targetRef}>
        <PageStyle>
            <Header2 title={"상점"} icon={<BackIcon/>}></Header2>
           
                <ProfileBox>
                    <ImgBox>
                        <ProfileImg src={profileImg} alt=''/>
                    </ImgBox>
                    <Profile>  {/*여기도 버릴수도*/}
                        <PostCount>
                            {count}
                        </PostCount>
                        게시물
                    </Profile>
                </ProfileBox>
                <Filter 
                filterShape={'ham'}
                addAuc={true} 
                selectedFilter={selectedFilter} 
                setSelectedFilter={(val)=>setFilter(currentPage,val)} />
            <AppMain ref={appMainRef}>
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <Itemcard 
                         onClick={(e) => togglePanel(e,item.transactionMode === "AUCTION" ?'AUCTION':'USEDITEM' ,item.transactionMode === "AUCTION" ? item.auctionItemId : item.usedItemId)}
                          key={item.transactionMode === "AUCTION" ? item.auctionItemId : item.usedItemId}
                          item={item}
                          imgName={item.imageName} extraIcon={<EtcIcon/>} isAuc={selectedFilter === 'AUCTION'} />
                    ))
                    ) : (
                    <p>아이템이 없습니다.</p>
                )}

                {!isLast && <div ref={ref}></div>}
           
                <SlidingPanel isOpen={isPanelOpen} onClose={handleClosePanel} targetRef={targetRef}
                itemId={selectedItemId} kinds={kind} />
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default WhoStore

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
const ProfileBox = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    border-bottom: solid 1px #4A4A4A;
`

const ImgBox=styled.div`
    width:  64px;
    height: 64px;
    @media (max-height: 700px){
        width:  64px;
        height: 64px;
    }
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden; 
`
const ProfileImg=styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;

`
const PostCount=styled.div`
    font-size: 16px;

`
const Profile=styled.div`
    height: 40%;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;

`
