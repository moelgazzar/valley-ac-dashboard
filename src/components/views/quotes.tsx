"use client";

import type { DateRange } from "@/lib/data";
import { getQuotePipeline, getKPIs } from "@/lib/data";

const pipelineColorMap: Record<string, { bg: string; bar: string; text: string }> = {
  gray: { bg: "bg-gray-50", bar: "bg-gray-400", text: "text-gray-700" },
  blue: { bg: "bg-blue-50", bar: "bg-blue-500", text: "text-blue-700" },
  amber: { bg: "bg-amber-50", bar: "bg-amber-500", text: "text-amber-700" },
  emerald: { bg: "bg-emerald-50", bar: "bg-emerald-500", text: "text-emerald-700" },
  red: { bg: "bg-red-50", bar: "bg-red-500", text: "text-red-700" },
};

function formatCurrency(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value.toLocaleString()}`;
}

export default function QuotesView({ range }: { range: DateRange }) {
  const pipeline = getQuotePipeline(range);
  const kpis = getKPIs(range);
  const totalValue = pipeline.reduce((s, p) => s + p.value, 0);
  const totalCount = pipeline.reduce((s, p) => s + p.count, 0);
  const wonStage = pipeline.find((p) => p.status === "Accepted");
  const declinedStage = pipeline.find((p) => p.status === "Declined");

  return (
    <div className="space-y-8">
      {/* Quote summary cards */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Quote & Revenue Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Quotes Generated</p>
            <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Pipeline</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Quotes Won</p>
            <p className="text-2xl font-bold text-emerald-600">
              {wonStage?.count || 0}{" "}
              <span className="text-base font-normal text-gray-400">
                ({formatCurrency(wonStage?.value || 0)})
              </span>
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Close Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {kpis.find((k) => k.label === "Close Rate")?.value}
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline funnel */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Quote Pipeline</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Breakdown by status. "Awaiting Response" quotes are where follow-up matters most.
          </p>
        </div>
        <div className="p-6 space-y-4">
          {pipeline.map((stage) => {
            const colors = pipelineColorMap[stage.color] || pipelineColorMap.gray;
            const widthPercent = Math.max((stage.value / totalValue) * 100, 3);
            return (
              <div key={stage.status} className="flex items-center gap-4">
                <div className="w-40 shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {stage.status}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${colors.bar} transition-all duration-500`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
                <div className="w-32 shrink-0 text-right">
                  <span className="text-sm font-semibold text-gray-900">{stage.count} quotes</span>
                  <span className="text-sm text-gray-400 ml-2">{formatCurrency(stage.value)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stale quotes callout */}
      {pipeline.some((p) => p.status === "Awaiting Response" && p.count > 5) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Stale Quotes Opportunity</p>
              <p className="text-sm text-amber-700 mt-1">
                {pipeline.find((p) => p.status === "Awaiting Response")?.count} quotes worth{" "}
                {formatCurrency(pipeline.find((p) => p.status === "Awaiting Response")?.value || 0)}{" "}
                are waiting for a customer response. Podium sends generic follow-ups on set days.
                A personalized follow-up referencing the specific quote details could recover a
                significant portion of this pipeline.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Revenue note */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Note:</span> "Quotes Won" means moved to Accepted status
          in SimPro. Actual revenue is tracked in Xero. Phase 2 will integrate Xero for
          finalized revenue numbers.
        </p>
      </div>
    </div>
  );
}
