import PlatformDataMonthTable from '@/components/SiteDataSearch/PlatformData/PlatformDataMonthTable';
import PlatformDataTable from '@/components/SiteDataSearch/PlatformData/PlatformDataTable';
import { downIcon, upIcon } from '@/utils/icons';

const DataPlatform = () => {
  const down = downIcon();
  const up = upIcon();

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-auto p-6 mb-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <h1 className=" text-3xl font-semibold">Search DataPlatform Data</h1>
      </div>

      <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <PlatformDataTable downIcon={down} upIcon={up} />
      </div>

      <div className="w-full h-auto p-8 mt-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <PlatformDataMonthTable downIcon={down} upIcon={up} />
      </div>
    </div>
  );
};

export default DataPlatform;
