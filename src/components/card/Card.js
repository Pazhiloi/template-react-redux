import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Card = () => {
  const collections = useSelector((state) => state.cards.collections);
  let params = useParams()
  let { id } = params;
  return (
    <div>
      <h1></h1>
      <img src={collections[id].src} alt="" />
    </div>
  );
};

export default React.memo(Card);