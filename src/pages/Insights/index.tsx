import BuildingInsightsTable from './buildingInsightsTable';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';


//import DatePicker from "./datePicker";
import DateRangeSelector from '../../components/DateRangeSelector';
import { useEffect, useState } from 'react'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel  from '../../components/TabPanel';
import { data } from "./tableDataSet.js";
import UnitInsightsTable from './unitInsightsTable';
import Switch from '@mui/material/Switch';
import UnitEventsTable from '../Events/unitEventsTable';
import BuildingEventsTable from '../Events/buildingEventsTable';
import { buildInsightsAll, buildInsightsOneBuilding } from "../../services/mockDataService";
import { buildEventsAllBuildings, buildEventsOneBuilding } from '../../services/eventsMockService';


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Insights() {
  const [level, setLevel] = useState(0);
  const [unitsInsightsData, setUnitsInsightsData] = useState<any[]>([]);
  const [unitsEventsData, setUnitsEventData] = useState<any[]>([]);
  const [buildingsEventData, setBuildingsEventData] = useState<any[]>([]);
  const [intervalDays, setIntervalDays] = useState(0);
  const [eventToggle, setEventToggle] = useState(0);
  const [buildingId, setBuildingId] = useState(0);

  const handleToggleChange = (event: React.SyntheticEvent, newValue: number) => {
    setEventToggle(newValue);
  };

  const handleChange = (newValue: number) => {
    setLevel(newValue);
  };

  const handleIntervalChange = (days:number)=>{
    setIntervalDays(days);
  }
 //Get Building level Events Data for the Interval
  useEffect(() => {
    const events = buildEventsAllBuildings(intervalDays);
    setBuildingsEventData(events);
    loadSubData(buildingId);
  } , [intervalDays]);




  const handleLoadUnitsData = (buildingId:number) =>{
    loadSubData(buildingId);
    setLevel(1);
    window.scrollTo(0, 0);//scroll to top of page
    setBuildingId(buildingId);
  }

const loadSubData = (buildingId:number) =>{
    const stuff1 = buildInsightsOneBuilding(buildingId, intervalDays)
    setUnitsInsightsData(stuff1);
    const stuff2 = buildEventsOneBuilding(buildingId, intervalDays)
    setUnitsEventData(stuff2);
}

  return <div className="container mx-auto mt-32 mb-60 overflow-x-scroll " >

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={eventToggle} onChange={handleToggleChange} aria-label="basic tabs example">
              <Tab label="Insights" {...a11yProps(0)}  />
              <Tab label="Events" {...a11yProps(1)} />
            </Tabs>
           
          </Box>
          <DateRangeSelector setInterval={handleIntervalChange}/>
          {level === 1 && 
        <div className="inline-block float-right ml-9 mt-3">
              <Button  variant="outlined" startIcon={<ArrowBackIosIcon />} onClick={()=>handleChange(0)} > My Buildings
              </Button>
        
        </div>}
      <TabPanel value={level} index={0}>
<div>{eventToggle?<BuildingEventsTable data={buildingsEventData} loadUnitsData={handleLoadUnitsData}/>:
        <BuildingInsightsTable data={data} loadUnitsData={handleLoadUnitsData} />}
        </div>

      </TabPanel>
      <TabPanel value={level} index={1}>
        {eventToggle?<>
        {unitsEventsData?<UnitEventsTable data={unitsEventsData} />:<div>No Events</div>}</>:
        <UnitInsightsTable data={unitsInsightsData} />}
      </TabPanel>
      </Box>

    </div>;
}