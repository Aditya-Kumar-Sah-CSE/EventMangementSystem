import React from "react";

/**
 * Simple placeholder component for charts/graphs.
 * Replace this with a real chart library (e.g., Recharts, Chart.js) when data is available.
 */
export const ChartPlaceholder: React.FC = () => {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl bg-card border border-border text-muted-foreground">
      <span className="text-sm italic">Chart will appear here</span>
    </div>
  );
};

export default ChartPlaceholder;
