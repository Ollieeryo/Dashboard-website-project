import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import { useSiteListQuery } from '../../features/api/siteListApi';
import DataError from '../DataError';
import DataGridLoading from '../DataGridLoading';
import DatabaseError from '../DatabaseError';

// 客製化 column menu 的選項，可放入 slots
// function CustomColumnMenu(props: GridColumnMenuProps) {
//   return (
//     <GridColumnMenu
//       {...props}
//       slots={{
//         // Hide `columnMenuColumnsItem`
//         columnMenuColumnsItem: null,
//         columnMenuFilterItem: null,
//       }}
//     />
//   );
// }

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
    field: 'name',
    headerName: '名稱',
    headerClassName: 'Name',
    width: 300,
  },
  {
    field: 'country',
    headerName: '國家',
    headerClassName: 'Country',
    width: 130,
  },
];

// const rows = [
//   { id: 1, name: 'Roxie', country: 'Taiwan' },
//   { id: 2, name: 'Frances', country: 'Taiwan' },
//   { id: 3, name: 'Clifford', country: 'Taiwan' },
//   { id: 4, name: 'Melisandre', country: 'Taiwan' },
//   { id: 5, name: 'Targaryen', country: 'Japan' },
// ];

type SiteList = {
  siteId: number;
  id: number;
  name: string;
  country: string | null;
};

export default function SiteListTable() {
  const { data, isError, isFetching } = useSiteListQuery({}, { refetchOnMountOrArgChange: true });
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState<SiteList[]>([]);
  const [originalRows, setOriginalRows] = useState<SiteList[]>([]);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  // 處理搜索案場
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    // 使用搜索文本來過濾行數據
    const filteredData = originalRows.filter(
      (row: SiteList) =>
        row.id.toString().includes(text) ||
        row.name.toLowerCase().includes(text.toLowerCase()) ||
        row.country?.toLowerCase().includes(text.toLowerCase()),
    );

    // 更新過濾購的數據，使 DataGrid 立即更新
    setFilteredRows(filteredData);
  };

  // 處理點擊案場獲取 ID
  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedIds(rowSelectionModel);
  };

  useEffect(() => {
    // 使用 map 將 "keyId" 重命名為 "id"
    const adjustedData: SiteList[] = data
      ? data.map((item: SiteList) => ({
          id: item.siteId,
          name: item.name,
          country: item.country,
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
      <div className="mb-2 flex justify-between">
        {/* 搜尋案場 */}
        <input
          id="searchSite"
          type="text"
          placeholder="搜尋案場 ID 或 名稱"
          value={searchText}
          onChange={handleInputChange}
          className="p-2 border border-slate-300 rounded-md"
        />

        {/* 新增與刪除案場 */}
        <div className="grid grid-flow-col gap-4 items-center">
          <AddModal buttonLabel="新增案場" title="案場" idLabel="案場 ID" nameLabel="案場名稱" />
          <DeleteModal id={selectedIds} buttonLabel="刪除案場" title="確認刪除以下案場嗎 ?" />
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
          // '.MuiDataGrid-columnSeparator': {
          //   display: 'none',
          // },
        }}
        showCellVerticalBorder
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableColumnMenu
        onRowSelectionModelChange={handleRowSelection}
        slots={{
          toolbar: CustomToolbar,
        }}
        // 處理 locale text
      />

      {/* <div className="mt-4">{`選擇的ID: ${selectedIds}`}</div> */}
    </div>
  );
}
