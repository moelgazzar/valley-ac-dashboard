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
  ExternalLink,
  ArrowRight,
  Zap,
} from "lucide-react";
import type { DateRange } from "@/lib/data";
import { getKPIs, getReps, getFlags, getLeadSources, getQuotePipeline } from "@/lib/data";

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

const sourceBarColors: Record<string, string> = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

interface OverviewProps {
  range: DateRange;
  onNavigate: (page: string) => void;
}

export default function OverviewView({ range, onNavigate }: OverviewProps) {
  const kpis = getKPIs(range);
  const reps = getReps(range);
  const flags = getFlags().filter((f) => !f.resolved);
  const sources = getLeadSources(range);
  const pipeline = getQuotePipeline(range);

  const awaitingQuotes = pipeline.find((p) => p.status === "Awaiting Response");
  const declinedQuotes = pipeline.find((p) => p.status === "Declined");
  const slowRep = reps.find((r) => r.status === "critical");
  const totalLeads = sources.reduce((s, src) => s + src.count, 0);

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

      {/* Insights bar */}
      {(slowRep || (awaitingQuotes && awaitingQuotes.count > 5)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {slowRep && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <Zap className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">Response Time Problem</p>
                  <p className="text-sm text-red-700 mt-1">
                    {slowRep.name} is averaging {slowRep.avgResponseHrs} hrs to respond with a{" "}
                    {slowRep.closeRate > 0 ? `${slowRep.closeRate}%` : "0%"} close rate.
                    Compare to Jake at 1.8 hrs and 45.5%. Speed directly correlates with revenue.
                  </p>
                  <button
                    onClick={() => onNavigate("team")}
                    className="inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:text-red-900 mt-2"
                  >
                    View Team Performance <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {awaitingQuotes && awaitingQuotes.count > 5 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-800">Money Sitting on the Table</p>
                  <p className="text-sm text-amber-700 mt-1">
                    {awaitingQuotes.count} quotes worth ${(awaitingQuotes.value / 1000).toFixed(1)}k
                    are waiting for a response. Personalized follow-ups could recover a chunk of this.
                  </p>
                  <button
                    onClick={() => onNavigate("quotes")}
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 mt-2"
                  >
                    View Quote Pipeline <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Middle row: Team + Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team snapshot */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Team Snapshot</h3>
              <p className="text-sm text-gray-500 mt-0.5">Response time and close rate at a glance</p>
            </div>
            <button
              onClick={() => onNavigate("team")}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              View Details <ArrowRight className="h-3 w-3" />
            </button>
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

        {/* Lead sources mini */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Lead Sources</h3>
              <p className="text-sm text-gray-500 mt-0.5">{totalLeads} total leads</p>
            </div>
            <button
              onClick={() => onNavigate("leads")}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              Details <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="px-6 py-5 space-y-4">
            {sources.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-600">{src.source}</span>
                  <span className="text-sm font-semibold text-gray-900">{src.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${sourceBarColors[src.color] || "bg-blue-500"} transition-all duration-500`}
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Active alerts */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Active Alerts</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {flags.length} items need attention
            </p>
          </div>
          <button
            onClick={() => onNavigate("alerts")}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            View All <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {flags.slice(0, 4).map((flag) => {
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
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">{flag.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {flag.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            link.color === "blue" ? "text-blue-600 hover:text-blue-800" :
                            link.color === "purple" ? "text-purple-600 hover:text-purple-800" :
                            "text-teal-600 hover:text-teal-800"
                          }`}
                        >
                          {link.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                      <span className="text-xs text-gray-400">{flag.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
