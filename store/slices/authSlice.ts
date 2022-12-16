import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../store';
  
  // declaring the types for our state
  export type AuthState = {
    access_token: string;
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    image: string;
    favoriteCenters: string[];
    teams: string[];
    address: string;
    city: string;
    country: string;
    nationality: string;
    phone: string;
    postcode: string;
    gender: string;
    birthday: string;
    language: string;
    municipality: string;
    description: string;
    level: number;
  };
  
  const initialState: AuthState = {
    access_token: '',
    _id: '',
    email: '',
    firstname: '',
    lastname: '',
    image: '',
    favoriteCenters: [],
    teams: [],
    address: '',
    city: '',
    country: '',
    nationality: '',
    phone: '',
    postcode: '',
    level: 1,
    gender: 'male',
    birthday: '1999-01-01',
    language: 'en',
    municipality: '',
    description: '',
  };
  
  export const loginSlice = createSlice({
    name: 'login',
    initialState,
  // The `reducers` field lets us define reducers and generate associated actions. 
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
    reducers: {
      
      login: (state, action: PayloadAction<any>) => {
        state.access_token = action.payload['access_token'];
        state._id = action.payload.profile['_id'];
        state.email = action.payload.profile['email'];
        state.firstname = action.payload.profile['firstname'];
        state.lastname = action.payload.profile['lastname'];
        state.image = action.payload.profile['image'];
        state.favoriteCenters = action.payload.profile['favoriteCenters'];

        state.address = action.payload.profile['address'];
        state.city = action.payload.profile['city'];
        state.country = action.payload.profile['country'];
        state.level = action.payload.profile['level'];
        state.nationality = action.payload.profile['nationality'];
        state.phone = action.payload.profile['phone'];
        state.postcode = action.payload.profile['postcode'];
        state.teams = action.payload.profile['teams'];
        
        state.gender = action.payload.profile['gender'];
        state.birthday = action.payload.profile['birthday'];
        state.language = action.payload.profile['language'];
        state.municipality = action.payload.profile['municipality'];
        state.description = action.payload.profile['description'];
        
        localStorage.setItem('access_token', state.access_token);
      },

      logout: (state) => {
        state.access_token = '';
        state.email = '';
        state.firstname = '';
        state.lastname = '';
        state._id = '';
        state.favoriteCenters = [];

        state.address = '';
        state.city = '';
        state.country = '';
        state.level = 1;
        state.nationality = '';
        state.phone = '';
        state.postcode = '';
        state.teams = [];

        state.gender = '';
        state.birthday = '';
        state.language = '';
        state.municipality = '';
        state.description = '';

        localStorage.removeItem('access_token');
      },

      updateFavorites: (state, action: PayloadAction<any>) => {
        state.favoriteCenters = action.payload;
      },

      updateProfile: (state, action: PayloadAction<any>) => {
        state._id = action.payload['_id'];
        state.email = action.payload['email'];
        state.firstname = action.payload['firstname'];
        state.lastname = action.payload['lastname'];
        state.image = action.payload['image'];
        state.favoriteCenters = action.payload['favoriteCenters'];
        
        state.address = action.payload['address'];
        state.city = action.payload['city'];
        state.country = action.payload['country'];
        state.level = action.payload['level'];
        state.nationality = action.payload['nationality'];
        state.phone = action.payload['phone'];
        state.postcode = action.payload['postcode'];
        state.teams = action.payload['teams'];

        state.gender = action.payload['gender'];
        state.birthday = action.payload['birthday'];
        state.language = action.payload['language'];
        state.municipality = action.payload['municipality'];
        state.description = action.payload['description'];
      }
    },
  });
  // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
  export const {
    login,
    logout,
    updateFavorites,
    updateProfile
  } = loginSlice.actions;
  
  // exporting the reducer here, as we need to add this to the store
  export default loginSlice.reducer;