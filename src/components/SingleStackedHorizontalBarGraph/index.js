import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  return (
    <Label
      {...rest}
      value={rest.value} ///overide the value to add %
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
      intensity: props.data[0],
      distraction: props.data[1],
      forgetfulness: props.data[2],
      total: props.data[0] + props.data[1] + props.data[2],
    },
  ];

  return (
    <div>
      <div className="inline-block m-auto mr-3">
        Total: {props.data[0] + props.data[1] + props.data[2]}
      </div>
      {/* <div className="inline m-auto">
        {" "}
        Weighted Average:{" "}
        {((props.data[0] + props.data[1] + props.data[2]) / 3).toFixed(2)}
      </div> */}
      <ResponsiveContainer
        height={30}
        width={(props.data[0] + props.data[1] + props.data[2]) * 2}
      >
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 50, right: 50, bottom: 5 }}
        >
          <XAxis hide type="number" dataKey="total" tick={false} />

          <YAxis
            hide
            type="category"
            dataKey="name"
            stroke="#FFFFFF"
            fontSize="12"
          />
          <Bar
            dataKey="intensity"
            //fill="#9e9e9e"
            fill="#957DAD"
            stackId="a"
          >
            {/* <LabelList
              dataKey="intensity"
              position="center"
              content={renderCustomizedLabel}
            /> */}
          </Bar>
          <Bar
            dataKey="distraction"
            //fill="#616161"
            fill="#9DBBE3"
            stackId="a"
          >
            {/* <LabelList
              dataKey="distraction"
              position="center"
              content={renderCustomizedLabel}
            /> */}
          </Bar>
          <Bar
            dataKey="forgetfulness"
            //fill="#212121"
            fill="#C3E2E6"
            stackId="a"
          >
            {/* <LabelList
              dataKey="forgetfulness"
              position="center"
              content={renderCustomizedLabel}
            /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
