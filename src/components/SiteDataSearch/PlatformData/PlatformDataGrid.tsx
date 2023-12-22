import { GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '@/store/hook';
import { useDataPlatformBySiteIdAndNameQuery } from '@/features/api/dataPlatformApi';
import { useEffect, useState } from 'react';
import DataGridLoading from '../../DataGridLoading';
import DataError from '@/components/DataError';
import DatabaseError from '@/components/DatabaseError';

import Alert from '@mui/material/Alert';
import DataGridComponent from '@/components/DataGridComponent';
import DataGridToolbar from '@/components/DataGridToolbar';
import DataPlatformProps from '@/types/dataPlatform';

const PlatformDataGrid = () => {
  const tableName = useAppSelector((state) => state.platformData.platformTableName);
  const siteId = useAppSelector((state) => state.platformData.platformSiteId);
  const platformName = useAppSelector((state) => state.platformData.platformName);

  const [rows, setRows] = useState<DataPlatformProps[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const siteName = useAppSelector((state) => state.platformData.platformSiteName);
  const deviceName = useAppSelector((state) => state.platformData.platformDeviceName);

  const {
    data: dataPlatformBySiteIdAndName,
    isFetching: dataPlatformBySiteIdAndNameFetching,
    isError: dataPlatformBySiteIdAndNameError,
  } = useDataPlatformBySiteIdAndNameQuery(
    { tableName, siteId, platformName },
    { refetchOnMountOrArgChange: true },
  );

  const handleDataPlatformRows = (data: DataPlatformProps[]) => {
    return data.map((item, index) => ({
      ...item,
      ts: item.ts.toString().replace(/T|Z|\.\d{3}/g, ' '),
      id: index,
    }));
  };

  useEffect(() => {
    if (dataPlatformBySiteIdAndName && dataPlatformBySiteIdAndName.length > 0) {
      const dataPlatformColumns = Object.keys(dataPlatformBySiteIdAndName[0]).map((field) => {
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

      const dataPlatformRows = handleDataPlatformRows(dataPlatformBySiteIdAndName);

      setColumns(dataPlatformColumns);
      setRows(dataPlatformRows);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [dataPlatformBySiteIdAndName]);

  if (dataPlatformBySiteIdAndNameFetching) {
    return <DataGridLoading />;
  }

  if (columns.length <= 0 || rows.length <= 0 || tableName === null) {
    return <DataError />;
  }

  if (dataPlatformBySiteIdAndNameError) {
    return <DatabaseError />;
  }

  return (
    <>
      {/* 可考慮刪除這段，因為會先進入到 DataError */}
      {platformName && dataPlatformBySiteIdAndName.length <= 0 && (
        <div>
          <Alert severity="error">
            <strong>
              Data not found : {siteId} - {siteName} - {deviceName}
            </strong>
          </Alert>
        </div>
      )}

      <DataGridComponent
        rows={rows}
        columns={columns}
        customToolbar={() => <DataGridToolbar fileName={`${siteId}-${siteName}-${deviceName}`} />}
      />
    </>
  );
};

export default PlatformDataGrid;
