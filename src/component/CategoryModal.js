import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import {ReactComponent as Reset} from "../asset/svgs/Reset.svg"
import {ReactComponent as Top} from "../asset/svgs/CategoryIcons/Top.svg"
import {ReactComponent as Acc} from "../asset/svgs/CategoryIcons/Acc.svg"
import {ReactComponent as Bag} from "../asset/svgs/CategoryIcons/Bag.svg"
import {ReactComponent as Fetc} from "../asset/svgs/CategoryIcons/Fetc.svg"
import {ReactComponent as Onepiece} from "../asset/svgs/CategoryIcons/Onepiece.svg"
import {ReactComponent as Pants} from "../asset/svgs/CategoryIcons/Pants.svg"
import {ReactComponent as Shoe} from "../asset/svgs/CategoryIcons/Shoe.svg"
import {ReactComponent as Skirt} from "../asset/svgs/CategoryIcons/Skirt.svg"
import {ReactComponent as Outer} from "../asset/svgs/CategoryIcons/Outer.svg"

const CategoryModal = ({ isOpen, close, selectedIcon, selectButton, resetSelection }) => {
  const handleClick = (iconName) => {
    selectButton(iconName);
  };

  // 아이콘 리스트
  const icons = [
    { name: "Top", component: <Top /> },
    { name: "Pants", component: <Pants /> },
    { name: "Skirt", component: <Skirt /> },
    { name: "Outer", component: <Outer /> },
    { name: "Onepiece", component: <Onepiece /> },
    { name: "Acc", component: <Acc /> },
    { name: "Shoe", component: <Shoe /> },
    { name: "Bag", component: <Bag /> },
    { name: "Fetc", component: <Fetc /> },
  ];

  return (
    <StyleModal isOpen={isOpen} onRequestClose={close}  appElement={document.getElementById('root')}>
      <ModalContents>
        <ModalHeader>
          <BackArrow onClick={close} />
          <Span0>카테고리 선택</Span0>
          <Reset onClick={resetSelection} />
        </ModalHeader>
        <Contents>
          {icons.map((icon) => (
            <div
              key={icon.name}
              style={{ color: selectedIcon.includes(icon.name) ? "#5AC8FA" : "#F4F4F4" }}
              onClick={() => handleClick(icon.name)}
            >
              {icon.component}
            </div>
          ))}
        </Contents>
      </ModalContents>
    </StyleModal>
  );
};

export default CategoryModal;


const StyleModal=styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 363px;
  height: 363px;
  background-color: #2C2C2E;
  border-radius: 8px;
  padding: 16px;
  display: flex;
`
const ModalContents=styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;

`
const ModalHeader=styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
`
const Contents=styled.div`
  padding-top: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap; 
  align-content: flex-start;
 
`
const Span0=styled.span`
  font-size: 20px;
  font-family: 'NeoEB',sans-serif;
  margin-right: 40%;
`
