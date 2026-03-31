"use client";

import { useState } from "react";
import { Bell, RefreshCw } from "lucide-react";
import Sidebar from "@/components/sidebar";
import DateRangePicker from "@/components/date-range-picker";
import OverviewView from "@/components/views/overview";
import TeamView from "@/components/views/team";
import LeadsView from "@/components/views/leads";
import QuotesView from "@/components/views/quotes";
import AlertsView from "@/components/views/alerts";
import type { DateRange } from "@/lib/data";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Key metrics across SimPro and Podium" },
  team: { title: "Team Performance", subtitle: "Response times, close rates, and rep accountability" },
  leads: { title: "Leads", subtitle: "Inbound lead volume, sources, and response tracking" },
  quotes: { title: "Quotes & Revenue", subtitle: "Pipeline status, close rates, and revenue tracking" },
  alerts: { title: "Alerts", subtitle: "Items that need your attention" },
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState("overview");
  const [range, setRange] = useState<DateRange>("7d");

  const { title, subtitle } = pageTitles[page] || pageTitles.overview;

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full bg-gray-50 text-gray-900">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          selected={page}
          setSelected={setPage}
        />

        <div className="flex-1 overflow-auto">
          {/* Page header */}
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="px-8 py-5 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              </div>
              <div className="flex items-center gap-4">
                {page !== "alerts" && (
                  <DateRangePicker range={range} setRange={setRange} />
                )}
                <button className="relative p-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-400 border-l border-gray-200 pl-4">
                  <RefreshCw className="h-3 w-3" />
                  <span>Updated Mon 31 Mar, 6:00 AM AEST</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="px-8 py-8">
            {page === "overview" && <OverviewView range={range} onNavigate={setPage} />}
            {page === "team" && <TeamView range={range} />}
            {page === "leads" && <LeadsView range={range} />}
            {page === "quotes" && <QuotesView range={range} />}
            {page === "alerts" && <AlertsView />}
          </main>

          {/* Footer */}
          <footer className="px-8 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Prototype with sample data. Powered by Sonor AI. Data sources: SimPro + Podium APIs via n8n.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
