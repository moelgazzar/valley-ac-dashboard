"use client";

import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  UserSearch,
  FileText,
  AlertTriangle,
  ChevronsRight,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: string;
  setSelected: (page: string) => void;
}

export default function Sidebar({ open, setOpen, selected, setSelected }: SidebarProps) {
  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-16"
      } border-gray-200 bg-white p-2 shadow-sm flex flex-col`}
    >
      {/* Brand */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center rounded-md p-2">
          {open ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
              alt="Valley Air Conditioning & Electrical"
              width={200}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-blue-700 shadow-sm">
              <span className="text-white font-bold text-sm">VA</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-1 flex-1">
        <NavItem
          icon={LayoutDashboard}
          title="Overview"
          selected={selected === "overview"}
          onClick={() => setSelected("overview")}
          open={open}
        />
        <NavItem
          icon={Users}
          title="Team Performance"
          selected={selected === "team"}
          onClick={() => setSelected("team")}
          open={open}
          badge={1}
        />
        <NavItem
          icon={UserSearch}
          title="Leads"
          selected={selected === "leads"}
          onClick={() => setSelected("leads")}
          open={open}
        />
        <NavItem
          icon={FileText}
          title="Quotes & Revenue"
          selected={selected === "quotes"}
          onClick={() => setSelected("quotes")}
          open={open}
        />
        <NavItem
          icon={AlertTriangle}
          title="Alerts"
          selected={selected === "alerts"}
          onClick={() => setSelected("alerts")}
          open={open}
          badge={4}
        />
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="border-t border-gray-200 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center p-3">
          <div className="grid size-10 place-content-center">
            <ChevronsRight
              className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          {open && <span className="text-sm font-medium text-gray-600">Collapse</span>}
        </div>
      </button>
    </nav>
  );
}

function NavItem({
  icon: Icon,
  title,
  selected,
  onClick,
  open,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  selected: boolean;
  onClick: () => void;
  open: boolean;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        selected
          ? "bg-blue-50 text-blue-700 shadow-sm border-l-2 border-blue-500"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && <span className="text-sm font-medium">{title}</span>}
      {badge && open && (
        <span className="absolute right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium px-1">
          {badge}
        </span>
      )}
    </button>
  );
}
