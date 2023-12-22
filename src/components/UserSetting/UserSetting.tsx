import { Divider } from "@mui/material";
import ChangeAccount from "./ChangeAccount";

const UserSetting = () => {
  return (
    <div className="w-[500px] h-auto p-8 rounded-xl shadow-lg shadow-slate-300 bg-white">
      <h1 className="mb-4 text-xl font-semibold">帳戶管理</h1>
      <Divider />
      <ChangeAccount />
    </div>
  );
};

export default UserSetting;
