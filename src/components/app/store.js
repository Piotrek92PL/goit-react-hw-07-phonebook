import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from '../features/phonebookSlice';

const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
});

export default store;
