import { Collapse, Divider } from '@mui/material';
import SelectTable from '@/components/SelectTable';
import { SyntheticEvent, useState } from 'react';
import Icons from '@/types/upDownIcon';
import { useRawDataTableGatewayIdQuery, useRawDataTablesQuery } from '@/features/api/rawDataApi';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import SelectGatewayId from '@/components/SelectGatewayId';
import { setGatewayId, setRawTableName } from '@/features/data/dataSlice';
import RawDataGrid from './RawDataGrid';

type Option = {
  options: { label: string }[];
  gatewayIdOptions: { label: string | number }[];
};

export default function RawDataTable({ downIcon, upIcon }: Icons) {
  const [rawDataOpen, setRawDataOpen] = useState(true);
  const dispatch = useAppDispatch();
  const { data: tables, isError: tablesError } = useRawDataTablesQuery({});
  const tableName = useAppSelector((state) => state.data.tableName);

  const { data: gatewayIds, isError: gatewayIdError } = useRawDataTableGatewayIdQuery(tableName, {
    refetchOnMountOrArgChange: true,
  });

  const noDataOption = [{ label: 'No data available' }];

  // handle tables api error
  const tablesResult = () => {
    if ((tables && tables.length <= 0) || tablesError) {
      return noDataOption;
    } else {
      return tables;
    }
  };

  // handle gatewayId api error
  const gatewayIdResult = () => {
    if ((gatewayIds && gatewayIds.length <= 0) || gatewayIdError) {
      return noDataOption;
    } else {
      return gatewayIds;
    }
  };

  const handleSelectTable = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Option['options'][0] | null,
  ) => {
    if (newValue) {
      dispatch(setRawTableName(newValue.label));
    } else {
      dispatch(setRawTableName(null));
    }
  };

  const handleSelectGatewayId = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Option['gatewayIdOptions'][0] | null,
  ) => {
    if (newValue) {
      dispatch(setGatewayId(newValue.label));
    } else {
      dispatch(setGatewayId(null));
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">搜索 RawData 資料</h1>

      <Divider />

      <div className="mt-8 mb-4 flex">
        <SelectTable
          label="選擇 API 來源"
          placeholder="來源"
          options={tablesResult()}
          handleSelect={handleSelectTable}
          key={0}
          disable={false}
        />
        <SelectGatewayId
          label="選擇 Gateway Id"
          placeholder="Gateway Id"
          options={gatewayIdResult()}
          handleSelect={handleSelectGatewayId}
        />
      </div>

      <div className="flex items-center mb-4">
        <h3 className="font-bold text-lg mr-4">原始資料 (rawData)</h3>
        <div
          className="hover:bg-slate-200 rounded-full"
          onClick={() => setRawDataOpen((pre) => !pre)}
        >
          {rawDataOpen ? downIcon : upIcon}
        </div>
      </div>

      <Collapse in={rawDataOpen} timeout="auto">
        <RawDataGrid />
      </Collapse>
    </>
  );
}
