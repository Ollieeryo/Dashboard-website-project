import { emptySplitApi } from './emptySplitApi';

type Props = {
  tableName: string | null;
  gatewayId: string | number | null;
};

export const rawDataApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // 型別設置 <ResultType, QueryArg>

    rawDataTables: builder.query({
      query: () => '/rawdata/tables',
    }),

    rawData: builder.query({
      query: (tableName) => `/rawdata/table/limit?tableName=${tableName}`,
    }),

    // get table gatewayId
    rawDataTableGatewayId: builder.query({
      query: (tableName) => `/rawdata/table/gatewayid?tableName=${tableName}`,
    }),

    // tableName and gatewayId data
    rawDataByGatewayId: builder.query({
      query: ({ tableName, gatewayId }: Props) =>
        `/rawdata/table?tableName=${tableName}&gatewayId=${gatewayId}`,
    }),
  }),
});

export const {
  useRawDataTablesQuery,
  useRawDataQuery,
  useRawDataTableGatewayIdQuery,
  useRawDataByGatewayIdQuery,
} = rawDataApi;
