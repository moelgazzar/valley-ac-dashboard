// Sample data for the Valley AC dashboard prototype.
// In production, this data comes from Airtable (populated by n8n from SimPro + Podium APIs).

export type DateRange = "7d" | "30d" | "custom";

export interface KPI {
  label: string;
  value: string;
  change: number; // percentage
  changeLabel: string;
  icon: string;
  color: string;
}

export interface RepPerformance {
  name: string;
  role: string;
  leadsAssigned: number;
  avgResponseHrs: number;
  quotesSent: number;
  quotesWon: number;
  closeRate: number;
  pipelineValue: number;
  status: "excellent" | "good" | "warning" | "critical";
}

export interface Flag {
  id: string;
  date: string;
  severity: "critical" | "warning" | "info" | "success";
  category: "response-time" | "stale-quote" | "overdue-invoice" | "review" | "win";
  message: string;
  resolved: boolean;
}

export interface LeadSource {
  source: string;
  count: number;
  percentage: number;
  color: string;
}

export interface QuotePipeline {
  status: string;
  count: number;
  value: number;
  color: string;
}

// --- 7-day data ---

const kpis7d: KPI[] = [
  { label: "Inbound Leads", value: "47", change: 23.7, changeLabel: "vs prev 7 days", icon: "users", color: "blue" },
  { label: "Avg Response Time", value: "4.2 hrs", change: 10.5, changeLabel: "vs prev 7 days", icon: "clock", color: "amber" },
  { label: "Quotes Sent", value: "31", change: 14.8, changeLabel: "vs prev 7 days", icon: "file-text", color: "purple" },
  { label: "Pipeline Value", value: "$187.4k", change: 15.1, changeLabel: "vs prev 7 days", icon: "dollar-sign", color: "green" },
  { label: "Quotes Won", value: "12", change: 20.0, changeLabel: "vs prev 7 days", icon: "check-circle", color: "emerald" },
  { label: "Close Rate", value: "38.7%", change: 4.6, changeLabel: "vs prev 7 days", icon: "target", color: "indigo" },
];

const kpis30d: KPI[] = [
  { label: "Inbound Leads", value: "189", change: 9.9, changeLabel: "vs prev 30 days", icon: "users", color: "blue" },
  { label: "Avg Response Time", value: "3.9 hrs", change: -4.9, changeLabel: "vs prev 30 days", icon: "clock", color: "amber" },
  { label: "Quotes Sent", value: "124", change: 14.8, changeLabel: "vs prev 30 days", icon: "file-text", color: "purple" },
  { label: "Pipeline Value", value: "$743.2k", change: 9.1, changeLabel: "vs prev 30 days", icon: "dollar-sign", color: "green" },
  { label: "Quotes Won", value: "48", change: 14.3, changeLabel: "vs prev 30 days", icon: "check-circle", color: "emerald" },
  { label: "Close Rate", value: "38.7%", change: -0.5, changeLabel: "vs prev 30 days", icon: "target", color: "indigo" },
];

const reps7d: RepPerformance[] = [
  { name: "Jake Thompson", role: "Senior Sales", leadsAssigned: 14, avgResponseHrs: 1.8, quotesSent: 11, quotesWon: 5, closeRate: 45.5, pipelineValue: 62400, status: "excellent" },
  { name: "Sarah Mitchell", role: "Sales Rep", leadsAssigned: 18, avgResponseHrs: 3.1, quotesSent: 12, quotesWon: 5, closeRate: 41.7, pipelineValue: 71200, status: "good" },
  { name: "Tom Richards", role: "Sales Rep", leadsAssigned: 8, avgResponseHrs: 2.4, quotesSent: 5, quotesWon: 2, closeRate: 40.0, pipelineValue: 28600, status: "good" },
  { name: "Dave Coleman", role: "Junior Sales", leadsAssigned: 7, avgResponseHrs: 8.7, quotesSent: 3, quotesWon: 0, closeRate: 0, pipelineValue: 25200, status: "critical" },
];

