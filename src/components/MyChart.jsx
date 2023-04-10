import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MyChart(props) {
const chartRef = useRef(null);

useEffect(() => {
const myChartRef = chartRef.current.getContext('2d');
new Chart(myChartRef, {
type: 'bar',
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
}, []);

return (
<div>
    <canvas ref={chartRef}></canvas>
</div>
);
}
export default MyChart;