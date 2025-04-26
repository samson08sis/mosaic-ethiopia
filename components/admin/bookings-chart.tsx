"use client";

import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock data for the bookings chart
const generateBookingsData = (timeframe: string) => {
  if (timeframe === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      bookings: Math.floor(Math.random() * 50) + 10,
    }));
  } else if (timeframe === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      name: day,
      bookings: Math.floor(Math.random() * 100) + 50,
    }));
  } else if (timeframe === "month") {
    return Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      bookings: Math.floor(Math.random() * 150) + 80,
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
      bookings: Math.floor(Math.random() * 1000) + 500,
    }));
  }
};

interface BookingsChartProps {
  timeframe: string;
}

export function BookingsChart({ timeframe }: BookingsChartProps) {
  const [data, setData] = useState(generateBookingsData(timeframe));

  useEffect(() => {
    setData(generateBookingsData(timeframe));
  }, [timeframe]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
        />
        <Tooltip
          formatter={(value: number) => [`${value}`, "Bookings"]}
          cursor={{ stroke: "rgba(0, 0, 0, 0.05)", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="bookings"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
