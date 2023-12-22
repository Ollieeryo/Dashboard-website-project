import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

// Define a type for the slice state
type UserState = {
  user: {
    userId: number;
    role: string;
    email: string;
    token: string;
  };
  login: boolean;
  theme: string;
};

// rtk 的 state 控制基本都是透過選擇 key/value 來做變化
const authSlice = createSlice({
  name: 'auth',
  initialState: <UserState>{
    user: {},
    login: false,
    theme: 'zhTW',
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      // state 就是 initialState，藉由 state. 可以獲取相對應的 key/value
      // action.payload = res = 外部傳遞進來的資料，例如: 外部傳遞 res，這裡可選擇接收多少資料 : ex. action.payload.id
      state.user = action.payload;
      console.log(state.user);

      if (state.user) {
        state.login = true;
      }
    },
    clearUser: (state) => {
      state.user = {
        userId: 0,
        role: '',
        email: '',
        token: '',
      };
      state.login = false;
    },
    setTheme: (state, action: PayloadAction<UserState['theme']>) => {
      state.theme = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload as boolean;
    },
  },
});

export const { setUser, clearUser, setTheme, setLogin } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
