// Sample data for the Valley AC dashboard prototype.
// In production, this data comes from Airtable (populated by n8n from SimPro + Podium APIs).

export type DateRange = "7d" | "30d" | "custom";

// SimPro base URL for deep links (replace with actual client URL)
const SIMPRO_BASE = "https://valleyac.simprosuite.com";
const XERO_BASE = "https://go.xero.com";
const PODIUM_BASE = "https://app.podium.com";

export interface LeadLog {
  id: string;
  date: string;
  customerName: string;
  source: string;
  type: string; // residential, commercial
  jobType: string;
  assignedTo: string;
  podiumResponseMin: number; // AI response time
  humanResponseMin: number; // human follow-up time
  status: string;
  simproLink: string;
  podiumLink: string;
}

export interface QuoteLog {
  id: string;
  quoteNumber: string;
  date: string;
  customerName: string;
  description: string;
  value: number;
  status: "draft" | "sent" | "awaiting" | "accepted" | "declined";
  daysSinceSent: number | null;
  assignedTo: string;
  simproLink: string;
  xeroLink: string | null;
}

// --- Lead logs ---

const leadLogs: LeadLog[] = [
  { id: "L001", date: "2026-03-31", customerName: "Sarah Morrison", source: "Website Direct", type: "Residential", jobType: "Split System Install", assignedTo: "Dave Coleman", podiumResponseMin: 1, humanResponseMin: 147, status: "Awaiting Quote", simproLink: `${SIMPRO_BASE}/leads/8842`, podiumLink: `${PODIUM_BASE}/conversations/c-8842` },
  { id: "L002", date: "2026-03-31", customerName: "James Whitfield", source: "Google Organic", type: "Residential", jobType: "Ducted System Repair", assignedTo: "Jake Thompson", podiumResponseMin: 1, humanResponseMin: 18, status: "Quote Sent", simproLink: `${SIMPRO_BASE}/leads/8841`, podiumLink: `${PODIUM_BASE}/conversations/c-8841` },
  { id: "L003", date: "2026-03-31", customerName: "BNE Property Group", source: "Google Organic", type: "Commercial", jobType: "Multi-unit AC Install", assignedTo: "Sarah Mitchell", podiumResponseMin: 1, humanResponseMin: 42, status: "Quote Sent", simproLink: `${SIMPRO_BASE}/leads/8840`, podiumLink: `${PODIUM_BASE}/conversations/c-8840` },
  { id: "L004", date: "2026-03-30", customerName: "Angela Chen", source: "Facebook Ads", type: "Residential", jobType: "Split System Install", assignedTo: "Tom Richards", podiumResponseMin: 1, humanResponseMin: 34, status: "Quote Sent", simproLink: `${SIMPRO_BASE}/leads/8839`, podiumLink: `${PODIUM_BASE}/conversations/c-8839` },
  { id: "L005", date: "2026-03-30", customerName: "Mark Patterson", source: "Referral", type: "Residential", jobType: "Ducted System Service", assignedTo: "Jake Thompson", podiumResponseMin: 1, humanResponseMin: 12, status: "Job Booked", simproLink: `${SIMPRO_BASE}/leads/8838`, podiumLink: `${PODIUM_BASE}/conversations/c-8838` },
  { id: "L006", date: "2026-03-30", customerName: "Lisa Nguyen", source: "Google Organic", type: "Residential", jobType: "AC Not Cooling", assignedTo: "Dave Coleman", podiumResponseMin: 1, humanResponseMin: 384, status: "Awaiting Contact", simproLink: `${SIMPRO_BASE}/leads/8837`, podiumLink: `${PODIUM_BASE}/conversations/c-8837` },
  { id: "L007", date: "2026-03-29", customerName: "Peter & Jo Albrecht", source: "Google Organic", type: "Residential", jobType: "New Build AC", assignedTo: "Sarah Mitchell", podiumResponseMin: 1, humanResponseMin: 28, status: "Quote Sent", simproLink: `${SIMPRO_BASE}/leads/8836`, podiumLink: `${PODIUM_BASE}/conversations/c-8836` },
  { id: "L008", date: "2026-03-29", customerName: "Sunrise Dental", source: "Website Direct", type: "Commercial", jobType: "AC Maintenance Contract", assignedTo: "Jake Thompson", podiumResponseMin: 1, humanResponseMin: 8, status: "Accepted", simproLink: `${SIMPRO_BASE}/leads/8835`, podiumLink: `${PODIUM_BASE}/conversations/c-8835` },
  { id: "L009", date: "2026-03-28", customerName: "David Okonkwo", source: "Facebook Ads", type: "Residential", jobType: "Split System Replace", assignedTo: "Dave Coleman", podiumResponseMin: 1, humanResponseMin: 2700, status: "Lost - No Response", simproLink: `${SIMPRO_BASE}/leads/8834`, podiumLink: `${PODIUM_BASE}/conversations/c-8834` },
  { id: "L010", date: "2026-03-28", customerName: "Karen Williams", source: "Google Organic", type: "Residential", jobType: "Ducted Zoning", assignedTo: "Tom Richards", podiumResponseMin: 1, humanResponseMin: 45, status: "Quote Sent", simproLink: `${SIMPRO_BASE}/leads/8833`, podiumLink: `${PODIUM_BASE}/conversations/c-8833` },
  { id: "L011", date: "2026-03-27", customerName: "Southside Physio", source: "Referral", type: "Commercial", jobType: "AC Install x3 rooms", assignedTo: "Sarah Mitchell", podiumResponseMin: 1, humanResponseMin: 22, status: "Accepted", simproLink: `${SIMPRO_BASE}/leads/8832`, podiumLink: `${PODIUM_BASE}/conversations/c-8832` },
  { id: "L012", date: "2026-03-26", customerName: "Ryan & Mel Douglas", source: "Facebook Ads", type: "Residential", jobType: "Whole Home Ducted", assignedTo: "Jake Thompson", podiumResponseMin: 1, humanResponseMin: 15, status: "Accepted", simproLink: `${SIMPRO_BASE}/leads/8831`, podiumLink: `${PODIUM_BASE}/conversations/c-8831` },
];

