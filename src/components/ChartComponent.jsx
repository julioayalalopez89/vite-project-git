import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MyChart(props) {
const chartRef = useRef(null);
let myChart = null;

useEffect(() => {
const myChartRef = chartRef.current.getContext('2d');
if (myChart) {
myChart.destroy();
}
myChart = new Chart(myChartRef, {
type: props.type,
data: {
labels: props.labels,
datasets: [
{
label: props.dataLabel,
data: props.data,
backgroundColor: props.backgroundColor,
borderColor: props.borderColor,
borderWidth: 1,
},
],
},
options: {
scales: {
yAxes: [
{
ticks: {
beginAtZero: true,
},
},
],
},
},
});

return () => {
  myChart.destroy();
};
}, [props.labels, props.dataLabel, props.data, props.backgroundColor, props.borderColor]);

return (

  <div>
    <canvas ref={chartRef}/>
  </div>


);
}
export default MyChart;