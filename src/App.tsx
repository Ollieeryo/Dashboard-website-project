import './App.css';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './store/hook';
import { useNavigate } from 'react-router-dom';
import { useVerifyTokenQuery } from './features/api/authApi';
import { setLogin } from './features/users/userSlice';
import useCurrentPath from './utils/useCurrentPath';

type SupportedLocales = string;

interface SupportedLocalesObject {
  [key: string]: locales.Localization;
}

// 語言處理，改為三種
const supportedLocales: SupportedLocalesObject = {
  zhTW: locales['zhTW'],
  enUS: locales['enUS'],
  jaJP: locales['jaJP'],
};

// 在最高層 App 設置多語言選項的 theme，根據 Sidebar 的 select 選擇的語言 locale 來改變 themeWithLocale
function App() {
  const theme = useTheme();
  const locale: SupportedLocales = useAppSelector((state) => state.auth.theme);
  const themeWithLocale = useMemo(
    () => createTheme(theme, supportedLocales[locale]),
    [locale, theme],
  );
  const loginStatus = useAppSelector((state) => state.auth.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.user.token);
  const { isError: notLoggedIn } = useVerifyTokenQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const pathName = useCurrentPath();

  useEffect(() => {
    if (loginStatus) {
      if (pathName === '/signin' || pathName === '/') {
        navigate('/home');
      }
    }

    if (notLoggedIn) {
      dispatch(setLogin(false));
      navigate('/signin');
    }
  }, [dispatch, notLoggedIn, loginStatus, navigate, pathName]);

  return (
    <ThemeProvider theme={themeWithLocale}>
      <div className="w-full h-full">{loginStatus ? <Sidebar /> : <SignIn />}</div>
    </ThemeProvider>
  );
}

export default App;
