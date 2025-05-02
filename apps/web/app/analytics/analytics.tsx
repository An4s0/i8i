"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Visits from "./visits";
import Countries from "./countries";
import Devices from "./devices";
import OperatingSystems from "./os";
import { Link as LinkIcon } from "@/components/icons";

export interface AnalyticsFormat {
  shortCode: string;
  device: string;
  browser: string;
  os: string;
  country: string;
  referrer: string;
  createdAt: string;
}

export default function AnalyticsResults({
  data,
  shortCode,
}: {
  data: [AnalyticsFormat];
  shortCode: string;
}) {
  const options = [
    { label: "Last 24 Hours", value: "24hours" },
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "Last 3 Months", value: "3months" },
    { label: "Last 6 Months", value: "6months" },
    { label: "Last 12 Months", value: "12months" },
  ];

  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: typeof selected) => {
    setSelected(option);
    setOpen(false);
  };

  const visits = data.map((v) => ({
    ...v,
    date: new Date(v.createdAt),
  }));
  const now = new Date();

  const visitsData: Record<string, { label: string; Visits: number }[]> = {
    "24hours": Array.from({ length: 24 }, (_, i) => {
      const hour = (now.getHours() - (23 - i) + 24) % 24;
      const label = `${hour}:00`;

      const start = new Date(now);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(hour + 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label, Visits: count };
    }),

    "7days": Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      const label = date.toLocaleDateString("en-US", { weekday: "short" });

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label, Visits: count };
    }),

    "30days": Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      const label = `Day ${i + 1}`;

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label, Visits: count };
    }),

    "3months": Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (2 - i));
      const month = date.toLocaleString("en-US", { month: "short" });

      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label: month, Visits: count };
    }),

    "6months": Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (5 - i));
      const month = date.toLocaleString("en-US", { month: "short" });

      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label: month, Visits: count };
    }),

    "12months": Array.from({ length: 12 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(date.getMonth() - (11 - i));
      const month = date.toLocaleString("en-US", { month: "long" });

      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const count = visits.filter(
        (v) => v.date >= start && v.date < end,
      ).length;

      return { label: month, Visits: count };
    }),
  };

  function groupByLabel(key: keyof (typeof data)[0]) {
    const map = new Map<string, number>();

    visits.forEach((v) => {
      const value = v[key] || "Unknown";
      map.set(value, (map.get(value) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([label, count]) => ({
        label,
        visits: count,
      }))
      .sort((a, b) => b.visits - a.visits);
  }

  const countriesData = groupByLabel("country");
  const devicesData = groupByLabel("device");
  const operatingSystemsData = groupByLabel("os");

  return (
    <main className="max-w-7xl m-auto space-y-2 p-3">
      <h1 className="text-2xl font-bold mt-5">Analytics</h1>
      <div className="flex justify-between space-x-1">
        <div className="flex items-center space-x-1">
          <LinkIcon className="inline-block text-subtle" size={18} />
          <Link
            href={process.env.NEXT_PUBLIC_BASE_URL + "/c/" + shortCode}
            target="_blank"
          >
            <p className="text-primary font-semibold">
              {process.env.NEXT_PUBLIC_BASE_URL + "/c/" + shortCode}
            </p>
          </Link>
        </div>
        <div className="relative w-48" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="border border-subtle/30 rounded-md p-2 bg-background text-link cursor-pointer justify-between flex"
          >
            {selected?.label}
            <span className="ml-2 text-subtle">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="absolute mt-1 w-full bg-background border border-subtle/30 rounded-md shadow z-10 p-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="p-2 text-link hover:text-link-hover hover:bg-subtle/20 rounded-md cursor-pointer"
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-7xl border border-subtle/30 rounded-md mt-5 h-[400px]">
        <Visits data={visitsData[selected?.value ?? "7days"] || []} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5">
        <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
          <Countries data={countriesData} />
        </div>
        <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
          <Devices data={devicesData} />
        </div>
        <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
          <OperatingSystems data={operatingSystemsData} />
        </div>
      </div>
    </main>
  );
}
