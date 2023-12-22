// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/baseUrl';
import { RootState } from '../../store/store';

const url = baseUrl();

const customBaseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    // 在這裡添加 Token 到 headers，只有 token 存在時才會設置 header + token
    const token = (getState() as RootState).auth.user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'emptySplitApi',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
