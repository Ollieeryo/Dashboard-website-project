import { Divider } from "@mui/material";
import UserTable from "./UserTable";

const UserList = () => {
  return (
    <div className="w-full h-auto p-8 mb-4 mx-auto rounded-xl shadow-lg shadow-slate-300 bg-white">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold mr-4">帳號列表</h1>
      </div>
      <Divider />
      <UserTable />
    </div>
  );
};

export default UserList;
