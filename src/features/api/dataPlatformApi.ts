import { emptySplitApi } from './emptySplitApi';

type Props = {
  tableName?: string | null;
  name?: string | null;
  siteId: number | null;
  platformName?: string | null;
  tableNameFrom: string | null;
  tableNameTo: string | null;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  deviceName: string | null;
};

type DataBySiteIdAndNameProps = Pick<Props, 'tableName' | 'siteId' | 'platformName'>;

type DataByMonthAndDateProps = Pick<
  Props,
  'tableNameFrom' | 'tableNameTo' | 'siteId' | 'deviceName' | 'dateFrom' | 'dateTo'
>;

export const dataPlatformApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    dataPlatformNamesBySiteId: builder.query({
      query: (siteId) => `/dataplatform/names/${siteId}`,
    }),

    dataPlatformBySiteIdAndName: builder.query({
      query: ({ tableName, siteId, platformName }: DataBySiteIdAndNameProps) =>
        `/dataplatform/${tableName}/${siteId}?name=${platformName}`,
    }),

    dataPlatformByMonthAndDate: builder.query({
      query: ({
        tableNameFrom,
        tableNameTo,
        siteId,
        deviceName,
        dateFrom,
        dateTo,
      }: DataByMonthAndDateProps) =>
        `/dataplatform/${tableNameFrom}/${tableNameTo}/${siteId}/${deviceName}/${dateFrom}/${dateTo}`,
    }),
  }),
});

export const {
  useLazyDataPlatformNamesBySiteIdQuery,
  useDataPlatformBySiteIdAndNameQuery,
  useLazyDataPlatformByMonthAndDateQuery,
} = dataPlatformApi;
