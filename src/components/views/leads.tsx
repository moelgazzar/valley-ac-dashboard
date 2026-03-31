"use client";

import type { DateRange } from "@/lib/data";
import { getLeadSources, getKPIs } from "@/lib/data";

const sourceColorMap: Record<string, { bar: string; bg: string; text: string }> = {
  blue: { bar: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
  indigo: { bar: "bg-indigo-500", bg: "bg-indigo-50", text: "text-indigo-700" },
  emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  amber: { bar: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
};

export default function LeadsView({ range }: { range: DateRange }) {
  const sources = getLeadSources(range);
  const kpis = getKPIs(range);
  const totalLeads = sources.reduce((s, src) => s + src.count, 0);
  const avgResponse = kpis.find((k) => k.label === "Avg Response Time");

  return (
    <div className="space-y-8">
      {/* Lead overview cards */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Lead Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Inbound Leads</p>
            <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
            <p className="text-sm text-emerald-600 mt-2">
              +{kpis[0]?.change.toFixed(1)}% vs previous period
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Avg Human Response Time</p>
            <p className={`text-3xl font-bold ${parseFloat(avgResponse?.value || "0") > 3 ? "text-amber-600" : "text-emerald-600"}`}>
              {avgResponse?.value}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Time from Podium AI handoff to first human contact
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Top Source</p>
            <p className="text-3xl font-bold text-gray-900">{sources[0]?.source}</p>
            <p className="text-sm text-gray-500 mt-2">
              {sources[0]?.count} leads ({sources[0]?.percentage}%)
            </p>
          </div>
        </div>
      </div>

      {/* Lead sources breakdown */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Lead Sources</h3>
          <p className="text-sm text-gray-500 mt-0.5">Where your leads are coming from</p>
        </div>
        <div className="p-6 space-y-5">
          {sources.map((src) => {
            const colors = sourceColorMap[src.color] || sourceColorMap.blue;
            return (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}>
                      {src.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-gray-900">{src.count} leads</span>
                    <span className="text-gray-400 w-12 text-right">{src.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response time context */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Why Response Time Matters</p>
            <p className="text-sm text-blue-700 mt-1">
              Podium AI handles the initial contact instantly. The metric tracked here is
              how long it takes a human team member to follow up after Podium qualifies the lead.
              Industry data shows responding within 5 minutes makes you 21x more likely to
              qualify. Your team average of {avgResponse?.value} means leads are cooling off
              before anyone picks up the phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
