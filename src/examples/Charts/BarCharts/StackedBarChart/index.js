import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Appraisal Chart",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [65, 89, 17, 60, 34, 23],
//       backgroundColor: "rgb(255, 99, 132)",
//     },
//     {
//       label: "Dataset 2",
//       data: [35, 11, 83, 40, 66, 77],
//       backgroundColor: "rgb(53, 162, 235)",
//     },
//   ],
// };

// eslint-disable-next-line react/prop-types
export function StackedChart({ data }) {
  return <Bar options={options} data={data} />;
}