const reps30d: RepPerformance[] = [
  { name: "Jake Thompson", role: "Senior Sales", leadsAssigned: 56, avgResponseHrs: 1.6, quotesSent: 42, quotesWon: 19, closeRate: 45.2, pipelineValue: 248600, status: "excellent" },
  { name: "Sarah Mitchell", role: "Sales Rep", leadsAssigned: 68, avgResponseHrs: 2.9, quotesSent: 48, quotesWon: 18, closeRate: 37.5, pipelineValue: 284800, status: "good" },
  { name: "Tom Richards", role: "Sales Rep", leadsAssigned: 34, avgResponseHrs: 2.8, quotesSent: 20, quotesWon: 8, closeRate: 40.0, pipelineValue: 114400, status: "good" },
  { name: "Dave Coleman", role: "Junior Sales", leadsAssigned: 31, avgResponseHrs: 7.2, quotesSent: 14, quotesWon: 3, closeRate: 21.4, pipelineValue: 95400, status: "critical" },
];

const flags: Flag[] = [
  { id: "1", date: "2026-03-31", severity: "critical", category: "response-time", message: "Dave Coleman: 3 leads uncontacted for 6+ hours today. Avg response time this week: 8.7 hrs.", resolved: false },
  { id: "2", date: "2026-03-31", severity: "critical", category: "response-time", message: "Lead from Sarah M. (website, 9:41 AM): first human response at 12:08 PM. 2hr 27min gap.", resolved: false },
  { id: "3", date: "2026-03-30", severity: "warning", category: "stale-quote", message: "Quote #4821 ($6,200, 14kW ducted): sent 8 days ago, no customer response. Podium auto-text sent day 3, no reply.", resolved: false },
  { id: "4", date: "2026-03-30", severity: "warning", category: "overdue-invoice", message: "3 invoices overdue >14 days ($7,100 total). Podium reminder texts sent, no payment.", resolved: false },
  { id: "5", date: "2026-03-29", severity: "success", category: "win", message: "Jake closed $8,400 ducted install (Quote #4819). Customer source: Google organic. Response time: 22 min.", resolved: true },
  { id: "6", date: "2026-03-29", severity: "info", category: "review", message: "New Google review: 5 stars from recent install. Overall: 4.84 (2,364 reviews).", resolved: true },
  { id: "7", date: "2026-03-28", severity: "warning", category: "stale-quote", message: "Quote #4815 ($4,800, split system x2): sent 12 days ago, customer said 'thinking about it' on day 5. No follow-up since.", resolved: false },
  { id: "8", date: "2026-03-27", severity: "critical", category: "response-time", message: "Dave Coleman: lead from Facebook (3:12 PM Friday) not contacted until Monday 10:30 AM. 45+ hour gap.", resolved: false },
];

const leadSources7d: LeadSource[] = [
  { source: "Google Organic", count: 22, percentage: 46.8, color: "blue" },
  { source: "Facebook Ads", count: 12, percentage: 25.5, color: "indigo" },
  { source: "Website Direct", count: 8, percentage: 17.0, color: "emerald" },
  { source: "Referral", count: 5, percentage: 10.6, color: "amber" },
];

const leadSources30d: LeadSource[] = [
  { source: "Google Organic", count: 89, percentage: 47.1, color: "blue" },
  { source: "Facebook Ads", count: 48, percentage: 25.4, color: "indigo" },
  { source: "Website Direct", count: 32, percentage: 16.9, color: "emerald" },
  { source: "Referral", count: 20, percentage: 10.6, color: "amber" },
];

const quotePipeline7d: QuotePipeline[] = [
  { status: "Draft", count: 4, value: 24600, color: "gray" },
  { status: "Sent", count: 12, value: 78400, color: "blue" },
  { status: "Awaiting Response", count: 8, value: 52200, color: "amber" },
  { status: "Accepted", count: 12, value: 87400, color: "emerald" },
  { status: "Declined", count: 3, value: 18200, color: "red" },
];

const quotePipeline30d: QuotePipeline[] = [
  { status: "Draft", count: 14, value: 92400, color: "gray" },
  { status: "Sent", count: 38, value: 248600, color: "blue" },
  { status: "Awaiting Response", count: 24, value: 156800, color: "amber" },
  { status: "Accepted", count: 48, value: 348200, color: "emerald" },
  { status: "Declined", count: 14, value: 89600, color: "red" },
];

export function getKPIs(range: DateRange): KPI[] {
  return range === "7d" ? kpis7d : kpis30d;
}

export function getReps(range: DateRange): RepPerformance[] {
  return range === "7d" ? reps7d : reps30d;
}

export function getFlags(): Flag[] {
  return flags;
}

export function getLeadSources(range: DateRange): LeadSource[] {
  return range === "7d" ? leadSources7d : leadSources30d;
}

export function getQuotePipeline(range: DateRange): QuotePipeline[] {
  return range === "7d" ? quotePipeline7d : quotePipeline30d;
}
