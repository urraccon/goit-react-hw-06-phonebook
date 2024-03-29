import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const contactsFilterSlice = createSlice({
  name: 'contactsFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = contactsFilterSlice.actions;
export const contactsFilterReducer = contactsFilterSlice.reducer;
