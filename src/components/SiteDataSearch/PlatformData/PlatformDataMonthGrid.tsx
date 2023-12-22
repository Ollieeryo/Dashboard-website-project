import { GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '@/store/hook';
import { useEffect, useState } from 'react';
import DataGridLoading from '../../DataGridLoading';
import DataError from '@/components/DataError';
import DatabaseError from '@/components/DatabaseError';
import DataGridComponent from '@/components/DataGridComponent';
import DataGridToolbar from '@/components/DataGridToolbar';
import DataPlatformProps from '@/types/dataPlatform';

type Props = {
  data: DataPlatformProps[];
  isError: boolean;
  isFetching: boolean;
};

const PlatformDataMonthGrid = <T extends Props>({ data, isFetching, isError }: T) => {
  const tableName = useAppSelector((state) => state.platformData.platformMonthName);
  const siteId = useAppSelector((state) => state.platformData.platformMonthSiteId);
  const siteName = useAppSelector((state) => state.platformData.platformMonthSiteName);
  const deviceName = useAppSelector((state) => state.platformData.platformMonthDeviceName);

  const [rows, setRows] = useState<DataPlatformProps[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const handleDataPlatformRows = (data: DataPlatformProps[]) => {
    return data.map((item, index) => ({
      ...item,
      ts: item.ts.toString().replace(/T|Z|\.\d{3}/g, ' '),

      id: index,
    }));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const dataPlatformColumns = Object.keys(data[0]).map((field) => {
        let columnWidth = 150;

        if (field === 'ts' || field === 'flowRate') {
          columnWidth = 200;
        }

        if (field === 'powerConsumed' || field === 'temp') {
          columnWidth = 250;
        }

        return {
          field,
          headerName: field,
          minWidth: columnWidth,
        };
      });

      const dataPlatformRows = handleDataPlatformRows(data);

      setColumns(dataPlatformColumns);
      setRows(dataPlatformRows);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [data]);

  if (isFetching) {
    return <DataGridLoading />;
  }

  if (columns.length <= 0 || rows.length <= 0 || tableName === null) {
    return <DataError />;
  }

  if (isError) {
    return <DatabaseError />;
  }

  return (
    <DataGridComponent
      rows={rows}
      columns={columns}
      customToolbar={() => <DataGridToolbar fileName={`${siteId}-${siteName}-${deviceName}`} />}
    />
  );
};

export default PlatformDataMonthGrid;
