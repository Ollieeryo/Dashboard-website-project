import { emptySplitApi } from './emptySplitApi';

export const siteListApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // 型別設置 <ResultType, QueryArg>

    siteList: builder.query({
      query: () => '/sitelist',
    }),

    // 設備列表
    deviceList: builder.query({
      query: (id) => `/site/devices/${id}`,
    }),
  }),
});

export const { useSiteListQuery, useDeviceListQuery } = siteListApi;
