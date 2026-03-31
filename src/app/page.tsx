"use client";

import { useState } from "react";

// --- Dummy data (hardcoded, will be replaced with real API data) ---

const weeklyData = {
  leads: { current: 47, previous: 38 },
  avgResponseTime: { current: 4.2, previous: 3.8 },
  quotesSent: { current: 31, previous: 27 },
  pipelineValue: { current: 187400, previous: 162800 },
  quotesWon: { current: 12, previous: 10 },
  closeRate: { current: 38.7, previous: 37.0 },
};

const monthlyData = {
  leads: { current: 189, previous: 172 },
  avgResponseTime: { current: 3.9, previous: 4.1 },
  quotesSent: { current: 124, previous: 108 },
  pipelineValue: { current: 743200, previous: 681500 },
  quotesWon: { current: 48, previous: 42 },
  closeRate: { current: 38.7, previous: 38.9 },
};

const repData = [
  {
    name: "Jake Thompson",
    role: "Senior Sales",
    leadsAssigned: 14,
    avgResponse: 1.8,
    quotesSent: 11,
    quotesWon: 5,
    closeRate: 45.5,
    pipelineValue: 62400,
    status: "excellent",
  },
  {
    name: "Sarah Mitchell",
    role: "Sales Rep",
    leadsAssigned: 18,
    avgResponse: 3.1,
    quotesSent: 12,
    quotesWon: 5,
    closeRate: 41.7,
    pipelineValue: 71200,
    status: "good",
  },
  {
    name: "Tom Richards",
    role: "Sales Rep",
    leadsAssigned: 8,
    avgResponse: 2.4,
    quotesSent: 5,
    quotesWon: 2,
    closeRate: 40.0,
    pipelineValue: 28600,
    status: "good",
  },
  {
    name: "Dave Coleman",
    role: "Junior Sales",
    leadsAssigned: 7,
    avgResponse: 8.7,
    quotesSent: 3,
    quotesWon: 0,
    closeRate: 0,
    pipelineValue: 25200,
    status: "critical",
  },
];

const recentActivity = [
  {
    type: "flag",
    message:
      'Quote #4821 ($6,200 -- 14kW ducted system) sent 8 days ago, no response. Recommend follow-up.',
    time: "2 hrs ago",
    severity: "warning",
  },
  {
    type: "flag",
    message:
      "Lead from Sarah M. (website, 9:41 AM) -- first human response at 12:08 PM. 2hr 27min delay.",
    time: "Today",
    severity: "critical",
  },
  {
    type: "flag",
    message: "3 invoices overdue >14 days ($7,100 total). Escalation recommended.",
    time: "Today",
    severity: "warning",
  },
  {
    type: "success",
    message: "Jake closed $8,400 ducted install (Quote #4819). Customer via Google.",
    time: "Yesterday",
    severity: "success",
  },
  {
    type: "info",
    message: "New Google review: 5 stars. Overall rating: 4.84 (2,364 reviews).",
    time: "Yesterday",
    severity: "info",
  },
];

