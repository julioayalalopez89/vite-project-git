import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MyChart() {
const chartRef = useRef(null);

useEffect(() => {
const myChartRef = chartRef.current.getContext('2d');
new Chart(myChartRef, {
type: 'bar',
data: {
labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
datasets: [
{
label: 'Ventas',
data: [12, 19, 3, 5, 2, 3],
backgroundColor: 'rgba(255, 99, 132, 0.2)',
borderColor: 'rgba(255, 99, 132, 1)',
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
    <canvas ref={chartRef}/>
  </div>

);
}
export default MyChart;