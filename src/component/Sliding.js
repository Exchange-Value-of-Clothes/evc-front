import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteAuc,deleteUsed,editUsed } from '../api/ItemApi';

const SlidingPanel = ({ isOpen, onClose, targetRef,itemId,kinds,transactionStatus }) => {
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });
  const navigate =useNavigate();
  useEffect(() => {
    if (targetRef.current) {
      const { clientWidth, clientHeight } = targetRef.current;
      setPanelSize({
        width: clientWidth,
        height: clientHeight,
      });
    }
  }, [targetRef]);
  //경매는 예약중 거래완료 뺴기 삭제시 부모컴포넌트건드려서지울지 리로드할지고민
  const handleDelete = async () => {
    try {
      if (!itemId) return;

      if (kinds === 'AUCTION') {
        await deleteAuc(itemId);
        console.log(`경매 아이템 ${itemId} 삭제 완료`);
      } else {
        await deleteUsed(itemId);
        console.log(`중고 아이템 ${itemId} 삭제 완료`);
      }

      onClose(); 
    } catch (err) {
      console.error('삭제 실패:', err);
      
    }
  };
 const handleStatus = async (Status, e) => {
  e?.preventDefault();
  e?.stopPropagation();

  if (!itemId) return;

  try {
    await editUsed(itemId, Status);
    console.log('상태변경성공');
    window.location.reload();
    onClose();
  } catch (err) {
    console.error('상태 변경 실패:', err);
  }
};

const editPost=(e,type)=>{
  e?.preventDefault();
  e?.stopPropagation();
  navigate('/EditPage',{
    state:{
      itemType:type,
      itemsId:itemId
    }
  })

}

  return (
    <Panel $isOpen={isOpen} size={panelSize}>
      <Content>
       
       {kinds==='AUCTION'?(
        <>
        <UtilDiv isAuction={kinds === 'AUCTION'}>
         
         
         
          
          <CorrectionDiv onClick={(e)=>{editPost(e,'AUCTION')}}>
            게시물 수정
          </CorrectionDiv>
          <DeleteDiv onClick={handleDelete}>
            삭제 
          </DeleteDiv>

        </UtilDiv>
        <CloseDiv>
          <Close onClick={onClose}>취소</Close>
        </CloseDiv>
        </>
       ):(<>
       <UtilDiv isAuction={kinds === 'AUCTION'}>
          {transactionStatus === 'ONGOING' && (
            <>
              <ItemStateDiv onClick={(e) => handleStatus('RESERVE', e)}>
                예약중
              </ItemStateDiv>
              <CheckDiv onClick={(e) => handleStatus('COMPLETE', e)}>
                거래완료
              </CheckDiv>
            </>
          )}

          {transactionStatus === 'RESERVE' && (
            <>
              <ActiveDiv 
                  onClick={(e) => handleStatus('ONGOING', e)}
                  style={{ 
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                  }}     
                >
                거래활성화
              </ActiveDiv>
              <CheckDiv onClick={(e) => handleStatus('COMPLETE', e)}>
                거래완료
              </CheckDiv>
            </>
          )}

          {transactionStatus === 'COMPLETE' && (
            <>
              <ItemStateDiv onClick={(e) => handleStatus('RESERVE', e)}>
                예약중
              </ItemStateDiv>
              <ActiveDiv onClick={(e) => handleStatus('ONGOING', e)}>
                거래활성화
              </ActiveDiv>
            </>
          )}

          <CorrectionDiv onClick={(e)=>{editPost(e,'USEDITEM')}}>
            게시물 수정
          </CorrectionDiv>
          <DeleteDiv onClick={handleDelete}>
            삭제
          </DeleteDiv>
        </UtilDiv>
        <CloseDiv>
          <Close onClick={onClose}>취소</Close>
        </CloseDiv>
        </>
       )}
      </Content>
    </Panel>
  );
};

export default SlidingPanel;

// styled-components
const Panel = styled.div`
  position: fixed;
  bottom: 30px;
  width: ${props => props.size.width || '100%'}px;
  height: 300px;
  transition: bottom 0.3s ease-in-out;
  z-index: 10;
  bottom: ${props => (props.$isOpen ? '35px' : '-100%')};
  margin: 0 auto;
  box-sizing: border-box;

`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
`;
const UtilDiv = styled.div`
  background-color: #2C2C2E;
  height: ${({ isAuction }) => (isAuction ? '113px' : '230px')};
  border-radius: 16px;
  border-top-left-radius:16px;
  border-top-right-radius:16px;

`;
const ItemStateDiv=styled.div`
  background-color: #2C2C2E;
  width: 100%;
  height: 56px;
  border-top-left-radius:16px;
  border-top-right-radius:16px;
  border-bottom: solid 1px #4A4A4A;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#007AFF;
  font-size: 20px;

`
const CheckDiv=styled.div`
  background-color: #2C2C2E;
  border-bottom: solid 1px #4A4A4A;
  width: 100%;
  height: 56px;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#007AFF;
  font-size: 20px;

`
const CorrectionDiv=styled.div`
  background-color: #2C2C2E;
  border-bottom: solid 1px #4A4A4A;
  width: 100%;
  height: 56px;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#007AFF;
  font-size: 20px;
  border-top-left-radius:${({ isAuction }) => (isAuction ?  0:'16px' )};
  border-top-right-radius:${({ isAuction }) => (isAuction ?  0:'16px')};

`
const DeleteDiv=styled.div`
  background-color: #2C2C2E;
  width: 100%;
  height: 56px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius:16px;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#FF453A;
  font-size: 20px;

`
const CloseDiv=styled.div`
  background: rgba(0, 0, 0, 0);
  height: 70px;
  padding-top: 10px;
  
`

const Close = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 16px;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#007AFF;
  background-color: #2C2C2E;
  font-size: 20px;
`;

const ActiveDiv=styled.div`
  background-color: #2C2C2E;
  border-bottom: solid 1px #4A4A4A;
  width: 100%;
  height: 56px;
  display: flex;
  align-items:center;
  justify-content: center;
  color:#007AFF;
  font-size: 20px;
`