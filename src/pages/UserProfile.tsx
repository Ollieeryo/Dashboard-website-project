import CreateUser from '../components/UserSetting/CreateUser';
import UserList from '../components/UserSetting/UserList';
import UserSetting from '../components/UserSetting/UserSetting';

const UserProfile = () => {
  return (
    <div className="max-w-[1500px] min-h-screen flex flex-col items-center">
      {/* <div className="w-[250px] h-auto p-4 flex justify-center fixed left-[17rem] z-50 rounded-xl shadow-lg shadow-slate-300 bg-white">
        <h1>登入身分: admin or user</h1>
      </div> */}
      <div className="flex justify-between w-2/3 mb-8">
        <UserSetting />

        <CreateUser />
      </div>
      <div className="w-2/3 ">
        {/* 所有使用者帳號 table，可編輯、刪除帳號 */}
        <UserList />
      </div>
    </div>
  );
};

export default UserProfile;
