import { downIcon, upIcon } from '@/utils/icons';
import { Element } from 'react-scroll';
import { Suspense, lazy } from 'react';
import Loading from '../Loading';

const RawDataTable = lazy(() => import('./RawData/RawDataTable'));
const EtlDataTable = lazy(() => import('./EtlData/EtlDataTable'));
const PlatformDataTable = lazy(() => import('./PlatformData/PlatformDataTable'));

const SiteDataSearch = () => {
  const down = downIcon();
  const up = upIcon();

  return (
    <div className="grid gap-8 mt-20 w-full">
      {/* dataPlatform */}
      <Element name="dataplatform">
        <Suspense fallback={<Loading />}>
          <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
            <PlatformDataTable downIcon={down} upIcon={up} />
          </div>
        </Suspense>
      </Element>

      {/* rawData */}
      <Element name="rawdata">
        <Suspense fallback={<Loading />}>
          <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
            <RawDataTable downIcon={down} upIcon={up} />
          </div>
        </Suspense>
      </Element>

      {/* dataETL */}
      <Element name="dataetl">
        <Suspense fallback={<Loading />}>
          <div className="w-full h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
            <EtlDataTable downIcon={down} upIcon={up} />
          </div>
        </Suspense>
      </Element>
    </div>
  );
};

export default SiteDataSearch;
