import ScrollList from '../components/ScrollList';
import { Suspense, lazy } from 'react';
import Loading from '../components/Loading';
import SiteDataSearch from '../components/SiteDataSearch/SiteDataSearch';

const SiteList = lazy(() => import('../components/SiteList/SiteList'));

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <ScrollList />

      {/* 選擇案場、設備、類型來搜索資料並呈現 table */}
      <SiteDataSearch />

      <Suspense fallback={<Loading />}>
        {/* 案場列表，可新增、可刪除 */}
        <SiteList />
      </Suspense>
    </div>
  );
};

export default Home;
