'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link"
import Visits from "./visits"
import Countries from "./countries"
import Devices from "./devices"
import Browsers from "./referrers";
import { Link as LinkIcon } from "@/components/icons"

export default function Analytics() {
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
    const url = "https://i8i.pw/abc12";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    const analyticsData: Record<string, { label: string, Visits: number }[]> = {
        "24hours": Array.from({ length: 24 }, (_, i) => ({
            label: `${i}:00`,
            Visits: Math.floor(Math.random() * 200 + 50),
        })),

        "7days": [
            { label: "Sat", Visits: 900 },
            { label: "Sun", Visits: 1100 },
            { label: "Mon", Visits: 1500 },
            { label: "Tue", Visits: 1200 },
            { label: "Wed", Visits: 1400 },
            { label: "Thu", Visits: 1700 },
            { label: "Fri", Visits: 1600 },
        ],

        "30days": Array.from({ length: 30 }, (_, i) => ({
            label: `Day ${i + 1}`,
            Visits: Math.floor(Math.random() * 2000 + 1000),
        })),

        "3months": [
            { label: "Jan", Visits: 13000 },
            { label: "Feb", Visits: 12500 },
            { label: "Mar", Visits: 14000 },
        ],

        "6months": [
            { label: "Jan", Visits: 13000 },
            { label: "Feb", Visits: 12500 },
            { label: "Mar", Visits: 14000 },
            { label: "Apr", Visits: 15000 },
            { label: "May", Visits: 16000 },
            { label: "Jun", Visits: 14500 },
        ],

        "12months": [
            { label: 'January', Visits: 3200 },
            { label: 'February', Visits: 2800 },
            { label: 'March', Visits: 4500 },
            { label: 'April', Visits: 3900 },
            { label: 'May', Visits: 5200 },
            { label: 'June', Visits: 4800 },
            { label: 'July', Visits: 6100 },
            { label: 'August', Visits: 5700 },
            { label: 'September', Visits: 4900 },
            { label: 'October', Visits: 5300 },
            { label: 'November', Visits: 4600 },
            { label: 'December', Visits: 5800 },
        ],
    };

    const countriesData = [
        { label: "United States", visits: 5000 },
        { label: "India", visits: 3000 },
        { label: "Germany", visits: 2000 },
        { label: "France", visits: 1500 },
        { label: "United Kingdom", visits: 1000 },
    ];

    const devicesData = [
        { label: "Desktop", visits: 6000 },
        { label: "Mobile", visits: 4000 },
        { label: "Tablet", visits: 2000 },
    ];

    const referrersData = [
        { label: "Google", visits: 7000 },
        { label: "Facebook", visits: 3000 },
        { label: "Twitter", visits: 2000 },
        { label: "LinkedIn", visits: 1000 },
    ];

    return (
        <main className="max-w-7xl m-auto space-y-2 p-3">
            <h1 className="text-2xl font-bold mt-5">Analytics</h1>
            <div className="flex justify-between space-x-1">
                <div className="flex items-center space-x-1">
                    <LinkIcon className="inline-block text-subtle" size={18} />
                    <Link href={url} target="_blank">
                        <p className="text-primary font-semibold">
                            {url}
                        </p>
                    </Link>
                </div>
                <div className="relative w-48" ref={dropdownRef}>
                    <div
                        onClick={() => setOpen(!open)}
                        className="border border-subtle/30 rounded-md p-2 bg-background text-link cursor-pointer justify-between flex"
                    >
                        {selected.label}
                        <span className="ml-2 text-subtle">
                            {open ? "▲" : "▼"}
                        </span>
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
                <Visits data={analyticsData[selected.value]} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-5">
                <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
                    <Countries data={countriesData} />
                </div>
                <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
                    <Devices data={devicesData} />
                </div>
                <div className="border border-subtle/30 rounded-md p-4 max-h-[300px]">
                    <Browsers data={referrersData} />
                </div>
            </div>
        </main>
    )
}