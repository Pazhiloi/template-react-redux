import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Cards = ({ imgs }) => {

  const isFetching = useSelector((state) => state.cards.isFetching);
  return (
    <ul>
      {isFetching ? (
        <div>loading</div>
      ) : (
        <>
          {imgs.map((img, i) => (
            <Link to={`/cards/${i}`} key={i}>
              <figure>
                <img src={img.src} alt={img.author} />
                <figcaption>
                  <div>{img.author} </div>
                  <span>{img.tag}</span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </>
      )}
    </ul>
  );

};

export default React.memo(Cards);