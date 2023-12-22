import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDataEtlByGatewayIdAndNameQuery } from '@/features/api/dataEtlApi';
import { useAppSelector } from '@/store/hook';
import DataGridLoading from '@/components/DataGridLoading';
import DataError from '@/components//DataError';
import DatabaseError from '@/components/DatabaseError';
import DataGridComponent from '@/components/DataGridComponent';
import DataGridToolbar from '@/components/DataGridToolbar';
import DataEtlProps from '@/types/dataEtl';

export default function EtlDataGrid() {
  const tableName = useAppSelector((state) => state.etlData.etlTableName);
  const gatewayId = useAppSelector((state) => state.etlData.etlGatewayId);
  const etlName = useAppSelector((state) => state.etlData.etlName);
  const etlSiteId = useAppSelector((state) => state.etlData.etlSiteId);
  const etlSiteName = useAppSelector((state) => state.etlData.etlSiteName);
  const etlDeviceName = useAppSelector((state) => state.etlData.etlDeviceName);
  const [rows, setRows] = useState<DataEtlProps[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const {
    data: dataEtlByGatewayIdAndName,
    isFetching: dataEtlByGatewayIdFetching,
    isError: dataEtlByGatewayIdError,
  } = useDataEtlByGatewayIdAndNameQuery(
    { tableName, gatewayId, etlName },
    { refetchOnMountOrArgChange: true },
  );

  // handle data change
  const handleDataEtlRows = (data: DataEtlProps[]) => {
    return data.map((item, index) => ({
      ...item,
      ts: item.ts.toString().replace(/T|Z|\.\d{3}/g, ' '),
      id: index,
    }));
  };

  useEffect(() => {
    if (dataEtlByGatewayIdAndName && dataEtlByGatewayIdAndName.length > 0) {
      const dataEtlColumns = Object.keys(dataEtlByGatewayIdAndName[0]).map((field) => {
        const columnWidth = field === 'ts' || field === 'flowRate' ? 200 : 150;

        return {
          field,
          headerName: field,
          minWidth: columnWidth,
        };
      });

      const dataEtlRows = handleDataEtlRows(dataEtlByGatewayIdAndName);

      setColumns(dataEtlColumns);
      setRows(dataEtlRows);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [dataEtlByGatewayIdAndName]);

  if (dataEtlByGatewayIdFetching) {
    return <DataGridLoading />;
  }

  if (columns.length <= 0 || rows.length <= 0 || tableName === null) {
    return <DataError />;
  }

  if (dataEtlByGatewayIdError) {
    return <DatabaseError />;
  }

  return (
    <DataGridComponent
      rows={rows}
      columns={columns}
      customToolbar={() => (
        <DataGridToolbar fileName={`${etlSiteId}-${etlSiteName}-${etlDeviceName}`} />
      )}
    />
  );
}
