import { configureStore } from '@reduxjs/toolkit';
import { contactsFilterReducer } from './contactsFilterSlice';
import { contactsReducer } from './contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    contactsFilter: contactsFilterReducer,
  },
});

export default store;
