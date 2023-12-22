import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/Evercomm-Logo_white-bg1.b340cf95c7968652027b.png';
import { useEffect, useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { clearUser, setTheme } from '../features/users/userSlice';
import { enUS, jaJP, zhTW } from '@mui/x-data-grid/locales';
import { zhTW as coreZhTW, enUS as coreEnUS, jaJP as coreJaJP } from '@mui/material/locale';
import useCurrentPath from '../utils/useCurrentPath';

// import useCurrentPath from "../utils/useCurrentPath";

const drawerWidth = 240;

const dataList = [
  {
    id: 1,
    title: '首頁',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    link: '/home',
  },
  {
    id: 2,
    title: '案場 (Sites)',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    link: '/sites',
  },
  {
    id: 3,
    title: '原始資料 (rawData)',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    link: '/rawdata',
  },
  {
    id: 4,
    title: 'dataETL',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
        />
      </svg>
    ),
    link: '/dataetl',
  },
  {
    id: 5,
    title: 'dataPlatform',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
    link: '/dataplatform',
  },
];

const etlSetting = {
  id: 6,
  title: 'mgmtETL 設定',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  link: '/mgmtetl',
};

const userSetting = {
  id: 7,
  title: '帳戶設定',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  link: '/userprofile',
};

const logOut = {
  id: 8,
  title: '登出',
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  ),
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// 在第二層設置 Data grid 用的 theme，並且設置需要的的語言
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const locale = useAppSelector((state) => state.auth.theme);
  const role = useAppSelector((state) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const optionLabel = ['zhTW', 'enUS', 'jaJP'];
  // const pathName = useCurrentPath();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 根據當前 locale 選擇相應的翻譯選項
  const getLocaleTranslation = (locale: string) => {
    switch (locale) {
      case 'zhTW':
        return {
          dataGrid: zhTW,
          core: coreZhTW,
        };
      case 'enUS':
        return {
          dataGrid: enUS,
          core: coreEnUS,
        };
      case 'jaJP':
        return {
          dataGrid: jaJP,
          core: coreJaJP,
        };
      default:
        return {
          dataGrid: zhTW, // 預設使用中文
          core: coreZhTW,
        };
    }
  };

  // 使用 useMemo 避免重複創建
  // DataGrid 需要設置獨立的 theme
  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            primary: { main: '#1976d2' },
          },
        },
        getLocaleTranslation(locale).dataGrid, // DataGrid 翻譯
        getLocaleTranslation(locale).core, // Core 组件翻譯
      ),
    [locale],
  );

  const menuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
  const leftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // 將選取的 list item index 存入 localStorage
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem('selected_index', index.toString());
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    localStorage.removeItem('selected_index');
  };

  const pathName = useCurrentPath();

  useEffect(() => {
    // 在组件加载時從localStorage中獲取選中的 index
    const storedIndex = localStorage.getItem('selected_index');
    if (storedIndex) {
      setSelectedIndex(parseInt(storedIndex, 10));
    }

    if (pathName.includes('signin')) {
      setSelectedIndex(0);
    }
  }, [pathName]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-white">
            <IconButton
              // color="success"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
              className="text-black"
            >
              <div>{menuIcon}</div>
            </IconButton>

            {/* <div className="grid grid-flow-col"> */}
            {/* 目前頁面 router pathname */}
            {/* 需要換成 圖案 + 文字 */}
            {/* <div className="text-black font-semibold text-xl">{pathName}</div> */}
            {/* </div> */}

            {/* 登入身分 */}
            <div className="flex justify-center items-center h-8 w-[70px] bg-sky-400 rounded-2xl">
              <h3>
                {role === 'admin' && 'Admin'} {role === 'user' && 'User'}
              </h3>
            </div>

            {/* 語言選擇欄 */}
            <Autocomplete
              options={optionLabel}
              getOptionLabel={(key) => `${key.substring(2, 4)}`}
              size="small"
              value={locale}
              disableClearable
              // newValue 就是選擇的 option
              onChange={(_event, newValue) => {
                dispatch(setTheme(newValue));
              }}
              renderInput={(params) => <TextField {...params} fullWidth className="h-4" />}
              className="ml-auto w-[150px] mb-4"
            />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className="flex justify-end items-center">
            <div className="w-[150px] absolute left-4 top-3">
              <img src={logo} alt="evercomm logo" />
            </div>

            <IconButton onClick={handleDrawerClose}>{leftIcon}</IconButton>
          </DrawerHeader>
          <Divider />
          <List className="mx-auto">
            {dataList.map((item, index) => (
              <Link to={item.link} key={item.id}>
                <ListItem
                  key={item.id}
                  className={`hover:text-blue-500 hover:bg-sky-100 hover:shadow-md ${
                    selectedIndex === index ? 'bg-sky-200 shadow-md text-blue-600' : ''
                  }`}
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(index)}
                  >
                    <ListItemIcon className="min-w-[40px]">{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            <Link to={etlSetting.link} key={etlSetting.id}>
              <ListItem
                key={etlSetting.id}
                className={`mx-auto w-[90%] hover:text-blue-500 hover:bg-sky-200 hover:shadow-md ${
                  selectedIndex === 5 ? 'bg-sky-200 shadow-md text-blue-600' : ''
                }`}
                disablePadding
              >
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={() => handleListItemClick(5)}
                >
                  <ListItemIcon className="min-w-[40px]">{etlSetting.icon}</ListItemIcon>
                  <ListItemText primary={etlSetting.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to={userSetting.link} key={userSetting.id}>
              <ListItem
                key={userSetting.id}
                className={`mx-auto w-[90%] hover:text-blue-500 hover:bg-sky-200 hover:shadow-md ${
                  selectedIndex === 6 ? 'bg-sky-200 shadow-md text-blue-600' : ''
                }`}
                disablePadding
              >
                <ListItemButton
                  selected={selectedIndex === 6}
                  onClick={() => handleListItemClick(6)}
                >
                  <ListItemIcon className="min-w-[40px]">{userSetting.icon}</ListItemIcon>
                  <ListItemText primary={userSetting.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />

          <ListItem
            className="mt-4 mx-auto w-[90%] hover:text-blue-500 hover:bg-sky-200 hover:shadow-md"
            disablePadding
          >
            <ListItemButton onClick={() => handleLogOut()}>
              <ListItemIcon className="min-w-[40px]">{logOut.icon}</ListItemIcon>
              <ListItemText primary={logOut.title} />
            </ListItemButton>
          </ListItem>
        </Drawer>

        <Main open={open} className="bg-[#eef2f6] h-auto px-8 w-11/12">
          <DrawerHeader />
          {/* 各個頁面 */}
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
}
