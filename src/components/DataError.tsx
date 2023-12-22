import Alert from '@mui/material/Alert';

const DataError = () => {
  return (
    <div className="w-full mt-4">
      <Alert severity="error" className="w-full">
        <strong>Data not found!</strong>
      </Alert>
    </div>
  );
};

export default DataError;
