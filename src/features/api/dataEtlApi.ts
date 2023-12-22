import { emptySplitApi } from './emptySplitApi';

type Props = {
  tableName: string | null;
  gatewayId: string | number | null;
  etlName: string | null;
  tableNameFrom: string | null;
  tableNameTo: string | null;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  deviceName: string | null;
  date: string | undefined;
  timeFrom: string | null;
  timeEnd: string | null;
};

type DataBySiteIdAndNameProps = Pick<Props, 'tableName' | 'gatewayId' | 'etlName'>;

type DataByMonthAndDateProps = Pick<
  Props,
  'tableNameFrom' | 'tableNameTo' | 'gatewayId' | 'deviceName' | 'dateFrom' | 'dateTo'
>;

type DataByDateAndTimeProps = Pick<
  Props,
  'tableName' | 'date' | 'gatewayId' | 'deviceName' | 'timeFrom' | 'timeEnd'
>;

export const dataEtlApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    dataEtlNamesBySiteId: builder.query({
      query: (siteId) => `/dataetl/names/${siteId}`,
    }),

    // tableName and gatewayId data
    dataEtlByGatewayIdAndName: builder.query({
      query: ({ tableName, gatewayId, etlName }: DataBySiteIdAndNameProps) =>
        `/dataetl/${tableName}/${gatewayId}?name=${etlName}`,
    }),

    dataEtlByMonthAndDate: builder.query({
      query: ({
        tableNameFrom,
        tableNameTo,
        gatewayId,
        deviceName,
        dateFrom,
        dateTo,
      }: DataByMonthAndDateProps) =>
        `/dataetl/${tableNameFrom}/${tableNameTo}/${gatewayId}/${deviceName}/${dateFrom}/${dateTo}`,
    }),

    dataEtlByDateAndTime: builder.query({
      query: ({
        tableName,
        gatewayId,
        deviceName,
        date,
        timeFrom,
        timeEnd,
      }: DataByDateAndTimeProps) =>
        `/dataetl/${tableName}/${gatewayId}/${deviceName}/${date}?timeFrom=${timeFrom}&timeEnd=${timeEnd}`,
    }),
  }),
});

export const {
  useDataEtlByGatewayIdAndNameQuery,
  useLazyDataEtlNamesBySiteIdQuery,
  useLazyDataEtlByMonthAndDateQuery,
  useLazyDataEtlByDateAndTimeQuery,
} = dataEtlApi;
