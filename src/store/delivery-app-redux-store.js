import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import deliveryReducer from './slices/deliverySlice';
import inventoryReducer from './slices/inventorySlice';
import profileReducer from './slices/profileSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  delivery: deliveryReducer,
  inventory: inventoryReducer,
  profile: profileReducer,
});

// Configure and create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
