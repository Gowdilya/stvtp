import UserTable from "./userTable";
import { data } from "./buildingDataSet.js";
import "./tableStyle.scss";
import Button from "@mui/material/Button";

export default function BuildingManagement() {
  // const [updatedData, setUpdatedData] = useState(data);

  return (
    <div className="m-auto mt-32 mb-60 text-center">
      <UserTable data={data}></UserTable>
      <div className="m-3 inline-block">
        <Button variant="contained">Add Building</Button>
      </div>
      <div className="m-3 inline">
        <Button variant="contained">Edit Building</Button>
      </div>
    </div>
  );
}