// --- Quote logs ---

const quoteLogs: QuoteLog[] = [
  { id: "Q001", quoteNumber: "4825", date: "2026-03-31", customerName: "James Whitfield", description: "Ducted system repair - compressor replacement", value: 3200, status: "sent", daysSinceSent: 0, assignedTo: "Jake Thompson", simproLink: `${SIMPRO_BASE}/quotes/4825`, xeroLink: null },
  { id: "Q002", quoteNumber: "4824", date: "2026-03-31", customerName: "BNE Property Group", description: "Multi-unit AC install - 6 units, commercial", value: 28400, status: "sent", daysSinceSent: 0, assignedTo: "Sarah Mitchell", simproLink: `${SIMPRO_BASE}/quotes/4824`, xeroLink: null },
  { id: "Q003", quoteNumber: "4823", date: "2026-03-30", customerName: "Angela Chen", description: "7.5kW split system install - master bedroom", value: 3800, status: "sent", daysSinceSent: 1, assignedTo: "Tom Richards", simproLink: `${SIMPRO_BASE}/quotes/4823`, xeroLink: null },
  { id: "Q004", quoteNumber: "4822", date: "2026-03-29", customerName: "Peter & Jo Albrecht", description: "New build ducted - 5 zones, 16kW", value: 14200, status: "sent", daysSinceSent: 2, assignedTo: "Sarah Mitchell", simproLink: `${SIMPRO_BASE}/quotes/4822`, xeroLink: null },
  { id: "Q005", quoteNumber: "4821", date: "2026-03-23", customerName: "Michael Torres", description: "14kW ducted system - full install", value: 6200, status: "awaiting", daysSinceSent: 8, assignedTo: "Tom Richards", simproLink: `${SIMPRO_BASE}/quotes/4821`, xeroLink: null },
  { id: "Q006", quoteNumber: "4820", date: "2026-03-28", customerName: "Karen Williams", description: "Ducted zoning upgrade - 3 zones to 5", value: 4600, status: "sent", daysSinceSent: 3, assignedTo: "Tom Richards", simproLink: `${SIMPRO_BASE}/quotes/4820`, xeroLink: null },
  { id: "Q007", quoteNumber: "4819", date: "2026-03-25", customerName: "Ryan & Mel Douglas", description: "Whole home ducted - 18kW, 6 zones", value: 8400, status: "accepted", daysSinceSent: null, assignedTo: "Jake Thompson", simproLink: `${SIMPRO_BASE}/quotes/4819`, xeroLink: `${XERO_BASE}/AccountsReceivable/Edit/INV-2847` },
  { id: "Q008", quoteNumber: "4818", date: "2026-03-24", customerName: "Sunrise Dental", description: "Commercial AC maintenance - annual contract", value: 5200, status: "accepted", daysSinceSent: null, assignedTo: "Jake Thompson", simproLink: `${SIMPRO_BASE}/quotes/4818`, xeroLink: `${XERO_BASE}/AccountsReceivable/Edit/INV-2846` },
  { id: "Q009", quoteNumber: "4817", date: "2026-03-22", customerName: "Greg Hoffman", description: "Split system install - living room 5kW", value: 2800, status: "declined", daysSinceSent: null, assignedTo: "Dave Coleman", simproLink: `${SIMPRO_BASE}/quotes/4817`, xeroLink: null },
  { id: "Q010", quoteNumber: "4816", date: "2026-03-21", customerName: "Southside Physio", description: "Split system x3 - consultation rooms", value: 9600, status: "accepted", daysSinceSent: null, assignedTo: "Sarah Mitchell", simproLink: `${SIMPRO_BASE}/quotes/4816`, xeroLink: `${XERO_BASE}/AccountsReceivable/Edit/INV-2844` },
  { id: "Q011", quoteNumber: "4815", date: "2026-03-19", customerName: "Nina Petrova", description: "Split system x2 - bedrooms", value: 4800, status: "awaiting", daysSinceSent: 12, assignedTo: "Sarah Mitchell", simproLink: `${SIMPRO_BASE}/quotes/4815`, xeroLink: null },
  { id: "Q012", quoteNumber: "4814", date: "2026-03-18", customerName: "Chris & Tanya Boyd", description: "Ducted system replacement - 14kW", value: 7200, status: "accepted", daysSinceSent: null, assignedTo: "Jake Thompson", simproLink: `${SIMPRO_BASE}/quotes/4814`, xeroLink: `${XERO_BASE}/AccountsReceivable/Edit/INV-2842` },
];

