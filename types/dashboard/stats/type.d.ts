import { ReactNode } from "react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  change?: string;
}
