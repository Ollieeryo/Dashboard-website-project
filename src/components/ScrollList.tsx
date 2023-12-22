import { Divider } from '@mui/material';
import { Link } from 'react-scroll';

const ScrollList = () => {
  return (
    <div className="grid grid-flow-col gap-4 w-auto h-auto p-4 mb-4 rounded-xl bg-white shadow-md fixed z-50 border">
      <Link to="dataplatform" smooth={true} spy={true} offset={-160} duration={500}>
        <button className="w-[130px] p-1 hover:bg-sky-200 hover:text-blue-500">
          Data Platform
        </button>
        <Divider />
      </Link>

      <Link to="rawdata" smooth={true} spy={true} offset={-160} duration={500}>
        <button className="w-[100px] p-1 hover:bg-sky-200 hover:text-blue-500">Raw Data</button>
        <Divider />
      </Link>

      <Link to="dataetl" smooth={true} spy={true} offset={-160} duration={500}>
        <button className="w-[100px] p-1 hover:bg-sky-200 hover:text-blue-500">Data ETL</button>
        <Divider />
      </Link>

      <Link to="site" smooth={true} spy={true} offset={-90} duration={500}>
        <button className="w-14 p-1 hover:bg-sky-200 hover:text-blue-500">Sites</button>
        <Divider />
      </Link>
    </div>
  );
};

export default ScrollList;