export function getLeadLogs(range: DateRange): LeadLog[] {
  if (range === "7d") return leadLogs.slice(0, 8);
  return leadLogs;
}

export function getQuoteLogs(range: DateRange): QuoteLog[] {
  if (range === "7d") return quoteLogs.slice(0, 8);
  return quoteLogs;
}

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
  links: { label: string; url: string; color: string }[];
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
  { id: "1", date: "2026-03-31", severity: "critical", category: "response-time", message: "Dave Coleman: 3 leads uncontacted for 6+ hours today. Avg response time this week: 8.7 hrs.", resolved: false, links: [{ label: "View Leads in SimPro", url: `${SIMPRO_BASE}/leads/?assignee=dave-coleman&status=uncontacted`, color: "blue" }, { label: "Podium Conversations", url: `${PODIUM_BASE}/inbox/?assignee=dave-coleman`, color: "purple" }] },
  { id: "2", date: "2026-03-31", severity: "critical", category: "response-time", message: "Lead from Sarah M. (website, 9:41 AM): first human response at 12:08 PM. 2hr 27min gap.", resolved: false, links: [{ label: "Lead in SimPro", url: `${SIMPRO_BASE}/leads/8842`, color: "blue" }, { label: "Podium Chat", url: `${PODIUM_BASE}/conversations/c-8842`, color: "purple" }] },
  { id: "3", date: "2026-03-30", severity: "warning", category: "stale-quote", message: "Quote #4821 ($6,200, 14kW ducted): sent 8 days ago, no customer response. Podium auto-text sent day 3, no reply.", resolved: false, links: [{ label: "Quote in SimPro", url: `${SIMPRO_BASE}/quotes/4821`, color: "blue" }, { label: "Podium Chat", url: `${PODIUM_BASE}/conversations/c-4821`, color: "purple" }] },
  { id: "4", date: "2026-03-30", severity: "warning", category: "overdue-invoice", message: "3 invoices overdue >14 days ($7,100 total). Podium reminder texts sent, no payment.", resolved: false, links: [{ label: "Overdue in SimPro", url: `${SIMPRO_BASE}/invoices/?status=overdue&days=14`, color: "blue" }, { label: "Xero Aged Receivables", url: `${XERO_BASE}/Reports/AgedReceivables`, color: "teal" }] },
  { id: "5", date: "2026-03-29", severity: "success", category: "win", message: "Jake closed $8,400 ducted install (Quote #4819). Customer source: Google organic. Response time: 22 min.", resolved: true, links: [{ label: "Quote in SimPro", url: `${SIMPRO_BASE}/quotes/4819`, color: "blue" }, { label: "Invoice in Xero", url: `${XERO_BASE}/AccountsReceivable/Edit/INV-2847`, color: "teal" }] },
  { id: "6", date: "2026-03-29", severity: "info", category: "review", message: "New Google review: 5 stars from recent install. Overall: 4.84 (2,364 reviews).", resolved: true, links: [{ label: "View in Podium", url: `${PODIUM_BASE}/reviews`, color: "purple" }] },
  { id: "7", date: "2026-03-28", severity: "warning", category: "stale-quote", message: "Quote #4815 ($4,800, split system x2): sent 12 days ago, customer said 'thinking about it' on day 5. No follow-up since.", resolved: false, links: [{ label: "Quote in SimPro", url: `${SIMPRO_BASE}/quotes/4815`, color: "blue" }, { label: "Podium Chat", url: `${PODIUM_BASE}/conversations/c-4815`, color: "purple" }] },
  { id: "8", date: "2026-03-27", severity: "critical", category: "response-time", message: "Dave Coleman: lead from Facebook (3:12 PM Friday) not contacted until Monday 10:30 AM. 45+ hour gap.", resolved: false, links: [{ label: "Lead in SimPro", url: `${SIMPRO_BASE}/leads/8834`, color: "blue" }, { label: "Podium Chat", url: `${PODIUM_BASE}/conversations/c-8834`, color: "purple" }] },
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