// --- Helper functions ---

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toLocaleString()}`;
}

function getChangePercent(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function getResponseColor(hours: number): string {
  if (hours <= 2) return "text-emerald-600";
  if (hours <= 4) return "text-amber-600";
  return "text-red-600";
}

function getStatusBadge(status: string): string {
  switch (status) {
    case "excellent":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "good":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "critical":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getSeverityStyles(severity: string) {
  switch (severity) {
    case "critical":
      return { bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" };
    case "warning":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        dot: "bg-amber-500",
      };
    case "success":
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      };
    default:
      return { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" };
  }
}

// --- Components ---

function KPICard({
  title,
  value,
  previousValue,
  format = "number",
  invertTrend = false,
  unit = "",
}: {
  title: string;
  value: number;
  previousValue: number;
  format?: "number" | "currency" | "percent" | "hours";
  invertTrend?: boolean;
  unit?: string;
}) {
  const change = getChangePercent(value, previousValue);
  const isPositive = invertTrend ? change < 0 : change > 0;
  const isNeutral = Math.abs(change) < 0.5;

  let displayValue: string;
  switch (format) {
    case "currency":
      displayValue = formatCurrency(value);
      break;
    case "percent":
      displayValue = `${value.toFixed(1)}%`;
      break;
    case "hours":
      displayValue = `${value.toFixed(1)}`;
      break;
    default:
      displayValue = value.toString();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight">
          {displayValue}
          {unit && (
            <span className="text-base font-normal text-gray-400 ml-1">
              {unit}
            </span>
          )}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {!isNeutral && (
          <span
            className={`text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}
          >
            {change > 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>
        )}
        <span className="text-xs text-gray-400">vs last period</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data = period === "week" ? weeklyData : monthlyData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Valley Air Conditioning
            </h1>
            <p className="text-sm text-gray-500">Sales Performance Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setPeriod("week")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  period === "week"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setPeriod("month")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  period === "month"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                This Month
              </button>
            </div>
            <div className="text-xs text-gray-400 border-l border-gray-200 pl-3">
              Last updated: Mon 31 Mar, 6:00 AM AEST
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          <KPICard
            title="Inbound Leads"
            value={data.leads.current}
            previousValue={data.leads.previous}
          />
          <KPICard
            title="Avg Response Time"
            value={data.avgResponseTime.current}
            previousValue={data.avgResponseTime.previous}
            format="hours"
            unit="hrs"
            invertTrend={true}
          />
          <KPICard
            title="Quotes Sent"
            value={data.quotesSent.current}
            previousValue={data.quotesSent.previous}
          />
          <KPICard
            title="Pipeline Value"
            value={data.pipelineValue.current}
            previousValue={data.pipelineValue.previous}
            format="currency"
          />
          <KPICard
            title="Close Rate"
            value={data.closeRate.current}
            previousValue={data.closeRate.previous}
            format="percent"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Rep Leaderboard */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                Team Performance
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Response time and close rate by rep
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Rep</th>
                    <th className="px-5 py-3">Leads</th>
                    <th className="px-5 py-3">Avg Response</th>
                    <th className="px-5 py-3">Quotes</th>
                    <th className="px-5 py-3">Won</th>
                    <th className="px-5 py-3">Close Rate</th>
                    <th className="px-5 py-3">Pipeline</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {repData.map((rep) => (
                    <tr
                      key={rep.name}
                      className={`hover:bg-gray-50 transition-colors ${
                        rep.status === "critical" ? "bg-red-50/30" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {rep.name}
                          </p>
                          <p className="text-xs text-gray-400">{rep.role}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm">{rep.leadsAssigned}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-sm font-semibold ${getResponseColor(rep.avgResponse)}`}
                        >
                          {rep.avgResponse} hrs
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm">{rep.quotesSent}</td>
                      <td className="px-5 py-3.5 text-sm font-medium">
                        {rep.quotesWon}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-sm font-semibold ${
                            rep.closeRate >= 40
                              ? "text-emerald-600"
                              : rep.closeRate >= 30
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {rep.closeRate > 0 ? `${rep.closeRate}%` : "--"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm">
                        {formatCurrency(rep.pipelineValue)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(rep.status)}`}
                        >
                          {rep.status === "excellent"
                            ? "On Fire"
                            : rep.status === "good"
                              ? "On Track"
                              : "Needs Attention"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Flags & Activity */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                Flags & Activity
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Items that need attention
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map((item, idx) => {
                const styles = getSeverityStyles(item.severity);
                return (
                  <div key={idx} className="px-5 py-3.5">
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${styles.dot}`}
                      />
                      <div>
                        <p className="text-sm text-gray-700 leading-snug">
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Lead Sources
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Where your leads are coming from this {period}
            </p>
          </div>
          <div className="px-5 py-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { source: "Google Organic", count: period === "week" ? 22 : 89, pct: 46.8, color: "bg-blue-500" },
                { source: "Facebook Ads", count: period === "week" ? 12 : 48, pct: 25.5, color: "bg-indigo-500" },
                { source: "Website Direct", count: period === "week" ? 8 : 32, pct: 17.0, color: "bg-emerald-500" },
                { source: "Referral", count: period === "week" ? 5 : 20, pct: 10.6, color: "bg-amber-500" },
              ].map((src) => (
                <div key={src.source} className="text-center">
                  <p className="text-2xl font-bold">{src.count}</p>
                  <p className="text-sm text-gray-500 mt-1">{src.source}</p>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${src.color}`}
                      style={{ width: `${src.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">
            Prototype with sample data. Powered by Sonor AI. Data sources: SimPro + Podium APIs.
          </p>
        </div>
      </main>
    </div>
  );
}
