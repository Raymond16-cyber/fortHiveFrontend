import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { friendsMessageReducer, messageReducer } from "./reducers/friendsReducer"
import { friendReducer } from './reducers/friendRequestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  friends: friendsMessageReducer,
  friendRequests: friendReducer
  
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
