import React from 'react'
import styled from 'styled-components'

function Header2({ icon,title,extra}) {
    return (
      <HeaderBox>
        <HeaderContent>
          <HeaderIcons>
            <HeaderLeft>{icon}</HeaderLeft>
          </HeaderIcons>
          <HeaderTitle>{title}</HeaderTitle>
          {extra&&
            <HeaderExtraIcon>{extra}</HeaderExtraIcon>
          }
         
        </HeaderContent>
      </HeaderBox>
    );
  }
export default Header2

Header2.defaultProps = {
    icon: null,  // 아이콘을 기본값으로 null로 설정
    title: null,
    extra: null,
  };

const HeaderBox=styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    background-color:#2C2C2E;
    padding: 15px 20px;
    font-size: 20px;
    display: flex;


`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
`;


const HeaderTitle = styled.div`
  font-size: 20px;
  margin: 16px;
`;
const HeaderIcons = styled.div`
    display: flex;
    gap: 20px;
   
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; 
  height: 100%;

`;

const HeaderExtraIcon=styled.div`
 display: flex;
 align-items: center;
 position: absolute;
 right: 8px;
  
`
