import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="p-4 bg-card rounded-xl border border-border shadow-sm flex flex-col items-center">
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="mt-2 text-2xl font-bold tracking-tighter text-primary">{value}</span>
    </div>
  );
};

export default StatsCard;
