// import DeviceList from '../components/DeviceList/DeviceList';
// import SiteList from '../components/SiteList/SiteList';
import { Suspense, lazy } from 'react';
import Loading from '../components/Loading';

const SiteList = lazy(() => import('../components/SiteList/SiteList'));
const DeviceList = lazy(() => import('../components/DeviceList/DeviceList'));

const Site = () => {
  return (
    <div className="w-full min-h-screen">
      <Suspense fallback={<Loading />}>
        {/* 案場列表 */}
        <SiteList />

        {/* 案場設備 */}
        <DeviceList />
      </Suspense>
    </div>
  );
};

export default Site;
