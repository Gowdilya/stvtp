import Paper from "@mui/material/Paper";
import "./analytics.scss";
import { useEffect, useState } from "react";
import map from "./../../images/map.png";
import { PieChart, Pie, Sector, Legend } from "recharts";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RiskBarChart() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const data = [
    {
      name: "50",
      count: 3,
      bucket: "1",
    },
    {
      name: "51-100",
      count: 13,
      bucket: "2",
    },
    {
      name: "101-150",
      count: 31,
      bucket: "3",
    },
    {
      name: "151-200",
      count: 46,
      bucket: "4",
    },
    {
      name: "201-250",
      count: 25,
      bucket: "5",
    },
    {
      name: "251-300",
      count: 1,
      bucket: "6",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  function NewlineText(props) {
    const text = props.text;
    const newText = text.split("\n").map((str) => <p>{str}</p>);
    return newText;
  }

  const getIntroOfPage = (label) => {
    const text1 =
      "Green Park Apartments, 180 Queen Mary Rd \n 257 Bath Rd Apartments \n Harbour Place Condominium, 185 Ontario St \n";
    const text2 =
      "The Valleyview, 649 Davis Dr Condominium \n CFB Kingston Apartment Housing \n 440 Elliott Ave Apartments \n CFB Kingston Apartment Housing \n 509-511 Days Rd Apartments \n 276 Kingsdale Av Condominium \n 312 Conacher Dr Apartments, KFHC \n 810 Castell Road Apartments - Skyline Living \n 209 Colborne St Apartments \n 176 Wilson St Apartments (KFHC) \n Elgin Apartments, 286 Queen Mary Rd \n Laurentian Apartments - 181 Queen Mary Rd \n 7 Bayswater Place Apartments \n";
    const text3 =
      "Kanellos Towers, 544 College St Apartments \n Portsmouth Place Central Apartments, 310 Bath Rd \n 475 Palace Rd Apartments \n 47-53 Sydenham St Apartments \n 191 Adelaide St Apartments \n 264 Park St Apartments \n Brock Towers \n 45 John St Apartments \n 27 Wright Cr Apartments (KFHC) \n Shipyards Apartments, 33 Ontario St \n 240 Adelaide St Apartments \n CFB Kingston Apartment Housing \n 211 Queen Mary Rd Apartments \n 181 Yrok St Apartments \n 100 Pine St Apartments \n Admiralty Place \n 76 Pine St Apartments \n Village Tower Apartments, 87 Compton St \n The West Winds, 131 Notch Hill Rd \n The Deerfield Apartment, 115 Barrett Ct \n 25 Briceland St Apartments \n 835 Milford Dr Condominium/Apartments \n Mapleview Apartments, 661 Davis Dr \n 223 Nelson St Apartments \n Village Green I Apartments, 700 SJA Macdonald Bv \n Bayridge Court Apartments -1019 Pembridge Cr \n AMHS-KFLA Housing \n 1733 Bath Rd Apartments \n 31 Stanley St \n 35 Elm St Aprtments \n Carlton, 130 Parkway \n";
    const text4 =
      "1 Westdale Av Apartments \n 1725 Bath Rd Apartments \n 77 York St Aprtments \n Lord Sydenham Apartments, 32 Ontario St \n 287 Westdale Apartments \n West Village Apartments, 507 Days Rd \n 149 Kingscourt Aparments \n Glengarry Apartments - 94 Wright Crescent \n Mayfair, 1508 Princess St \n 460 Elliott Ave Apartments \n 25 Theresa Cr Apartments \n Kingston Frontenac Housing Corporation, 129 Van Order Dr \n Westview Place Apartments, 52 Bayswater Pl \n 123 Van Order Dr Apartments (KFHC) \n 1719-1723 Bath Rd Apartments \n Newcourt Fields 1 Apartments, 44 Old Oak Rd \n 252 Conacher Dr Apartments \n Waverly Apartments, 1254 Princess St \n Bowling Green 1 Apartments, 217 Bath Rd \n 14 Greenview Dr Condominiums \n 332 University Av Apartments \n Creekside Apartments, 847 Development Dr \n 227 Brock St Apartments \n 447 Palace Rd Apartments \n AMHS-KFLA Housing \n 1080 Cataraqui Woods Dr Apartments \n John Counter Place Apartments, 722 John Counter Bv \n 745 Davis Dr Condominium \n West Park Village II, 33 Elwood St \n 79 Cowdy St Apartments \n 90 Virginia Street Apartments \n The Bajus Condominium, 2 Bay St";
    const text5 =
      "Town Homes Kingston, 37 Cassidy St \n 53 Marland St Apartments \n Crescent Towers FCC, 130 Wright Cr \n 80 William St Apartments\n 580 Armstrong Rd Condominiums \n 233 Queen Mary Rd Apartments (KFHC)\n CFB Kingston Apartment Housing \n 437 Johnson St Apartments \n Algonquin Apartments, 10 Runnymede Rd \n 148 Pine St Apartments \n  244-252 King St E Apartments \n 266 Guthrie Dr Apartments \n 105 Cherry St Apartments \n 112 Joseph St Apartments \n 269 Westdale Apartments \n 196 Concession St Apartments \n 509 Macdonnell St Apartments \n 277 Park St Apartments \n 304 Westdale Apartments \n 845 Milford Dr Condominium/Apartments \n 75 Notch Hill Rd Apartments \n Kingsgate, 675 Davis Dr Condominium \n 318 Yonge St Apartments \n Old Mill Apartments II, 1030 Old Mill Rd";
    const text6 = "316 Kingsdale Av Condominium";

    if (label == "50") {
      return <NewlineText text={text1} />;
    }
    if (label === "51-100") {
      return <NewlineText text={text2} />;
    }
    if (label === "101-150") {
      return <NewlineText text={text3} />;
    }
    if (label === "151-200") {
      return <NewlineText text={text4} />;
    }
    if (label === "201-250") {
      return <NewlineText text={text5} />;
    }
    if (label === "251-300") {
      return <NewlineText text={text6} />;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          // elevation={3}
          className="custom-tooltip inline-block  mt-72 float-right p-5"
        >
          <p className="label font">{`Risk Range ${label}`}</p>
          <p className="label font">{`Total Apartments: ${payload[0].value}`}</p>
          <div className="font-bold">Apartments:</div>
          <div className="border-2 border-rose-500">
            <p className="intro border-2 border-sky-500 m-5">
              {getIntroOfPage(label)}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const DisplayBarInfo = () => {
    if (selectedEntry) {
      return (
        <div className="inline-block align-super m-12 p-5">
          <p className="label font">{`Risk Range ${selectedEntry.name}`}</p>
          <p className="label font">{`Total Apartments: ${selectedEntry.count}`}</p>
          <div className="font-bold">Apartments:</div>
          <div>
            <p className="intro  border-2 border-sky-500 m-2 overflow-x-scroll h-60">
              {getIntroOfPage(selectedEntry.name)}
            </p>
          </div>
          <PieDiagram />
        </div>
      );
    } else return <></>;
  };

  const pieData = [
    { name: "intensity", value: 400 },
    { name: "distraction", value: 300 },
    { name: "forgetfulness", value: 300 },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const DisplayMap = () => {
    return (
      // <Paper className="ml-12" elevation={3} >
      <div className="m-auto text-center ml-12 mb-6 ">
        <Paper className="w-fit m-auto">
          <img
            className=" inline-block align-top"
            src={map}
            alt="Map"
            height={260}
            width={500}
          />
        </Paper>
      </div>
      // </Paper>
    );
  };

  const barColors = [
    "#81DE89",
    "#CAFC84",
    "#F3DB6F",
    "#FFB668",
    "#ED8C79",
    "#ED6572",
  ];

  const handleCellClick = (e, entry) => {
    console.log("entry", entry);
    setSelectedEntry(entry);
  };

  return (
    <div className="container mt-32">
      <h1 className="ml-16 text-3xl">
        Leading Risk Indicator Distribution Over Portfolio
      </h1>
      <div>
        <div className="inline-block w-6/12">
          <div className=" m-auto max-w-xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart className="m-auto" data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={"name"}
                  tick={false}
                  label={{
                    value: "Increased Risk →",
                  }}
                />
                <YAxis />

                <Bar dataKey="count" barSize={100} fill="#212121">
                  {data.map((entry, index) => (
                    <Cell
                      className="hover:cursor-pointer "
                      key={`cell-${index}`}
                      fill={barColors[index]}
                      onClick={(e) => handleCellClick(e, entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {selectedEntry && selectedEntry.name === "201-250" && <DisplayMap />}
        </div>

        <div className="inline-block w-6/12">
          {selectedEntry && <DisplayBarInfo />}
        </div>
      </div>
    </div>
  );
}

const data = [
  { name: "Intensity", value: 400 },
  { name: "Distraction", value: 300 },
  { name: "Forgetfulness", value: 300 },
];

const COLORS = ["#957DAD", "#9DBBE3", "#C3E2E6", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function PieDiagram() {
  var fakeData = data;
  fakeData[0].value = Math.random() * 200;
  fakeData[1].value = Math.random() * 200;
  fakeData[2].value = Math.random() * 200;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={fakeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconSize={10} layout="horizontal" verticalAlign="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
