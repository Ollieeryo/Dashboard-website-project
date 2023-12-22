import { emptySplitApi } from './emptySplitApi';

export const apiListApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // 型別設置 <ResultType, QueryArg>

    // api list
    apiList: builder.query({
      query: () => '/apilist',
    }),
    // 編輯指定 api
    editApi: builder.mutation({
      query: (id) => ({
        url: `apilist/edit/${id}`,
      }),
    }),
  }),
});

export const { useApiListQuery, useEditApiMutation } = apiListApi;
