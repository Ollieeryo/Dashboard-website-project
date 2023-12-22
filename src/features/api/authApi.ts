import { emptySplitApi } from './emptySplitApi';

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // 型別設置 <ResultType, QueryArg>
    //  新增註冊 API
    signUp: builder.mutation({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),

    // 登入 API
    signIn: builder.mutation({
      query: (data) => ({
        url: 'signin',
        method: 'POST',
        body: data,
      }),
    }),

    // 驗證 token 是否有效
    verifyToken: builder.query({
      query: () => 'token/verify',
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyTokenQuery } = authApi;
