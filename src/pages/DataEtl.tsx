import EtlDataMonthTable from '@/components/SiteDataSearch/EtlData/EtlDataMonthTable';
import EtlDataTable from '../components/SiteDataSearch/EtlData/EtlDataTable';
import { downIcon, upIcon } from '../utils/icons';
import EtlDataDateAndTimeTable from '@/components/SiteDataSearch/EtlData/EtldataDateAndTimeTable';

const DataEtl = () => {
  const down = downIcon();
  const up = upIcon();

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-auto p-6 mb-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <h1 className=" text-3xl font-semibold">Search DataEtl Data</h1>
      </div>

      <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <EtlDataTable downIcon={down} upIcon={up} />
      </div>

      <div className="w-full h-auto p-8 mt-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <EtlDataMonthTable downIcon={down} upIcon={up} />
      </div>

      <div className="w-full h-auto p-8 mt-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <EtlDataDateAndTimeTable downIcon={down} upIcon={up} />
      </div>
    </div>
  );
};

export default DataEtl;
