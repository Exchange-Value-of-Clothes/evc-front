import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SlidingPanel = ({ isOpen, onClose, targetRef }) => {
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (targetRef.current) {
      const { clientWidth, clientHeight } = targetRef.current;
      setPanelSize({
        width: clientWidth,
        height: clientHeight,
      });
    }
  }, [targetRef]);

  return (
    <Panel $isOpen={isOpen} size={panelSize}>
      <Content>
       
        <UtilDiv>
          <ItemStateDiv>
            예약중
          </ItemStateDiv>
          <CheckDiv>
            거래완료
          </CheckDiv>
          <CorrectionDiv>
            게시물 수정
          </CorrectionDiv>
          <DeleteDiv>
            삭제 
          </DeleteDiv>

        </UtilDiv>
        <CloseDiv>
          <Close onClick={onClose}>취소</Close>
        </CloseDiv>
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
const UtilDiv=styled.div`
  background-color: #2C2C2E;
  height: 230px;
  border-radius: 16px;

`
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
