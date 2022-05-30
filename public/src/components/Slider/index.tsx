import Slider from "@mui/material/Slider";
//import TextField from "@mui/material/TextField";
import styled from "styled-components";



const CustomSlider = styled(Slider)`
  .MuiSlider-track {
    background-image: linear-gradient(0.25turn, red, yellow, green);
  }
  .MuiSlider-rail {
    background-image: linear-gradient(0.25turn, red, yellow, green);
  }
`;



interface ISliderProps{
  header: string;
  setValue: (value: number) => void;
  value: number;
}

export default function SliderPage(props:ISliderProps) {
  const handleChange = ( value:number | number[]) => {
    if(typeof value === "number"){
      props.setValue(value);
    }
  };

  return (
    <div className="m-auto mt-3 w-80">
      <div className="mb-9">
        {props.header}
      </div>

      <CustomSlider
        value={props.value}
        min={0}
        max={100}
        marks
        step={5}
        onChange={(event:Event, value:number|number[], activeThumb:number)=>handleChange(value)}
        valueLabelDisplay="on"
      />


{/*       <TextField
        id="standard-number"
        label={props.header}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.value}
      /> */}

      {/* <TextField
        id="standard-number"
        label="current Sample weight"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={100 - props.value}
      /> */}
    </div>
  );
}
