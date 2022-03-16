import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";

import styled from "styled-components";

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  return (
    <Label
      {...rest}
      value={rest.value + "%"} ///overide the value to add %
      fontSize="16"
      fill="#FFFFFF"
      fontWeight="Bold"
    />
  );
};

export default function SingleStackedBar(props) {
  const data = [
    {
      name: "NE Send",
      completed: props.data[0],
      failed: props.data[1],
      inprogress: props.data[2],
    },
  ];

  return (
    <div className="content c-white">
      {/* <h1>Dashboard</h1> */}
      <ResponsiveContainer height={50} width={"100%"}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 50, right: 50 }}
          stackOffset="expand"
        >
          <XAxis hide type="number" />
          <YAxis
            hide
            type="category"
            dataKey="name"
            stroke="#FFFFFF"
            fontSize="12"
          />
          <Tooltip />
          <Bar dataKey="failed" fill="#dd7876" stackId="a">
            <LabelList
              dataKey="failed"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
          <Bar dataKey="completed" fill="#82ba7f" stackId="a">
            <LabelList
              dataKey="completed"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
          <Bar dataKey="inprogress" fill="#76a8dd" stackId="a">
            <LabelList
              dataKey="inprogress"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
