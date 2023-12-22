import RawDataTable from '../components/SiteDataSearch/RawData/RawDataTable';
import { downIcon, upIcon } from '../utils/icons';

const RawData = () => {
  const down = downIcon();
  const up = upIcon();

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-auto p-6 mb-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <h1 className=" text-3xl font-semibold">Search RawData Data</h1>
      </div>

      <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <RawDataTable downIcon={down} upIcon={up} />
      </div>
    </div>
  );
};

export default RawData;
