import { Collapse, Divider } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import Icons from '@/types/upDownIcon';
import SelectTable from '@/components/SelectTable';
import { useLazyDataEtlNamesBySiteIdQuery } from '@/features/api/dataEtlApi';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  setEtlDeviceName,
  setEtlGatewayId,
  setEtlName,
  setEtlSiteId,
  setEtlSiteName,
  setEtlTableName,
} from '@/features/data/etlDataSlice';
import EtlDataGrid from './EtlDataGrid';
import OneSiteSelect from '@/components/OneSiteSelect';
import { useSiteListQuery } from '@/features/api/siteListApi';
import SiteList from '@/types/siteList';
import getRandomInteger from '@/utils/randomInteger';

type options = { label: string; gatewayId: number; description: string }[];

export default function EtlDataTable({ downIcon, upIcon }: Icons) {
  const [etlDataOpen, setEtlDataOpen] = useState(true);
  const [selectDevice, setSelectDevice] = useState(true);
  const [key, setKey] = useState(1);

  const dispatch = useAppDispatch();

  const { data: sites, isError: sitesError } = useSiteListQuery({});

  const etlSiteId = useAppSelector((state) => state.etlData.etlSiteId);

  const [fetchEtlNames, { data: etlNames, error: etlNamesError }] =
    useLazyDataEtlNamesBySiteIdQuery();

  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const namesResult = () => {
    if ((etlNames && etlNames.length <= 0) || etlNamesError || etlSiteId === null) {
      const noDataOption = [{ description: 'Error', label: 'No data available' }];
      return noDataOption;
    } else {
      return etlNames;
    }
  };

  const handleSelectSite = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      dispatch(setEtlSiteId(newValue.siteId));
      dispatch(setEtlSiteName(newValue.name));
    } else {
      dispatch(setEtlSiteId(null));
      dispatch(setEtlSiteName(null));
    }
  };

  const handleSelectName = (
    _event: SyntheticEvent<Element, Event>,
    newValue: options[0] | null,
  ) => {
    if (newValue) {
      dispatch(setEtlTableName(newValue.label));
      dispatch(setEtlGatewayId(newValue.gatewayId));
      dispatch(setEtlName(newValue.label));
      dispatch(setEtlDeviceName(newValue.description));
    } else {
      dispatch(setEtlTableName(null));
      dispatch(setEtlGatewayId(null));
      dispatch(setEtlName(null));
      dispatch(setEtlDeviceName(null));
    }
  };

  // 使用 useEffect 確保 etlSiteId 更新後再調用 fetchEtlNames
  useEffect(() => {
    setKey(getRandomInteger());

    if (etlSiteId !== null && etlSiteId >= 1) {
      fetchEtlNames(etlSiteId);

      if ((etlNames && etlNames.length <= 0) || etlNamesError) {
        setSelectDevice(true);
      } else {
        setSelectDevice(false);
      }
    } else {
      setSelectDevice(true);
    }
  }, [etlNames, etlNamesError, etlSiteId, fetchEtlNames]);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">搜索 DataETL 資料</h1>

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
        <EtlDataGrid />
      </Collapse>
    </>
  );
}
