import { useState } from 'react';
import { downIcon, upIcon } from '../../utils/icons';
import Collapse from '@mui/material/Collapse';
import ApiTable from './ApiTable';
import { Divider } from '@mui/material';

const ApiList = () => {
  const [open, setOpen] = useState(true);
  const down = downIcon();
  const up = upIcon();

  const handleZoom = () => {
    setOpen((pre) => !pre);
  };
  return (
    <div className="w-full h-auto p-8 mb-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold mr-4">API List</h1>
        <div className="hover:bg-slate-200 rounded-full" onClick={handleZoom}>
          {open ? down : up}
        </div>
      </div>

      <Divider />

      {/* 設備 table */}
      <Collapse in={open} timeout="auto">
        <ApiTable />
      </Collapse>
    </div>
  );
};

export default ApiList;
