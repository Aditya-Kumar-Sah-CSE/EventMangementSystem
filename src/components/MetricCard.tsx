"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react"; // using lucide icons, ensure library installed

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number; // positive for up, negative for down
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon,
}) => {
  const TrendIcon =
    trend && trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-400" />
    ) : trend && trend < 0 ? (
      <TrendingDown className="h-4 w-4 text-rose-400" />
    ) : null;

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex items-center justify-between mb-2">
        {icon && <div className="text-primary-foreground/70">{icon}</div>}
        {trend !== undefined && TrendIcon && (
          <div className="flex items-center gap-1 text-sm">
            {TrendIcon}
            <span className="text-foreground/70">{trend > 0 ? `+${trend}%` : `${trend}%`}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-primary-foreground">{value}</div>
      <p className="text-sm text-muted-foreground mt-1">{title}</p>
    </div>
  );
};

export default MetricCard;
