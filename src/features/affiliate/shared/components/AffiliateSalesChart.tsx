"use client";

import type { AffiliateSaleChartPoint } from "@/types/affiliate-dashboard.types";

interface AffiliateSalesChartProps {
  data: AffiliateSaleChartPoint[];
}

export const AffiliateSalesChart = ({ data }: AffiliateSalesChartProps) => {
  const maxVal = Math.max(...data.map((d) => d.sales), 4);

  // Y-axis ticks: 0 to maxVal in 4 steps
  const ticks = Array.from({ length: 5 }, (_, i) =>
    Math.round((maxVal / 4) * i),
  ).reverse();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-5">
        Sales Overview (Last 7 Days)
      </h3>

      <div className="flex gap-3">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-xs text-gray-400 text-right w-6 shrink-0 pb-6">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          {/* Bars */}
          <div className="flex items-end gap-2 h-40 border-b border-gray-200 pb-1">
            {data.map((point) => {
              const heightPct = maxVal > 0 ? (point.sales / maxVal) * 100 : 0;
              return (
                <div
                  key={point.date}
                  className="flex-1 flex flex-col items-center justify-end gap-1"
                >
                  <div
                    className="w-full rounded-t-sm bg-purple-500 transition-all duration-500"
                    style={{ height: `${heightPct}%`, minHeight: "2px" }}
                    title={`${point.date}: ₱${point.sales}`}
                  />
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="flex gap-2 mt-2">
            {data.map((point) => (
              <div
                key={point.date}
                className="flex-1 text-center text-xs text-gray-400"
              >
                {point.date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
