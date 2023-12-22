import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type SiteState = {
  siteId: number | null;
};

// rtk 的 state 控制基本都是透過選擇 key/value 來做變化
const siteSlice = createSlice({
  name: 'site',
  initialState: <SiteState>{
    siteId: null,
  },

  reducers: {
    setSiteID: (state, action: PayloadAction<SiteState['siteId']>) => {
      state.siteId = action.payload;
    },
  },
});

export const { setSiteID } = siteSlice.actions;

export default siteSlice.reducer;
