import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridRowId,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import DeleteModal from '../SiteList/DeleteModal';
import { useState } from 'react';
import EditUserModal from './EditUserModal';

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
        columnMenuFilterItem: null,
      }}
    />
  );
}

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
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'role',
    headerName: 'Role',
    headerClassName: 'Role',
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'Email',
    width: 130,
  },
  {
    field: 'password',
    headerName: 'Password',
    headerClassName: 'Password',
    width: 130,
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [<EditUserModal params={params} />],
    align: 'right',
  },
];

const rows = [
  {
    id: 1,
    role: 'admin',
    email: 'test1@test.com',
    password: 'dgfadgfg',
  },
  { id: 2, role: 'admin', email: 'test2@test.com', password: 'juerfdtrewtr' },
  { id: 3, role: 'user', email: 'test3@test.com', password: 'lilrerwed' },
  { id: 4, role: 'user', email: 'test4@test.com', password: 'bnukuyyere' },
  { id: 5, role: 'user', email: 'test4@test.com', password: 'Jasasiojmmnbb' },
];

const UserTable = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  // 處理搜索案場
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    // 使用搜索文本來過濾行數據
    const filteredData = rows.filter(
      (row) =>
        row.id.toString().includes(text) ||
        row.role?.toLowerCase().includes(text.toLowerCase()) ||
        row.email.toLowerCase().includes(text.toLowerCase()),
    );

    // 更新過濾購的數據，使 DataGrid 立即更新
    setFilteredRows(filteredData);
  };

  // 處理點擊案場獲取 ID
  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedIds(rowSelectionModel);
  };

  return (
    <div className="h-auto w-full mt-8">
      <div className="mb-2 flex justify-between">
        {/* 搜尋案場 */}
        <input
          type="text"
          placeholder="搜尋ID 或 名稱"
          value={searchText}
          onChange={handleInputChange}
          className="p-2 border border-slate-300 rounded-md"
        />

        {/* 新增與刪除案場 */}

        <DeleteModal id={selectedIds} buttonLabel="刪除帳號" title="確認刪除以下帳號嗎 ?" />
      </div>

      <DataGrid
        // cancel focus outline
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
        }}
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        onRowSelectionModelChange={handleRowSelection}
        slots={{
          toolbar: CustomToolbar,
          columnMenu: CustomColumnMenu,
        }}
        // 處理 locale text
      />

      <div className="mt-4">{`選擇的ID: ${selectedIds}`}</div>
    </div>
  );
};

export default UserTable;
