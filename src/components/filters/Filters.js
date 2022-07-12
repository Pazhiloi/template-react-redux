import React from 'react';

const Filters = ({ onClickAll, all, onClick, filters }) => {
  return (
    <form>
      <ul>
        <li onClick={onClickAll}>
          <input type="checkbox" onChange={onClickAll} checked={all} />
          <label htmlFor="all">All</label>
        </li>
        {filters?.map((filter, i) => (
          <li key={i} data-index={i} onClick={(e) => onClick(e)}>
            <input
              id={filter.name}
              onChange={(e) => onClick(e)}
              type="checkbox"
              checked={filter.status}
            />
            <label htmlFor={filter.name}>{filter.name}</label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Filters;