import { useEffect, useState } from "react";
import UserTable from "./userTable";
import { data } from "./userDataSet.js";
import "./tableStyle.scss";
import Button from "@mui/material/Button";

export default function UserManagement() {
  const [updatedData, setUpdatedData] = useState(data);

  return (
    <div className="m-auto mt-32 mb-60 text-center">
      <UserTable data={updatedData}></UserTable>
      <div className="m-3 inline-block">
        <Button variant="contained">Add User</Button>
      </div>
      <div className="m-3 inline">
        <Button variant="contained">Edit User</Button>
      </div>
    </div>
  );
}
