import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type Data = {
  tableName: string | null;
  gatewayId: number | string | null;
  platformTableName: string | null;
  platformName: string | null;
  platformSiteId: number | null;
  platformSiteName: string | null;
  platformDeviceName: string | null;
};

const rawDataSlice = createSlice({
  name: 'data',
  initialState: <Data>{
    tableName: null,
    gatewayId: null,
    platformTableName: null,
    platformName: null,
    platformSiteId: null,
    platformSiteName: null,
    platformDeviceName: null,
  },

  reducers: {
    setRawTableName: (state, action: PayloadAction<Data['tableName']>) => {
      state.tableName = action.payload;
    },
    setGatewayId: (state, action: PayloadAction<Data['gatewayId']>) => {
      state.gatewayId = action.payload;
    },

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
  },
});

export const {
  setRawTableName,
  setGatewayId,
  setPlatformTableName,
  setPlatformName,
  setPlatformSiteId,
  setPlatformSiteName,
  setPlatformDeviceName,
} = rawDataSlice.actions;

export default rawDataSlice.reducer;
