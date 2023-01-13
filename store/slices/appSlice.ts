import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../store';
  
  // declaring the types for our state
  export type AppSlice = {
    date: Date;
    query: string;
  };
  
  const initialState: AppSlice = {
    query: '',
    date: null
  };
  
  export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      
      setQuery: (state, action) => {
        state.query = action.payload;
      },

      setDate: (state, action) => {
        state.date = action.payload;
      }

    },
  });
  // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
  export const {
    setQuery,
    setDate
  } = appSlice.actions;
  
  // exporting the reducer here, as we need to add this to the store
  export default appSlice.reducer;