import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { JSXElementConstructor } from 'react';

type Props = {
  rows: GridRowsProp;
  columns: GridColDef[];
  customToolbar: JSXElementConstructor<unknown> | null | undefined;
};

const DataGridComponent = ({ rows, columns, customToolbar }: Props) => {
  return (
    <DataGrid
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        maxWidth: '1550px',
      }}
      showCellVerticalBorder
      disableColumnMenu
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20, 30, 50, 100]}
      slots={{
        toolbar: customToolbar,
      }}
    />
  );
};

export default DataGridComponent;
