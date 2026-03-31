"use client";

import { ExternalLink } from "lucide-react";
import type { DateRange } from "@/lib/data";
import { getLeadSources, getKPIs, getLeadLogs } from "@/lib/data";

const sourceColorMap: Record<string, { bar: string; bg: string; text: string }> = {
  blue: { bar: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
  indigo: { bar: "bg-indigo-500", bg: "bg-indigo-50", text: "text-indigo-700" },
  emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  amber: { bar: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
};

function formatResponseTime(minutes: number): { text: string; color: string } {
  if (minutes < 60) return { text: `${minutes} min`, color: "text-emerald-600" };
  const hrs = (minutes / 60).toFixed(1);
  if (minutes <= 120) return { text: `${hrs} hrs`, color: "text-emerald-600" };
  if (minutes <= 240) return { text: `${hrs} hrs`, color: "text-amber-600" };
  return { text: `${hrs} hrs`, color: "text-red-600" };
}

export default function LeadsView({ range }: { range: DateRange }) {
  const sources = getLeadSources(range);
  const kpis = getKPIs(range);
  const leadLogs = getLeadLogs(range);
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

      {/* Lead log table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Lead Log</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            All leads for the selected period. Click links to open in SimPro or Podium.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Human Response</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leadLogs.map((lead) => {
                const response = formatResponseTime(lead.humanResponseMin);
                return (
                  <tr key={lead.id} className={`hover:bg-gray-50 transition-colors ${lead.humanResponseMin > 240 ? "bg-red-50/30" : ""}`}>
                    <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">{lead.date}</td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-gray-900">{lead.customerName}</p>
                      <p className="text-xs text-gray-400">{lead.type}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        lead.source === "Google Organic" ? "bg-blue-50 text-blue-700" :
                        lead.source === "Facebook Ads" ? "bg-indigo-50 text-indigo-700" :
                        lead.source === "Website Direct" ? "bg-emerald-50 text-emerald-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{lead.jobType}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{lead.assignedTo}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-sm font-semibold ${response.color}`}>{response.text}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        lead.status === "Accepted" || lead.status === "Job Booked" ? "bg-emerald-50 text-emerald-700" :
                        lead.status === "Lost - No Response" ? "bg-red-50 text-red-700" :
                        lead.status === "Awaiting Contact" ? "bg-red-50 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <a href={lead.simproLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
                          SimPro <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={lead.podiumLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium">
                          Podium <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
