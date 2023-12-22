import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <CircularProgress size={60} />
        <h1 className="mt-4">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
