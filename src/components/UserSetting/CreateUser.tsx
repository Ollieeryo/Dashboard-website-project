import { Divider } from "@mui/material";
import NewUserForm from "./NewUserForm";
import RoleSelect from "./RoleSelect";
import { useState } from "react";

const CreateUser = () => {
  const [role, setRole] = useState("admin");
  return (
    <div className="w-[500px] h-auto p-8 ml-4 rounded-xl shadow-lg shadow-slate-300 bg-white">
      <h1 className="mb-4 text-xl font-semibold">新增帳號</h1>
      <Divider />

      <div className="mt-8">
        <RoleSelect role={role} setRole={setRole} />
      </div>

      <NewUserForm />
    </div>
  );
};

export default CreateUser;
