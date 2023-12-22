import { useState } from 'react';
import SiteListTable from './SiteListTable';
import Collapse from '@mui/material/Collapse';
import { downIcon, upIcon } from '../../utils/icons';
import { Element } from 'react-scroll';
import { Divider } from '@mui/material';

const SiteList = () => {
  const [open, setOpen] = useState(true);

  const down = downIcon();
  const up = upIcon();

  const handleZoom = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Element name="site">
      <div className="w-full h-auto p-8 mb-4 mt-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold mr-4">案場列表</h1>
          <div className="hover:bg-slate-200 rounded-full" onClick={handleZoom}>
            {open ? down : up}
          </div>
        </div>
        <Divider />

        {/* Collapse 具有展開效果，根據 props in 來設置狀態 */}
        <Collapse in={open} timeout="auto">
          <SiteListTable />
        </Collapse>
      </div>
    </Element>
  );
};

export default SiteList;
