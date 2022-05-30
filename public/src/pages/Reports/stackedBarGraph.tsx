

//Not Used

interface IGraphProps {
    graphData: number[];

}

 export function BarGraph(props:IGraphProps) {


 

     return(<div>
        {props.graphData[0]}
     </div>)

 }