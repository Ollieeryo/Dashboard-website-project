import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/users/userSlice';
import siteReducer from '@/features/sites/siteSlice';
import etlDataReducer from '@/features/data/etlDataSlice';
import dataReducer from '@/features/data/dataSlice';
import platFormDataReducer from '@/features/data/platFormSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { emptySplitApi } from '../features/api/emptySplitApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], //僅持久化 auth reducer
};

const reducers = combineReducers({
  auth: authReducer,
  site: siteReducer,
  data: dataReducer,
  etlData: etlDataReducer,
  platformData: platFormDataReducer,
  // rtk query
  // [authApi.reducerPath]: authApi.reducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // rtk query middleware setting
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // .concat(authApi.middleware),
      .concat(emptySplitApi.middleware),
});

export const persistor = persistStore(store); // Create a persisted store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
