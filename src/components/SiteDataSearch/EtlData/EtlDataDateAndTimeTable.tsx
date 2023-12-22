import { Collapse, Divider } from '@mui/material';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import Icons from '@/types/upDownIcon';
import SelectTable from '@/components/SelectTable';
import {
  useLazyDataEtlByMonthAndDateQuery,
  useLazyDataEtlNamesBySiteIdQuery,
} from '@/features/api/dataEtlApi';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  setEtlMonthTimeDeviceName,
  setEtlMonthTimeNameAndGatewayId,
  setEtlMonthTimeSiteIdAndName,
  setEtlTimeMonthAndDate,
} from '@/features/data/etlDataSlice';
import OneSiteSelect from '@/components/OneSiteSelect';
import { useSiteListQuery } from '@/features/api/siteListApi';
import SiteList from '@/types/siteList';
import { format } from 'date-fns';
import getRandomInteger from '@/utils/randomInteger';
import DataEtlProps from '@/types/dataEtl';
import EtlDataMonthGrid from './EtlDataMonthGrid';
import DatePicker from '@/components/DatePicker';
import TimeRangePicker from '@/components/TimeRangePicker';
import { Button } from '@/components/ui/button';
import dayjs, { Dayjs } from 'dayjs';

type Options = { label: string; gatewayId: number; description: string }[];

type Data = {
  data: DataEtlProps[];
  isError: boolean;
  isFetching: boolean;
};

const EtlDataDateAndTimeTable = ({ downIcon, upIcon }: Icons) => {
  const [etlDataOpen, setEtlDataOpen] = useState(true);
  const [selectDevice, setSelectDevice] = useState(true);
  const [key, setKey] = useState(1);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(1, 'hour'));

  const dispatch = useAppDispatch();

  const etlMonthTimeSiteId = useAppSelector((state) => state.etlData.etlMonthTimeSiteId);
  const tableName = useAppSelector((state) => state.etlData.etlMonthTimeTableName);
  const gatewayId = useAppSelector((state) => state.etlData.etlMonthTimeGatewayId);
  const deviceName = useAppSelector((state) => state.etlData.etlMonthTimeName);
  const date = useAppSelector((state) => state.etlData.etlTimeDate);
  const timeFrom = useAppSelector((state) => state.etlData.etlStartTime);
  const timeEnd = useAppSelector((state) => state.etlData.etlEndTime);

  const { data: sites, isError: sitesError } = useSiteListQuery({});

  const [fetchEtlNames, { data: etlNames, error: etlNamesError }] =
    useLazyDataEtlNamesBySiteIdQuery();

  // 使用日期 + 時間 API 取得資料

  // date data
  // const [
  //   fetchDataByMonthAndDate,
  //   {
  //     data: dataEtlByMonthAndDate,
  //     isError: dataEtlByMonthAndDateError,
  //     isFetching: dataEtlByMonthAndDateFetching,
  //   },
  // ] = useLazyDataEtlByMonthAndDateQuery<Data>();

  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const namesResult = () => {
    if ((etlNames && etlNames.length <= 0) || etlNamesError || etlMonthTimeSiteId === null) {
      const noDataOption = [{ description: 'Error', label: 'No data available' }];
      return noDataOption;
    } else {
      return etlNames;
    }
  };

  const handleSelectSite = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      const data = { etlMonthTimeSiteId: newValue.siteId, etlMonthTimeSiteName: newValue.name };
      dispatch(setEtlMonthTimeSiteIdAndName(data));
    } else {
      const data = { etlMonthTimeSiteId: null, etlMonthTimeSiteName: null };
      dispatch(setEtlMonthTimeSiteIdAndName(data));
    }
  };

  const handleSelectName = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Options[0] | null,
  ) => {
    if (newValue) {
      dispatch(setEtlMonthTimeDeviceName(newValue.description));

      const data = {
        etlMonthTimeName: newValue.label,
        etlMonthTimeGatewayId: newValue.gatewayId,
      };
      dispatch(setEtlMonthTimeNameAndGatewayId(data));
    } else {
      dispatch(setEtlMonthTimeDeviceName(null));
      const data = {
        etlMonthTimeName: null,
        etlMonthTimeGatewayId: null,
      };
      dispatch(setEtlMonthTimeNameAndGatewayId(data));
    }
  };

  const handleSelectDate = (date: Date | undefined) => {
    let etlTimeDate;
    let etlTimeMonth;
    if (date) {
      etlTimeDate = format(date, 'yyyy-MM-dd');
      etlTimeMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    }

    const data = { etlTimeDate, etlTimeMonth };
    dispatch(setEtlTimeMonthAndDate(data));
  };

  // const handleDateUpdate = useCallback(() => {
  //   fetchDataByMonthAndDate({
  //     tableNameFrom,
  //     tableNameTo,
  //     gatewayId,
  //     deviceName,
  //     dateFrom,
  //     dateTo,
  //   });
  // }, [
  //   fetchDataByMonthAndDate,
  //   tableNameFrom,
  //   tableNameTo,
  //   gatewayId,
  //   deviceName,
  //   dateFrom,
  //   dateTo,
  // ]);

  useEffect(() => {
    setKey(getRandomInteger());

    if (etlMonthTimeSiteId !== null && etlMonthTimeSiteId >= 1) {
      fetchEtlNames(etlMonthTimeSiteId);

      if ((etlNames && etlNames.length <= 0) || etlNamesError) {
        setSelectDevice(true);
      } else {
        setSelectDevice(false);
      }
    } else {
      setSelectDevice(true);
    }
  }, [etlMonthTimeSiteId, etlNames, etlNamesError, fetchEtlNames]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">單日區間資料</h1>

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

        <DatePicker handleSelectDate={handleSelectDate} />

        <TimeRangePicker
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      </div>

      {/* search data API 需要傳遞 handleClick*/}
      <div className="mb-4">
        <Button>Search Data</Button>
      </div>

      <div className="flex items-center mb-4">
        <h3 className="font-bold text-lg mr-4">資料結果</h3>
        <div
          className="hover:bg-slate-200 rounded-full"
          onClick={() => setEtlDataOpen((pre) => !pre)}
        >
          {etlDataOpen ? downIcon : upIcon}
        </div>
      </div>

      <Collapse in={etlDataOpen} timeout="auto">
        {/* <EtlDataMonthGrid
        data={dataEtlByMonthAndDate}
        isFetching={dataEtlByMonthAndDateFetching}
        isError={dataEtlByMonthAndDateError}
        /> */}
      </Collapse>
    </>
  );
};

export default EtlDataDateAndTimeTable;
