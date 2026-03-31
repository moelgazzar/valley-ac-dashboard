"use client";

import { AlertTriangle, Clock, FileText, Star, Trophy } from "lucide-react";
import { getFlags } from "@/lib/data";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "response-time": Clock,
  "stale-quote": FileText,
  "overdue-invoice": AlertTriangle,
  review: Star,
  win: Trophy,
};

const categoryLabels: Record<string, string> = {
  "response-time": "Response Time",
  "stale-quote": "Stale Quote",
  "overdue-invoice": "Overdue Invoice",
  review: "Review",
  win: "Win",
};

const severityStyles: Record<string, { bg: string; border: string; dot: string; badge: string }> = {
  critical: { bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", badge: "bg-red-100 text-red-700" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  info: { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  success: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
};

export default function AlertsView() {
  const flags = getFlags();
  const unresolved = flags.filter((f) => !f.resolved);
  const resolved = flags.filter((f) => f.resolved);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Alert Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl border border-red-200 bg-red-50 shadow-sm">
            <p className="text-sm text-red-600 mb-1">Critical</p>
            <p className="text-2xl font-bold text-red-700">
              {flags.filter((f) => f.severity === "critical" && !f.resolved).length}
            </p>
          </div>
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50 shadow-sm">
            <p className="text-sm text-amber-600 mb-1">Warnings</p>
            <p className="text-2xl font-bold text-amber-700">
              {flags.filter((f) => f.severity === "warning" && !f.resolved).length}
            </p>
          </div>
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 shadow-sm">
            <p className="text-sm text-emerald-600 mb-1">Resolved Today</p>
            <p className="text-2xl font-bold text-emerald-700">{resolved.length}</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Active</p>
            <p className="text-2xl font-bold text-gray-900">{unresolved.length}</p>
          </div>
        </div>
      </div>

      {/* Active alerts */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Active Alerts</h3>
          <p className="text-sm text-gray-500 mt-0.5">Items that need attention now</p>
        </div>
        <div className="divide-y divide-gray-100">
          {unresolved.map((flag) => {
            const styles = severityStyles[flag.severity];
            const Icon = categoryIcons[flag.category] || AlertTriangle;
            return (
              <div key={flag.id} className={`px-6 py-5 ${styles.bg}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${styles.badge}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles.badge}`}>
                        {flag.severity}
                      </span>
                      <span className="text-xs text-gray-400">
                        {categoryLabels[flag.category]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{flag.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{flag.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Recently Resolved</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {resolved.map((flag) => {
              const Icon = categoryIcons[flag.category] || AlertTriangle;
              return (
                <div key={flag.id} className="px-6 py-4 opacity-60">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Icon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 line-through leading-relaxed">
                        {flag.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{flag.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
