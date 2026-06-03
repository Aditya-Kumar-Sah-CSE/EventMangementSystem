// src/lib/mockDashboardData.ts

export const stats = [
  {
    title: "Tickets Booked",
    value: 12,
    trend: 14, // +14%
    icon: "Ticket",
  },
  {
    title: "Upcoming Events",
    value: 3,
    trend: -5, // -5%
    icon: "Calendar",
  },
  {
    title: "Total Revenue",
    value: "$1,240",
    trend: 8,
    icon: "DollarSign",
  },
];

export const chartData = [
  { month: "Jan", sales: 200 },
  { month: "Feb", sales: 350 },
  { month: "Mar", sales: 300 },
  { month: "Apr", sales: 450 },
  { month: "May", sales: 400 },
  { month: "Jun", sales: 480 },
  { month: "Jul", sales: 520 },
  { month: "Aug", sales: 610 },
  { month: "Sep", sales: 580 },
  { month: "Oct", sales: 700 },
  { month: "Nov", sales: 660 },
  { month: "Dec", sales: 720 },
];

export const activityFeed = [
  { id: 1, message: "System Alert: Tech Summit starts in 2 hours", time: "2h ago" },
  { id: 2, message: "New ticket purchased for 'AI Conference'", time: "30m ago" },
  { id: 3, message: 'Event "Hackathon" registration opened', time: "Just now" },
];
