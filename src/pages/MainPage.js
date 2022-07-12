import React from 'react';
import Cards from '../components/cards/Cards';
import Filters from '../components/filters/Filters';

const MainPage = ({ filters , all, setFilters, setFilter, setAll, setall, collections, images}) => {
  return (
    <>
      <Filters
        onClickAll={() => {
          setFilters(setAll(filters));
          setall(true);
        }}
        all={all}
        onClick={setFilter}
        filters={filters}
      />
      <div className="products">
        {all ? <Cards imgs={collections} /> : <Cards imgs={images} />}
      </div>
    </>
  );
};

export default MainPage;