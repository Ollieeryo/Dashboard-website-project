import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { SyntheticEvent, useEffect, useState } from 'react';
import OneSiteSelect from '../OneSiteSelect';
import AddModal from '../SiteList/AddModal';
import DeleteModal from '../SiteList/DeleteModal';
import { useDeviceListQuery, useSiteListQuery } from '../../features/api/siteListApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import DataError from '../DataError';
import DataGridLoading from '../DataGridLoading';
import { setSiteID } from '../../features/sites/siteSlice';

// 要使用 export 功能需要使用 GridToolbarExport，但是不支持 excel檔名(需要升級成 pro)
// 把這個 function 放入 DataGrid 的 slots
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

const columns: GridColDef[] = [
  { field: 'siteId', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'Name',
    width: 130,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerClassName: 'Description',
    width: 200,
  },
  {
    field: 'id',
    headerName: 'DeviceId',
    headerClassName: 'DeviceId',
    width: 130,
  },
  {
    field: 'deviceType',
    headerName: 'DeviceType',
    headerClassName: 'DeviceType',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'deviceLogic',
    headerName: 'DeviceLogic',
    headerClassName: 'DeviceLogic',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'gatewayId',
    headerName: 'GatewayId',
    headerClassName: 'GatewayId',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
];

// const rows = [
//   { id: 1, name: 'Roxie', source: 'ZigBee', type: '電表' },
//   { id: 2, name: 'Frances', source: 'ZigBee', type: '電表' },
//   { id: 3, name: 'Clifford', source: 'ZigBee', type: '電表' },
//   { id: 4, name: 'Melisandre', source: 'ZigBee', type: '電表' },
//   { id: 5, name: 'Targaryen', source: 'KiwiApi', type: '電表' },
//   { id: 6, name: 'Foxer', source: 'KiwiApi', type: '鍋爐' },
// ];

type DeviceListData = {
  siteId: number;
  id: number;
  name: string;
  description: string;
  deviceId: string;
  deviceType: number;
  deviceLogic: number;
  gatewayId: number;
};

type SiteList = {
  siteId: number;
  id: number;
  name: string;
  country: string | null;
};

export default function DeviceTable() {
  const { data: sites, isError: sitesError } = useSiteListQuery({});
  const siteId = useAppSelector((state) => state.site.siteId);
  const {
    data: devices,
    isFetching: deviceFetching,
    isLoading: deviceLoading,
    isError: deviceError,
  } = useDeviceListQuery(siteId);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState<DeviceListData[]>([]);
  const [originalRows, setOriginalRows] = useState<DeviceListData[]>([]);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  const siteLabel = '選擇案場';
  const dispatch = useAppDispatch();

  // 處理搜索案場
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    // 使用搜索文本來過濾行數據
    const filteredData = originalRows.filter(
      (row) =>
        row.siteId.toString().includes(text) ||
        row.name.toLowerCase().includes(text.toLowerCase()) ||
        row.description.toLowerCase().includes(text.toLowerCase()) ||
        row.id.toString().toLowerCase().includes(text.toLowerCase()),
    );

    // 更新過濾購的數據，使 DataGrid 立即更新
    setFilteredRows(filteredData);
  };

  // 處理點擊案場獲取 ID
  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedIds(rowSelectionModel);
  };

  // 處理 site list api 錯誤時
  const sitesResult = () => {
    if ((sites && sites.length <= 0) || sitesError) {
      const noDataOption = [{ siteId: 0, name: 'No data available' }];
      return noDataOption;
    } else {
      return sites;
    }
  };

  const handleSelect = (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => {
    if (newValue) {
      dispatch(setSiteID(newValue.siteId));
    } else {
      dispatch(setSiteID(null));
    }
  };

  useEffect(() => {
    if (devices) {
      const adjustedData: DeviceListData[] = devices.map((item: DeviceListData) => ({
        siteId: item.siteId,
        name: item.name,
        description: item.description,
        id: item.deviceId,
        deviceType: item.deviceType,
        deviceLogic: item.deviceLogic,
        gatewayId: item.gatewayId,
      }));
      setOriginalRows(adjustedData);
      setFilteredRows(adjustedData);
    }
  }, [devices]);

  return (
    <div className="h-auto w-full mt-8">
      <div className="mb-2">
        <input
          id="searchDevice"
          type="text"
          placeholder="搜尋 Name, Description, DeviceId"
          value={searchText}
          onChange={handleInputChange}
          className="p-2 mb-4 w-80 border border-slate-300 rounded-md"
        />

        {/* 選擇案場、選擇設備、新增設備 */}
        <div className="mt-4 mb-4 flex justify-between">
          {/* 案場 */}
          <OneSiteSelect site={sitesResult()} label={siteLabel} handleSelect={handleSelect} />

          {/* button-modal */}
          <div className="grid grid-flow-col items-center gap-4">
            {/* 新增設備 */}
            <AddModal buttonLabel="新增設備" title="設備" idLabel="設備 ID" nameLabel="設備名稱" />
            {/* 刪除設備 */}
            <DeleteModal id={selectedIds} buttonLabel="刪除設備" title="確認刪除以下設備嗎 ?" />
          </div>
        </div>
      </div>

      {deviceFetching || deviceLoading ? (
        <DataGridLoading />
      ) : (
        <>
          {deviceError || filteredRows.length <= 0 ? (
            <DataError />
          ) : (
            <DataGrid
              sx={{
                '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                  outline: 'none !important',
                },
                '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
                  outline: 'none',
                },
              }}
              showCellVerticalBorder
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableColumnMenu
              onRowSelectionModelChange={handleRowSelection}
              // toolbar 是下載的套件
              slots={{
                toolbar: CustomToolbar,
              }}
              // 預設字樣是英文，可以用 localText 來更改為中文
            />
          )}
        </>
      )}

      {/* error handle */}

      <div className="mt-4">{`選擇的ID: ${selectedIds}`}</div>
    </div>
  );
}
