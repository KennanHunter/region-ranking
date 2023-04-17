"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { FTCStatsReturnObject } from "../client/getStatsFromFTCStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export const Chart: FC<{ stats: FTCStatsReturnObject[] }> = ({ stats }) => {
  const data: ChartData<"bar", number[], unknown> = {
    labels: stats.map((stat) => stat.name),
    datasets: [
      {
        label: "OPR",
        data: stats.map((stat) => stat.averageOPR ?? 0),
        backgroundColor: "rgb(147, 51, 234)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
