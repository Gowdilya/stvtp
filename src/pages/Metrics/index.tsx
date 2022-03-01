import React , {useState} from "react";
import Slider from './../../components/Slider';
export default function Metrics() {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  console.log(
    "Metrics"
  );
  return <div className="container mx-auto">
      Metrics
      <div> Average Score: {Math.round((score1 + score2 + score3 + score4)/4)}</div>

          <Slider value={score1} setValue={setScore1} header={"Attentiveness"}/>

          <Slider value={score2} setValue={setScore2} header={"Timing & Control"}/>

          <Slider value={score3} setValue={setScore3} header={"Frequency"}/>

          <Slider value={score4} setValue={setScore4} header={"Intensity"}/>

    </div>;
}