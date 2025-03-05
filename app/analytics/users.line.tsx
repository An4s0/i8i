'use client';
import { useEffect, useRef, useState } from 'react';
import analyticsFormat from "@/types/analyticsFormat";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController, Filler } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController, Filler);

import getLastDays from '@/helpers/getLastDays';

export default function Analytics({
    data
}: {
    data: [analyticsFormat]
}) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    const [countries, setCountries] = useState<{ country: string, count: number }[]>([]);
    const [browsers, setBrowsers] = useState<{ browser: string, count: number }[]>([]);
    const [operatingSystems, setOperatingSystems] = useState<{ os: string, count: number }[]>([]);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                let dataCounts: number[] = [];
                let lastDays: string[] = [];
                if (window.innerWidth < 768) {
                    dataCounts = Array(7).fill(0);
                    lastDays = getLastDays(7);
                } else {
                    dataCounts = Array(14).fill(0);
                    lastDays = getLastDays(14);
                }

                const tempCountries = [...countries];
                const tempBrowsers = [...browsers];
                const tempOperatingSystems = [...operatingSystems];

                data.forEach(d => {
                    const day = new Date(d.time).getDate();
                    dataCounts[day] += 1;

                    const existingCountry = tempCountries.find(c => c.country === d.country);
                    if (existingCountry) {
                        existingCountry.count += 1;
                    } else {
                        tempCountries.push({ country: d.country, count: 1 });
                    }

                    const existingBrowser = tempBrowsers.find(c => c.browser === d.browser);
                    if (existingBrowser) {
                        existingBrowser.count += 1;
                    } else {
                        tempBrowsers.push({ browser: d.browser, count: 1 });
                    }

                    const existingOS = tempOperatingSystems.find(c => c.os === d.os);
                    if (existingOS) {
                        existingOS.count += 1;
                    } else {
                        tempOperatingSystems.push({ os: d.os, count: 1 });
                    }
                });

                setCountries(tempCountries);
                setBrowsers(tempBrowsers);
                setOperatingSystems(tempOperatingSystems);

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: lastDays,
                        datasets: [
                            {
                                label: 'Visits last ' + lastDays.length + ' days',
                                data: dataCounts,
                                backgroundColor: 'rgba(252,169,107,0.15)',
                                borderColor: 'rgba(252,169,107,255)',
                                borderWidth: 3,
                                fill: true,
                            }
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [data]);

    return (
        <div className='flex flex-col max-w-7xl space-y-4 m-auto mt-2'>
            <div className='flex border p-4 border-border rounded-lg'>
                <canvas ref={chartRef}></canvas>
            </div>
            <div className='grid gap-4 md:grid-cols-3'>
                <div className='flex flex-col border border-border rounded-lg'>
                    <p className='text-lg font-bold m-3'>
                        Countries
                    </p>
                    <hr className='text-border' />
                    <div className='p-3'>
                        {countries.map((c, i) => {
                            const percentage = (c.count / data.length) * 100;
                            return (
                                <div
                                    key={i}
                                    className='px-2 py-1 flex justify-between rounded-md mt-2'
                                    style={{
                                        background: `linear-gradient(90deg, #181818 ${percentage}%, #00000000 ${percentage}%)`
                                    }}
                                >
                                    <p>{c.country}</p>
                                    <p className='text-sm'>{percentage.toFixed(2)}%</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='flex flex-col border border-border rounded-lg'>
                    <p className='text-lg font-bold m-3'>
                        Browsers
                    </p>
                    <hr className='text-border' />
                    <div className='p-3'>
                        {browsers.map((c, i) => {
                            const percentage = (c.count / data.length) * 100;
                            return (
                                <div
                                    key={i}
                                    className='px-2 py-1 flex justify-between rounded-md mt-2'
                                    style={{
                                        background: `linear-gradient(90deg, #181818 ${percentage}%, #00000000 ${percentage}%)`
                                    }}
                                >
                                    <p>{c.browser}</p>
                                    <p className='text-sm'>{percentage.toFixed(2)}%</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='flex flex-col border border-border rounded-lg'>
                    <p className='text-lg font-bold m-3'>
                        Operating Systems
                    </p>
                    <hr className='text-border' />
                    <div className='p-3'>
                        {operatingSystems.map((c, i) => {
                            const percentage = (c.count / data.length) * 100;
                            return (
                                <div
                                    key={i}
                                    className='px-2 py-1 flex justify-between rounded-md mt-2'
                                    style={{
                                        background: `linear-gradient(90deg, #181818 ${percentage}%, #00000000 ${percentage}%)`
                                    }}
                                >
                                    <p>{c.os}</p>
                                    <p className='text-sm'>{percentage.toFixed(2)}%</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}