import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const DataGridToolbar: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          utf8WithBom: true, // 需要設置 utf8，不然中文在 excel 中會是亂碼
          fileName: fileName,
        }}
      />
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
