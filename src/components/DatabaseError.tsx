import Alert from '@mui/material/Alert';

const DatabaseError = () => {
  return (
    <div className="w-full flex items-center justify-center mt-8">
      <Alert severity="error">
        <strong>Cannot connect to Database server!</strong>
      </Alert>
    </div>
  );
};

export default DatabaseError;
