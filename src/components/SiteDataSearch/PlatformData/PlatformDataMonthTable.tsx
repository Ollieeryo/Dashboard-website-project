import { Collapse, Divider } from '@mui/material';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import Icons from '@/types/upDownIcon';
import {
  setPlatformMonthAndDate,
  setPlatformMonthDeviceName,
  setPlatformMonthName,
  setPlatformMonthSiteIdAndName,
} from '@/features/data/platFormSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import SelectTable from '@/components/SelectTable';
import { useSiteListQuery } from '@/features/api/siteListApi';
import OneSiteSelect from '@/components/OneSiteSelect';
import SiteList from '@/types/siteList';
import {
  useLazyDataPlatformByMonthAndDateQuery,
  useLazyDataPlatformNamesBySiteIdQuery,
} from '@/features/api/dataPlatformApi';
import { format } from 'date-fns';
import DateRangePicker from '@/components/DateRangePicker';
import getRandomInteger from '@/utils/randomInteger';
import PlatformDataMonthGrid from './PlatformDataMonthGrid';
import DataPlatformProps from '@/types/dataPlatform';

type Options = { label: string; description: string }[];

type Data = {
  data: DataPlatformProps[];
  isError: boolean;
  isFetching: boolean;
};

const PlatformDataMonthTable = ({ downIcon, upIcon }: Icons) => {
  const [platformDataOpen, setPlatformDataOpen] = useState(true);
  const [selectDevice, setSelectDevice] = useState(true);
  const [key, setKey] = useState(1);

  const dispatch = useAppDispatch();
  const platformMonthSiteId = useAppSelector((state) => state.platformData.platformMonthSiteId);

  const { data: sites, isError: sitesError } = useSiteListQuery({});
  const [fetchPlatformNames, { data: platformNames, error: platformNamesError }] =
    useLazyDataPlatformNamesBySiteIdQuery();

  const siteId = useAppSelector((state) => state.platformData.platformMonthSiteId);
  const tableNameFrom = useAppSelector((state) => state.platformData.platformMonthFromTableName);
  const tableNameTo = useAppSelector((state) => state.platformData.platformMonthToTableName);
  const dateFrom = useAppSelector((state) => state.platformData.platformDateFrom);
  const dateTo = useAppSelector((state) => state.platformData.platformDateTo);
  const deviceName = useAppSelector((state) => state.platformData.platformMonthName);

  const [
    fetchDataByMonthAndDate,
    {
      data: dataPlatformByMonthAndDate,
      isError: dataPlatformByMonthAndDateError,
      isFetching: dataPlatformByMonthAndDateFetching,
    },
  ] = useLazyDataPlatformByMonthAndDateQuery<Data>();

  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const namesResult = () => {
    if (
      (platformNames && platformNames.length <= 0) ||
      platformNamesError ||
      platformMonthSiteId === null
    ) {
      const noDataOption = [{ description: 'Error', label: 'No data available' }];
      return noDataOption;
    } else {
      return platformNames;
    }
  };

  const handleSelectSite = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      const data = { platformMonthSiteId: newValue.siteId, platformMonthSiteName: newValue.name };
      dispatch(setPlatformMonthSiteIdAndName(data));
    } else {
      const data = { platformMonthSiteId: null, platformMonthSiteName: null };
      dispatch(setPlatformMonthSiteIdAndName(data));
    }
  };

  const handleSelectName = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Options[0] | null,
  ) => {
    if (newValue) {
      dispatch(setPlatformMonthDeviceName(newValue.description));
      dispatch(setPlatformMonthName(newValue.label));
    } else {
      dispatch(setPlatformMonthDeviceName(null));
      dispatch(setPlatformMonthName(null));
    }
  };

  const handleSelectDate = (dateFrom: Date | undefined, dateTo: Date | undefined) => {
    let platformDateFrom;
    let platformDateTo;
    let platformMonthFrom;
    let platformMonthTo;
    if (dateFrom) {
      platformDateFrom = format(dateFrom, 'yyyy-MM-dd');
      platformMonthFrom = (dateFrom.getMonth() + 1).toString().padStart(2, '0');
    }
    if (dateTo) {
      platformDateTo = format(dateTo, 'yyyy-MM-dd');
      platformMonthTo = (dateTo.getMonth() + 1).toString().padStart(2, '0');
    }

    const data = { platformDateFrom, platformDateTo, platformMonthFrom, platformMonthTo };

    dispatch(setPlatformMonthAndDate(data));
  };

  const handleDateUpdate = useCallback(() => {
    fetchDataByMonthAndDate({ tableNameFrom, tableNameTo, siteId, deviceName, dateFrom, dateTo });
  }, [fetchDataByMonthAndDate, tableNameFrom, tableNameTo, siteId, deviceName, dateFrom, dateTo]);

  useEffect(() => {
    setKey(getRandomInteger());

    if (platformMonthSiteId !== null && platformMonthSiteId >= 1) {
      fetchPlatformNames(platformMonthSiteId);

      if ((platformNames && platformNames.length <= 0) || platformNamesError) {
        setSelectDevice(true);
      } else {
        setSelectDevice(false);
      }
    } else {
      setSelectDevice(true);
    }
  }, [fetchPlatformNames, platformMonthSiteId, platformNames, platformNamesError]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">月份日期資料</h1>

      <Divider />

      <div className="mt-8 mb-4 flex">
        <OneSiteSelect label="選擇案場" site={sitesResult()} handleSelect={handleSelectSite} />

        <SelectTable
          label="選擇來源"
          placeholder="來源"
          options={namesResult()}
          handleSelect={handleSelectName}
          disable={selectDevice}
          key={key}
        />

        <DateRangePicker handleSelectDate={handleSelectDate} handleDateUpdate={handleDateUpdate} />
      </div>

      <div className="flex items-center mb-4">
        <h3 className="font-bold text-lg mr-4">資料結果</h3>
        <div
          className="hover:bg-slate-200 rounded-full"
          onClick={() => setPlatformDataOpen((pre) => !pre)}
        >
          {platformDataOpen ? downIcon : upIcon}
        </div>
      </div>

      <Collapse in={platformDataOpen} timeout="auto">
        <div className="w-full h-auto">
          <PlatformDataMonthGrid
            data={dataPlatformByMonthAndDate}
            isFetching={dataPlatformByMonthAndDateFetching}
            isError={dataPlatformByMonthAndDateError}
          />
        </div>
      </Collapse>
    </>
  );
};

export default PlatformDataMonthTable;
