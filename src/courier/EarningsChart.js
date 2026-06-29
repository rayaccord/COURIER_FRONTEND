import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function EarningsChart({

  data = [0, 0, 0, 0, 0, 0, 0],

}) {

  const chartData = {

    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [

      {

        label: "Earnings (€)",

        data,

        tension: 0.4,

        fill: true,

        borderWidth: 3,

        pointRadius: 5,

        backgroundColor: "rgba(249,115,22,0.15)",

        borderColor: "#f97316",

      },

    ],

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        display: false,

      },

    },

    scales: {

      y: {

        beginAtZero: true,

      },

    },

  };

  return (

    <div className="h-64">

      <Line
        data={chartData}
        options={options}
      />

    </div>

  );

}