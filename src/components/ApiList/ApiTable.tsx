import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import AddModal from '../SiteList/AddModal';
import DeleteModal from '../SiteList/DeleteModal';
import { useEffect, useState } from 'react';
import { useApiListQuery } from '../../features/api/apiListApi';
import DataError from '../DataError';
import EditApiModal from './EditApiModal';
import DataGridLoading from '../DataGridLoading';
import DatabaseError from '../DatabaseError';

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
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'description',
    headerName: 'Description',
    headerClassName: 'Description',
    width: 130,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'Username',
    width: 250,
  },
  {
    field: 'password',
    headerName: 'Password',
    headerClassName: 'Password',
    width: 300,
  },
  {
    field: 'key',
    headerName: 'Key',
    headerClassName: 'Key',
    width: 400,
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [<EditApiModal params={params} />],
    align: 'center',
  },
];

// const fakeRows = [
//   { id: 1, name: 'Roxie', source: 'ZigBee', type: '電表' },
//   { id: 2, name: 'Frances', source: 'ZigBee', type: '電表' },
//   { id: 3, name: 'Clifford', source: 'ZigBee', type: '電表' },
//   { id: 4, name: 'Melisandre', source: 'ZigBee', type: '電表' },
//   { id: 5, name: 'Targaryen', source: 'KiwiApi', type: '電表' },
//   { id: 6, name: 'Foxer', source: 'KiwiApi', type: '鍋爐' },
// ];

type ApiListData = {
  keyId: number;
  id: number;
  description: string;
  username: string | null;
  password: string | null;
  key: string | null;
};

const ApiTable = () => {
  const { data, isError, isFetching } = useApiListQuery({}, { refetchOnMountOrArgChange: true });
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState<ApiListData[]>([]);
  const [originalRows, setOriginalRows] = useState<ApiListData[]>([]);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    // 使用搜索文本來過濾行數據
    const filteredData = originalRows.filter(
      (row: ApiListData) =>
        row.id.toString().includes(text) ||
        row.description.toLowerCase().includes(text.toLowerCase()) ||
        row.username?.toLowerCase().includes(text.toLowerCase()) ||
        row.key?.toLowerCase().includes(text.toLowerCase()),
    );

    // 更新過濾購的數據，使 DataGrid 立即更新
    setFilteredRows(filteredData);
  };

  // 處理點擊案場獲取 ID
  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedIds(rowSelectionModel);
  };

  useEffect(() => {
    // 使用 map 方法將 "keyId" 重命名為 "id"
    const adjustedData: ApiListData[] = data
      ? data.map((item: ApiListData) => ({
          id: item.keyId,
          description: item.description,
          username: item.username,
          password: item.password,
          key: item.key,
        }))
      : [];
    setOriginalRows(adjustedData);
    setFilteredRows(adjustedData);
  }, [data]);

  if (isFetching) {
    return <DataGridLoading />;
  }

  if (filteredRows.length <= 0) {
    return <DataError />;
  }

  if (isError) {
    return <DatabaseError />;
  }

  return (
    <div className="h-auto w-full mt-8">
      <div className="mb-2 flex justify-between items-center">
        {/* 搜尋 API */}
        <input
          id="searchApi"
          type="text"
          placeholder="搜尋 API ID 或 名稱"
          value={searchText}
          onChange={handleInputChange}
          className="p-2 border border-slate-300 rounded-md"
        />

        {/* 選擇案場、選擇設備、新增設備 */}
        <div className="flex justify-between">
          {/* button-modal */}
          <div className="grid grid-flow-col items-center gap-4">
            <AddModal buttonLabel="新增 API" title="API" idLabel="API ID" nameLabel="API 名稱" />
            <DeleteModal id={selectedIds} buttonLabel="刪除 API" title="確認刪除以下 API 嗎 ?" />
          </div>
        </div>
      </div>

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
        disableColumnMenu
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        // toolbar 是下載的套件
        slots={{
          toolbar: CustomToolbar,
        }}
      />
      <div className="mt-4">{`選擇的ID: ${selectedIds}`}</div>
    </div>
  );
};

export default ApiTable;
