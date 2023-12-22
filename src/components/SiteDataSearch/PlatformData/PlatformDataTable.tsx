import { Collapse, Divider } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import Icons from '@/types/upDownIcon';
import {
  setPlatformDeviceName,
  setPlatformName,
  setPlatformSiteId,
  setPlatformSiteName,
  setPlatformTableName,
} from '@/features/data/platFormSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import SelectTable from '@/components/SelectTable';
import { useSiteListQuery } from '@/features/api/siteListApi';
import OneSiteSelect from '@/components/OneSiteSelect';
import PlatformDataGrid from './PlatformDataGrid';
import SiteList from '@/types/siteList';
import { useLazyDataPlatformNamesBySiteIdQuery } from '@/features/api/dataPlatformApi';
import getRandomInteger from '@/utils/randomInteger';

type options = { label: string; description: string }[];

export default function PlatformDataTable({ downIcon, upIcon }: Icons) {
  const [platformDataOpen, setPlatformDataOpen] = useState(true);
  const [selectDevice, setSelectDevice] = useState(true);
  const [key, setKey] = useState(1);

  const dispatch = useAppDispatch();
  const siteId = useAppSelector((state) => state.platformData.platformSiteId);
  const { data: sites, isError: sitesError } = useSiteListQuery({});
  const [fetchPlatformNames, { data: platformNames, error: platformNamesError }] =
    useLazyDataPlatformNamesBySiteIdQuery();

  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const namesResult = () => {
    if ((platformNames && platformNames.length <= 0) || platformNamesError || siteId === null) {
      const noDataOption = [{ description: 'Error', label: 'No data available' }];
      return noDataOption;
    } else {
      return platformNames;
    }
  };

  const handleSelectSite = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      dispatch(setPlatformSiteId(newValue.siteId));
      dispatch(setPlatformSiteName(newValue.name));
    } else {
      dispatch(setPlatformSiteId(null));
      dispatch(setPlatformSiteName(null));
    }
  };

  const handleSelectName = (
    _event: SyntheticEvent<Element, Event>,
    newValue: options[0] | null,
  ) => {
    if (newValue) {
      dispatch(setPlatformTableName(newValue.label));
      dispatch(setPlatformName(newValue.label));
      dispatch(setPlatformDeviceName(newValue.description));
    } else {
      dispatch(setPlatformTableName(null));
      dispatch(setPlatformName(null));
      dispatch(setPlatformDeviceName(null));
    }
  };

  useEffect(() => {
    setKey(getRandomInteger());

    if (siteId !== null && siteId >= 1) {
      fetchPlatformNames(siteId);

      if ((platformNames && platformNames.length <= 0) || platformNamesError) {
        setSelectDevice(true);
      } else {
        setSelectDevice(false);
      }
    } else {
      setSelectDevice(true);
    }
  }, [siteId, fetchPlatformNames, platformNames, platformNamesError]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">搜索 DataPlatform 資料</h1>

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
          onClick={() => setPlatformDataOpen((pre) => !pre)}
        >
          {platformDataOpen ? downIcon : upIcon}
        </div>
      </div>

      <Collapse in={platformDataOpen} timeout="auto">
        <div className="w-full h-auto">
          <PlatformDataGrid />
        </div>
      </Collapse>
    </>
  );
}
