import React from 'react'
import eximg from '../asset/image/샌즈.jpg'
import {ReactComponent as Selling} from "../asset/svgs/selling.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Itemcard.css'
import { useNavigate } from 'react-router-dom';


function Itemcard() {
  
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/item/1`); // 
    }
  
  return (
  
    <div className="item-card"  onClick={handleCardClick}>
    
        <div className="item-card-image-box">
            <img className='card-img' src={ eximg } alt=""/>
        </div>
        <div className="item-card-text-div">
            <div className="card-title"><div>샌즈</div></div>
            <div className="card-uploadTime"><span>22:00</span></div>
            <div className="card-price"><div>50,000원</div></div>
        </div>
        <div className="item-card-etc-div">
            <div className="card-state"><Selling/></div>
            <div className="card-like"><FavoriteBorderIcon/>121</div>
        </div>
    </div> 
 
  )
}

export default Itemcard