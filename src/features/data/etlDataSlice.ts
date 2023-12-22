import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type Data = {
  etlTableName: string | null;
  etlName: string | null;
  etlSiteId: number | null;
  etlSiteName: string | null;
  etlDeviceName: string | null;
  etlMonthFrom: string | undefined;
  etlMonthTo: string | undefined;
  etlDateFrom: string | undefined;
  etlDateTo: string | undefined;
  etlGatewayId: number | null;

  etlMonthSiteId: number | null;
  etlMonthSiteName: string | null;
  etlMonthFromTableName: string | null;
  etlMonthToTableName: string | null;
  etlMonthName: string | null;
  etlMonthGatewayId: number | null;
  etlMonthDeviceName: string | null;

  etlMonthTimeSiteId: number | null;
  etlMonthTimeSiteName: string | null;
  etlMonthTimeTableName: string | null;
  etlMonthTimeName: string | null;
  etlMonthTimeGatewayId: number | null;
  etlMonthTimeDeviceName: string | null;
  etlTimeMonth: string | undefined;
  etlTimeDate: string | undefined;
  etlStartTime: string | null;
  etlEndTime: string | null;
};

const etlDataSlice = createSlice({
  name: 'etlData',
  initialState: <Data>{
    etlTableName: null,
    etlName: null,
    etlSiteId: null,
    etlSiteName: null,
    etlDeviceName: null,
    etlMonthFrom: undefined,
    etlMonthTo: undefined,
    etlDateFrom: undefined,
    etlDateTo: undefined,
    etlGatewayId: null,

    etlMonthSiteId: null,
    etlMonthSiteName: null,
    etlMonthFromTableName: null,
    etlMonthToTableName: null,
    etlMonthName: null,
    etlMonthGatewayId: null,
    etlMonthDeviceName: null,

    etlMonthTimeSiteId: null,
    etlMonthTimeSiteName: null,
    etlMonthTimeTableName: null,
    etlMonthTimeName: null,
    etlMonthTimeGatewayId: null,
    etlMonthTimeDeviceName: null,
    etlTimeMonth: undefined,
    etlTimeDate: undefined,
    etlStartTime: '',
    etlEndTime: '',
  },

  reducers: {
    setEtlTableName: (state, action: PayloadAction<Data['etlTableName']>) => {
      const hashIndex = action.payload?.indexOf('#');
      const tableName = `${action.payload
        ?.substring(0, 1)
        .toLowerCase()}${action.payload?.substring(1, hashIndex)}`;

      state.etlTableName = tableName;
    },
    setEtlName: (state, action: PayloadAction<Data['etlName']>) => {
      state.etlName = encodeURIComponent(action.payload || '');
    },
    setEtlSiteId: (state, action: PayloadAction<Data['etlSiteId']>) => {
      state.etlSiteId = action.payload;
    },
    setEtlSiteName: (state, action: PayloadAction<Data['etlSiteName']>) => {
      state.etlSiteName = action.payload;
    },
    setEtlDeviceName: (state, action: PayloadAction<Data['etlDeviceName']>) => {
      state.etlDeviceName = action.payload;
    },
    setEtlGatewayId: (state, action: PayloadAction<Data['etlGatewayId']>) => {
      state.etlGatewayId = action.payload;
    },

    //month
    setEtlMonthSiteIdAndName: (
      state,
      action: PayloadAction<Pick<Data, 'etlMonthSiteId' | 'etlMonthSiteName'>>,
    ) => {
      const { etlMonthSiteId, etlMonthSiteName } = action.payload;
      state.etlMonthSiteId = etlMonthSiteId;
      state.etlMonthSiteName = etlMonthSiteName;
    },
    setEtlMonthNameAndGatewayId: (
      state,
      action: PayloadAction<Pick<Data, 'etlMonthName' | 'etlMonthGatewayId'>>,
    ) => {
      const { etlMonthName, etlMonthGatewayId } = action.payload;

      state.etlMonthName = encodeURIComponent(etlMonthName ?? '');
      state.etlMonthGatewayId = etlMonthGatewayId;
    },
    setEtlMonthDeviceName: (state, action: PayloadAction<Data['etlMonthDeviceName']>) => {
      state.etlMonthDeviceName = action.payload;
    },
    setEtlMonthAndDate: (
      state,
      action: PayloadAction<
        Pick<Data, 'etlMonthFrom' | 'etlMonthTo' | 'etlDateFrom' | 'etlDateTo'>
      >,
    ) => {
      const { etlMonthFrom, etlMonthTo, etlDateFrom, etlDateTo } = action.payload;
      state.etlMonthFrom = etlMonthFrom;
      state.etlMonthTo = etlMonthTo ? etlMonthTo : etlMonthFrom;
      state.etlDateFrom = etlDateFrom;
      state.etlDateTo = etlDateTo;

      const etlMonthName = decodeURIComponent(state.etlMonthName ?? '');
      const hashIndex = etlMonthName.indexOf('#');
      const tableName = `${etlMonthName?.substring(0, 1).toLowerCase()}${etlMonthName?.substring(
        1,
        hashIndex,
      )}`;
      const MonthFromTableName = `${tableName}_${state.etlMonthFrom}`;
      const MonthToTableName = `${tableName}_${state.etlMonthTo}`;

      state.etlMonthFromTableName = MonthFromTableName;
      state.etlMonthToTableName = MonthToTableName;
    },

    // month and time
    setEtlMonthTimeSiteIdAndName: (
      state,
      action: PayloadAction<Pick<Data, 'etlMonthTimeSiteId' | 'etlMonthTimeSiteName'>>,
    ) => {
      const { etlMonthTimeSiteId, etlMonthTimeSiteName } = action.payload;
      state.etlMonthTimeSiteId = etlMonthTimeSiteId;
      state.etlMonthTimeSiteName = etlMonthTimeSiteName;
    },
    setEtlMonthTimeNameAndGatewayId: (
      state,
      action: PayloadAction<Pick<Data, 'etlMonthTimeName' | 'etlMonthTimeGatewayId'>>,
    ) => {
      const { etlMonthTimeName, etlMonthTimeGatewayId } = action.payload;

      state.etlMonthTimeName = encodeURIComponent(etlMonthTimeName ?? '');
      state.etlMonthTimeGatewayId = etlMonthTimeGatewayId;
    },
    setEtlMonthTimeDeviceName: (state, action: PayloadAction<Data['etlMonthTimeDeviceName']>) => {
      state.etlMonthTimeDeviceName = action.payload;
    },
    setEtlTimeMonthAndDate: (
      state,
      action: PayloadAction<Pick<Data, 'etlTimeMonth' | 'etlTimeDate'>>,
    ) => {
      const { etlTimeMonth, etlTimeDate } = action.payload;
      state.etlTimeMonth = etlTimeMonth;
      state.etlTimeDate = etlTimeDate;

      const etlMonthTimeName = decodeURIComponent(state.etlMonthTimeName ?? '');
      const hashIndex = etlMonthTimeName.indexOf('#');
      const tableName = `${etlMonthTimeName
        ?.substring(0, 1)
        .toLowerCase()}${etlMonthTimeName?.substring(1, hashIndex)}`;
      const MonthTableName = `${tableName}_${state.etlTimeMonth}`;

      state.etlMonthTimeTableName = MonthTableName;
    },

    // time format
    setEtlStartAndEndTime: (
      state,
      action: PayloadAction<Pick<Data, 'etlStartTime' | 'etlEndTime'>>,
    ) => {
      const { etlStartTime, etlEndTime } = action.payload;
      state.etlStartTime = etlStartTime;
      state.etlEndTime = etlEndTime;
    },
  },
});

export const {
  setEtlTableName,
  setEtlName,
  setEtlSiteId,
  setEtlSiteName,
  setEtlDeviceName,
  setEtlGatewayId,
  setEtlMonthSiteIdAndName,
  setEtlMonthAndDate,
  setEtlMonthNameAndGatewayId,
  setEtlMonthDeviceName,
  setEtlMonthTimeSiteIdAndName,
  setEtlMonthTimeNameAndGatewayId,
  setEtlMonthTimeDeviceName,
  setEtlTimeMonthAndDate,
  setEtlStartAndEndTime,
} = etlDataSlice.actions;

export default etlDataSlice.reducer;
