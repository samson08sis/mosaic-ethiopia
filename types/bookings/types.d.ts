export interface Booking {
  id: string;
  packageName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "confirmed" | "pending" | "cancelled";
  image: string;
  daysRemaining: number;
}
