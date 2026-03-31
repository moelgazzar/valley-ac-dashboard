"use client";

import { Calendar, ChevronDown } from "lucide-react";
import type { DateRange } from "@/lib/data";

interface DateRangePickerProps {
  range: DateRange;
  setRange: (range: DateRange) => void;
}

export default function DateRangePicker({ range, setRange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-gray-100 rounded-lg p-0.5">
        <button
          onClick={() => setRange("7d")}
          className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            range === "7d"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Last 7 days
        </button>
        <button
          onClick={() => setRange("30d")}
          className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            range === "30d"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Last 30 days
        </button>
      </div>
      <button
        onClick={() => setRange("custom")}
        className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
          range === "custom"
            ? "border-blue-300 bg-blue-50 text-blue-700"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
        }`}
      >
        <Calendar className="h-4 w-4" />
        <span>Custom Range</span>
        <ChevronDown className="h-3 w-3" />
      </button>
    </div>
  );
}
