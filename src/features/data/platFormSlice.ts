import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type Data = {
  platformTableName: string | null;
  platformName: string | null;
  platformSiteId: number | null;
  platformSiteName: string | null;
  platformDeviceName: string | null;
  platformMonthSiteId: number | null;
  platformMonthSiteName: string | null;
  platformMonthName: string | null;
  platformMonthDeviceName: string | null;
  platformMonthFrom: string | undefined;
  platformMonthTo: string | undefined;
  platformDateFrom: string | undefined;
  platformDateTo: string | undefined;
  platformMonthFromTableName: string | null;
  platformMonthToTableName: string | null;
};

const platformDataSlice = createSlice({
  name: 'platFromData',
  initialState: <Data>{
    platformTableName: null,
    platformName: null,
    platformSiteId: null,
    platformSiteName: null,
    platformDeviceName: null,
    platformMonthSiteId: null,
    platformMonthSiteName: null,
    platformMonthName: null,
    platformMonthDeviceName: null,
    platformMonthFrom: undefined,
    platformMonthTo: undefined,
    platformDateFrom: undefined,
    platformDateTo: undefined,
    platformMonthFromTableName: null,
    platformMonthToTableName: null,
  },

  reducers: {
    setPlatformTableName: (state, action: PayloadAction<Data['platformTableName']>) => {
      const hashIndex = action.payload?.indexOf('#');
      const tableName = action.payload?.substring(0, hashIndex) as string;
      state.platformTableName = tableName;
    },
    setPlatformName: (state, action: PayloadAction<Data['platformName']>) => {
      state.platformName = encodeURIComponent(action.payload || '');
    },
    setPlatformSiteId: (state, action: PayloadAction<Data['platformSiteId']>) => {
      state.platformSiteId = action.payload;
    },
    setPlatformSiteName: (state, action: PayloadAction<Data['platformSiteName']>) => {
      state.platformSiteName = action.payload;
    },
    setPlatformDeviceName: (state, action: PayloadAction<Data['platformDeviceName']>) => {
      state.platformDeviceName = action.payload;
    },

    //month
    setPlatformMonthSiteIdAndName: (
      state,
      action: PayloadAction<Pick<Data, 'platformMonthSiteId' | 'platformMonthSiteName'>>,
    ) => {
      const { platformMonthSiteId, platformMonthSiteName } = action.payload;
      state.platformMonthSiteId = platformMonthSiteId;
      state.platformMonthSiteName = platformMonthSiteName;
    },
    setPlatformMonthName: (state, action: PayloadAction<Data['platformMonthName']>) => {
      state.platformMonthName = encodeURIComponent(action.payload ?? '');
    },
    setPlatformMonthDeviceName: (state, action: PayloadAction<Data['platformMonthDeviceName']>) => {
      state.platformMonthDeviceName = action.payload;
    },
    setPlatformMonthAndDate: (
      state,
      action: PayloadAction<
        Pick<Data, 'platformMonthFrom' | 'platformMonthTo' | 'platformDateFrom' | 'platformDateTo'>
      >,
    ) => {
      const { platformMonthFrom, platformMonthTo, platformDateFrom, platformDateTo } =
        action.payload;
      state.platformMonthFrom = platformMonthFrom;
      state.platformMonthTo = platformMonthTo ? platformMonthTo : platformMonthFrom;
      state.platformDateFrom = platformDateFrom;
      state.platformDateTo = platformDateTo;

      const platformMonthName = decodeURIComponent(state.platformMonthName ?? '');
      const hashIndex = platformMonthName.indexOf('#');
      const tableName = `${platformMonthName.substring(0, hashIndex)}`;
      const MonthFromTableName = `${tableName}_${state.platformMonthFrom}`;
      const MonthToTableName = `${tableName}_${state.platformMonthTo}`;

      state.platformMonthFromTableName = MonthFromTableName;
      state.platformMonthToTableName = MonthToTableName;
    },
  },
});

export const {
  setPlatformTableName,
  setPlatformName,
  setPlatformSiteId,
  setPlatformSiteName,
  setPlatformDeviceName,
  setPlatformMonthSiteIdAndName,
  setPlatformMonthName,
  setPlatformMonthDeviceName,
  setPlatformMonthAndDate,
} = platformDataSlice.actions;

export default platformDataSlice.reducer;
