"use client";

import {
  Users,
  Clock,
  FileText,
  DollarSign,
  CheckCircle,
  Target,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { DateRange } from "@/lib/data";
import { getKPIs, getReps, getFlags } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  clock: Clock,
  "file-text": FileText,
  "dollar-sign": DollarSign,
  "check-circle": CheckCircle,
  target: Target,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600" },
  green: { bg: "bg-green-50", text: "text-green-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
};

export default function OverviewView({ range }: { range: DateRange }) {
  const kpis = getKPIs(range);
  const reps = getReps(range);
  const flags = getFlags().filter((f) => !f.resolved).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* KPI Grid */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {kpis.map((kpi) => {
            const Icon = iconMap[kpi.icon] || Target;
            const colors = colorMap[kpi.color] || colorMap.blue;
            const isResponseTime = kpi.label === "Avg Response Time";
            const isPositive = isResponseTime ? kpi.change < 0 : kpi.change > 0;

            return (
              <div
                key={kpi.label}
                className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${colors.bg}`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm mt-2 ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change.toFixed(1)}%{" "}
                  <span className="text-gray-400 font-normal">{kpi.changeLabel}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Quick team snapshot + Recent alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Team snapshot */}
        <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Team Snapshot</h3>
              <p className="text-sm text-gray-500 mt-0.5">Response time and close rate at a glance</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {reps.map((rep) => (
              <div
                key={rep.name}
                className={`px-6 py-4 flex items-center justify-between ${
                  rep.status === "critical" ? "bg-red-50/40" : "hover:bg-gray-50"
                } transition-colors`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      rep.status === "excellent"
                        ? "bg-emerald-100 text-emerald-700"
                        : rep.status === "good"
                          ? "bg-blue-100 text-blue-700"
                          : rep.status === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rep.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{rep.name}</p>
                    <p className="text-xs text-gray-400">{rep.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-sm">
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        rep.avgResponseHrs <= 2
                          ? "text-emerald-600"
                          : rep.avgResponseHrs <= 4
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {rep.avgResponseHrs} hrs
                    </p>
                    <p className="text-xs text-gray-400">response</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {rep.closeRate > 0 ? `${rep.closeRate}%` : "--"}
                    </p>
                    <p className="text-xs text-gray-400">close rate</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      rep.status === "excellent"
                        ? "bg-emerald-50 text-emerald-700"
                        : rep.status === "good"
                          ? "bg-blue-50 text-blue-700"
                          : rep.status === "warning"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                    }`}
                  >
                    {rep.status === "excellent"
                      ? "On Fire"
                      : rep.status === "good"
                        ? "On Track"
                        : rep.status === "warning"
                          ? "Slow"
                          : "Needs Attention"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Active Alerts</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {flags.length} items need attention
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {flags.map((flag) => {
              const dotColor =
                flag.severity === "critical"
                  ? "bg-red-500"
                  : flag.severity === "warning"
                    ? "bg-amber-500"
                    : "bg-blue-500";
              return (
                <div key={flag.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">{flag.message}</p>
                      <p className="text-xs text-gray-400 mt-1.5">{flag.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
