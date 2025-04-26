"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Mock data for the revenue chart
const generateRevenueData = (timeframe: string) => {
  if (timeframe === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      total: Math.floor(Math.random() * 5000) + 1000,
    }));
  } else if (timeframe === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      name: day,
      total: Math.floor(Math.random() * 10000) + 5000,
    }));
  } else if (timeframe === "month") {
    return Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      total: Math.floor(Math.random() * 15000) + 8000,
    }));
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      name: month,
      total: Math.floor(Math.random() * 100000) + 50000,
    }));
  }
};

interface RevenueChartProps {
  timeframe: string;
}

export function RevenueChart({ timeframe }: RevenueChartProps) {
  const [data, setData] = useState(generateRevenueData(timeframe));

  useEffect(() => {
    setData(generateRevenueData(timeframe));
  }, [timeframe]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value}`, "Revenue"]}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
