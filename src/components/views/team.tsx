"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { DateRange } from "@/lib/data";
import { getReps } from "@/lib/data";

function formatCurrency(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value.toLocaleString()}`;
}

export default function TeamView({ range }: { range: DateRange }) {
  const reps = getReps(range);
  const teamAvgResponse = reps.reduce((sum, r) => sum + r.avgResponseHrs, 0) / reps.length;
  const teamCloseRate =
    reps.reduce((sum, r) => sum + r.quotesWon, 0) /
    Math.max(reps.reduce((sum, r) => sum + r.quotesSent, 0), 1) * 100;

  return (
    <div className="space-y-8">
      {/* Team summary cards */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Team Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Leads Assigned</p>
            <p className="text-2xl font-bold">{reps.reduce((s, r) => s + r.leadsAssigned, 0)}</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Team Avg Response</p>
            <p className={`text-2xl font-bold ${teamAvgResponse > 3 ? "text-amber-600" : "text-emerald-600"}`}>
              {teamAvgResponse.toFixed(1)} hrs
            </p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Team Close Rate</p>
            <p className="text-2xl font-bold">{teamCloseRate.toFixed(1)}%</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Pipeline</p>
            <p className="text-2xl font-bold">{formatCurrency(reps.reduce((s, r) => s + r.pipelineValue, 0))}</p>
          </div>
        </div>
      </div>

      {/* Detailed rep table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Individual Performance</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Sorted by response time. Slow responders lose more leads.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rep
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Response
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quotes Sent
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Won
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Rate
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pipeline
                </th>
                <th className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reps.map((rep) => (
                <tr
                  key={rep.name}
                  className={`transition-colors ${
                    rep.status === "critical" ? "bg-red-50/40" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${
                          rep.status === "excellent"
                            ? "bg-emerald-100 text-emerald-700"
                            : rep.status === "good"
                              ? "bg-blue-100 text-blue-700"
                              : rep.status === "critical"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {rep.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{rep.name}</p>
                        <p className="text-xs text-gray-400">{rep.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">{rep.leadsAssigned}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span
                        className={`text-sm font-semibold ${
                          rep.avgResponseHrs <= 2
                            ? "text-emerald-600"
                            : rep.avgResponseHrs <= 4
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {rep.avgResponseHrs} hrs
                      </span>
                      {rep.avgResponseHrs <= 2 ? (
                        <ArrowDownRight className="h-3.5 w-3.5 text-emerald-500" />
                      ) : rep.avgResponseHrs > 4 ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">{rep.quotesSent}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">{rep.quotesWon}</td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        rep.closeRate >= 40
                          ? "text-emerald-600"
                          : rep.closeRate >= 30
                            ? "text-gray-900"
                            : "text-red-600"
                      }`}
                    >
                      {rep.closeRate > 0 ? `${rep.closeRate}%` : "--"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">{formatCurrency(rep.pipelineValue)}</td>
                  <td className="px-6 py-4 text-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight callout */}
      {reps.some((r) => r.status === "critical") && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Response Time Insight</p>
              <p className="text-sm text-red-700 mt-1">
                {reps.find((r) => r.status === "critical")?.name} is averaging{" "}
                {reps.find((r) => r.status === "critical")?.avgResponseHrs} hours to respond.
                Leads contacted within 1 hour are 7x more likely to convert. This one rep is
                dragging the team average up by{" "}
                {(
                  teamAvgResponse -
                  reps.filter((r) => r.status !== "critical").reduce((s, r) => s + r.avgResponseHrs, 0) /
                    reps.filter((r) => r.status !== "critical").length
                ).toFixed(1)}{" "}
                hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
