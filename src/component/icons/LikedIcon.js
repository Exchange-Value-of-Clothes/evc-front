import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';
import { postLiked } from '../../api/ItemApi'

const LikedIcon = ({ itemId, itemType, initialLiked , initialCount }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    try {
      const result = await postLiked(itemId, itemType);

    
      setLiked(prev => !prev);
      setCount(prev => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LikeWrapper onClick={handleToggle} disabled={loading}>
      {liked ? <FavoriteIcon  /> : <FavoriteBorderIcon />}
      <LikeCount>{count||null}</LikeCount>
    </LikeWrapper>
  );
};

export default LikedIcon;

const LikeWrapper = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  padding: 0;
  gap: 4px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const LikeCount = styled.span`
  font-size: 1rem;
`;
