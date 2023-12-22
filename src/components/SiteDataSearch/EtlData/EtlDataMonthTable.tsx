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
  setEtlMonthAndDate,
  setEtlMonthDeviceName,
  setEtlMonthNameAndGatewayId,
  setEtlMonthSiteIdAndName,
} from '@/features/data/etlDataSlice';
import OneSiteSelect from '@/components/OneSiteSelect';
import { useSiteListQuery } from '@/features/api/siteListApi';
import SiteList from '@/types/siteList';
import DateRangePicker from '@/components/DateRangePicker';
import { format } from 'date-fns';
import getRandomInteger from '@/utils/randomInteger';
import DataEtlProps from '@/types/dataEtl';
import EtlDataMonthGrid from './EtlDataMonthGrid';

type Options = { label: string; gatewayId: number; description: string }[];

type Data = {
  data: DataEtlProps[];
  isError: boolean;
  isFetching: boolean;
};

const EtlDataMonthTable = ({ downIcon, upIcon }: Icons) => {
  const [etlDataOpen, setEtlDataOpen] = useState(true);
  const [selectDevice, setSelectDevice] = useState(true);
  const [key, setKey] = useState(1);

  const dispatch = useAppDispatch();

  const etlMonthSiteId = useAppSelector((state) => state.etlData.etlMonthSiteId);
  const tableNameFrom = useAppSelector((state) => state.etlData.etlMonthFromTableName);
  const tableNameTo = useAppSelector((state) => state.etlData.etlMonthToTableName);
  const gatewayId = useAppSelector((state) => state.etlData.etlMonthGatewayId);
  const deviceName = useAppSelector((state) => state.etlData.etlMonthName);
  const dateFrom = useAppSelector((state) => state.etlData.etlDateFrom);
  const dateTo = useAppSelector((state) => state.etlData.etlDateTo);

  const { data: sites, isError: sitesError } = useSiteListQuery({});

  const [fetchEtlNames, { data: etlNames, error: etlNamesError }] =
    useLazyDataEtlNamesBySiteIdQuery();

  // date data
  const [
    fetchDataByMonthAndDate,
    {
      data: dataEtlByMonthAndDate,
      isError: dataEtlByMonthAndDateError,
      isFetching: dataEtlByMonthAndDateFetching,
    },
  ] = useLazyDataEtlByMonthAndDateQuery<Data>();

  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const namesResult = () => {
    if ((etlNames && etlNames.length <= 0) || etlNamesError || etlMonthSiteId === null) {
      const noDataOption = [{ description: 'Error', label: 'No data available' }];
      return noDataOption;
    } else {
      return etlNames;
    }
  };

  const handleSelectSite = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      const data = { etlMonthSiteId: newValue.siteId, etlMonthSiteName: newValue.name };
      dispatch(setEtlMonthSiteIdAndName(data));
    } else {
      const data = { etlMonthSiteId: null, etlMonthSiteName: null };
      dispatch(setEtlMonthSiteIdAndName(data));
    }
  };

  const handleSelectName = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Options[0] | null,
  ) => {
    if (newValue) {
      dispatch(setEtlMonthDeviceName(newValue.description));

      const data = {
        etlMonthName: newValue.label,
        etlMonthGatewayId: newValue.gatewayId,
      };
      dispatch(setEtlMonthNameAndGatewayId(data));
    } else {
      dispatch(setEtlMonthDeviceName(null));
      const data = {
        etlMonthName: null,
        etlMonthGatewayId: null,
      };
      dispatch(setEtlMonthNameAndGatewayId(data));
    }
  };

  const handleSelectDate = (dateFrom: Date | undefined, dateTo: Date | undefined) => {
    let etlDateFrom;
    let etlDateTo;
    let etlMonthFrom;
    let etlMonthTo;
    if (dateFrom) {
      etlDateFrom = format(dateFrom, 'yyyy-MM-dd');
      etlMonthFrom = (dateFrom.getMonth() + 1).toString().padStart(2, '0');
    }
    if (dateTo) {
      etlDateTo = format(dateTo, 'yyyy-MM-dd');
      etlMonthTo = (dateTo.getMonth() + 1).toString().padStart(2, '0');
    }

    const data = { etlDateFrom, etlDateTo, etlMonthFrom, etlMonthTo };

    dispatch(setEtlMonthAndDate(data));
  };

  const handleDateUpdate = useCallback(() => {
    fetchDataByMonthAndDate({
      tableNameFrom,
      tableNameTo,
      gatewayId,
      deviceName,
      dateFrom,
      dateTo,
    });
  }, [
    fetchDataByMonthAndDate,
    tableNameFrom,
    tableNameTo,
    gatewayId,
    deviceName,
    dateFrom,
    dateTo,
  ]);

  useEffect(() => {
    setKey(getRandomInteger());

    if (etlMonthSiteId !== null && etlMonthSiteId >= 1) {
      fetchEtlNames(etlMonthSiteId);

      if ((etlNames && etlNames.length <= 0) || etlNamesError) {
        setSelectDevice(true);
      } else {
        setSelectDevice(false);
      }
    } else {
      setSelectDevice(true);
    }
  }, [etlMonthSiteId, etlNames, etlNamesError, fetchEtlNames]);
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
          onClick={() => setEtlDataOpen((pre) => !pre)}
        >
          {etlDataOpen ? downIcon : upIcon}
        </div>
      </div>

      <Collapse in={etlDataOpen} timeout="auto">
        <EtlDataMonthGrid
          data={dataEtlByMonthAndDate}
          isFetching={dataEtlByMonthAndDateFetching}
          isError={dataEtlByMonthAndDateError}
        />
      </Collapse>
    </>
  );
};

export default EtlDataMonthTable;
