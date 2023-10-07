import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../features/phonebookSlice.js';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.phonebook.filter);

  return (
    <input
      type="text"
      name="filter"
      placeholder="Szukaj kontaktów..."
      value={filter}
      onChange={e => dispatch(setFilter(e.target.value))}
    />
  );
}

export default Filter;
