import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

import { useRawDataByGatewayIdQuery, useRawDataQuery } from '@/features/api/rawDataApi';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import DataError from '@/components/DataError';
import DataGridLoading from '@/components/DataGridLoading';
import DatabaseError from '@/components/DatabaseError';
import { useEffect, useState } from 'react';
import { setGatewayId } from '@/features/data/dataSlice';

type RawDataProps = {
  DBts: Date;
  APIts: Date;
  ZBts: Date;
  GWts: Date;
  linkQuality: number;
  ieee: string;
  clusterId: number;
  meterId: number | string;
  gatewayId: number;
  cmd: string;
  SN: string | number;
  title: string;
  devEUI: string | number;
  label: string | number;
  uId: string | number;
  deviceId: string;
  name: string | number;
  rawData: object;
};

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   {
//     field: 'DBts',
//     headerName: '資料庫時間(DBts)',
//     width: 200,
//     // type: 'dateTime',
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   params.value && new Date(params.value),
//   },
//   {
//     field: 'GWts',
//     headerName: '執行時間(GWts)',
//     width: 200,
//   },
//   {
//     field: 'gatewayId',
//     headerName: 'Gateway ID',
//     width: 130,
//   },
//   {
//     field: 'data',
//     headerName: '資料',
//     width: 200,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 2,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 3,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 4,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 5,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 6,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 7,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 8,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 9,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
//   {
//     id: 10,
//     DBts: '2023-09-23 09:26:39',
//     GWts: '2023-09-22 18:28:20',
//     gatewayId: '202',
//     data: '18030400017c1403fd',
//   },
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          utf8WithBom: true, // 需要設置 utf8，不然中文在 excel 中會是亂碼
        }}
      />
    </GridToolbarContainer>
  );
}

export default function RawDataGrid() {
  const tableName = useAppSelector((state) => state.data.tableName);
  const {
    data: rawData,
    isError: rawDataError,
    isFetching: rawDataFetching,
  } = useRawDataQuery(tableName, {
    refetchOnMountOrArgChange: true,
  });
  const [rows, setRows] = useState<RawDataProps[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const gatewayId = useAppSelector((state) => state.data.gatewayId);
  // 根據 gatewayId 獲取 rawData
  const {
    data: rawDataByGatewayId,
    isFetching: rawDataIdFetching,
    isError: rawDataIdError,
  } = useRawDataByGatewayIdQuery({ tableName, gatewayId }, { refetchOnMountOrArgChange: true });
  const dispatch = useAppDispatch();

  const handleRawDataRows = (data: RawDataProps[]) => {
    return data.map((item, index) => ({
      ...item,
      id: index,
    }));
  };

  useEffect(() => {
    dispatch(setGatewayId(null));
  }, [dispatch, tableName]);

  useEffect(() => {
    if (rawData && rawData.length > 0) {
      const rawDataColumns = Object.keys(rawData[0]).map((field) => {
        let columnWidth = 200;

        if (field === 'rawData') {
          columnWidth = 700;
        }

        return {
          field,
          headerName: field,
          minWidth: columnWidth,
          valueGetter: (params: GridRenderCellParams) => {
            const objectValue = params.value;
            if (objectValue && typeof objectValue === 'object') {
              const keys = Object.keys(objectValue);

              // 建立含有 key + value 的 string
              const keyValueStrings = keys.map((key) => {
                const value = objectValue[key];

                // 處理 value 還是 object 的情況
                if (value && typeof value === 'object') {
                  const nestedValues = Object.entries(value);

                  return `${key}: ${nestedValues}`;
                }
                return `${key}: ${value}`;
              });

              return keyValueStrings.join(', ');
            }
            return params.value;
          },
        };
      });

      let rawDataRows: RawDataProps[];

      if (rawDataByGatewayId && rawDataByGatewayId.length > 0) {
        rawDataRows = handleRawDataRows(rawDataByGatewayId);
      } else {
        rawDataRows = handleRawDataRows(rawData);
      }
      setColumns(rawDataColumns);
      setRows(rawDataRows);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [rawData, rawDataByGatewayId]);

  if (rawDataFetching || rawDataIdFetching) {
    return <DataGridLoading />;
  }

  if (columns.length <= 0 || tableName === null) {
    return <DataError />;
  }

  if (rawDataError || rawDataIdError) {
    return <DatabaseError />;
  }

  return (
    <DataGrid
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        // getRowHeight 的設定會需要動設置 column padding
        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
        // 需要設置 maxWidth 讓 scrollbar 出現
        maxWidth: '1550px',
      }}
      getRowHeight={() => 'auto'}
      autoHeight
      showCellVerticalBorder
      disableColumnMenu
      scrollbarSize={50}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20, 30, 50, 100]}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
}
