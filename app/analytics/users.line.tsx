'use client';
import { useEffect, useRef } from 'react';
import analyticsFormat from "@/types/analyticsFormat";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController);

import getLastDays from '@/helpers/getLastDays';

export default function Analytics({
    data
}: {
    data: [analyticsFormat]
}) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

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
                    dataCounts = Array(30).fill(0);
                    lastDays = getLastDays(30);
                }

                data.forEach(d => {
                    const day = new Date(d.createdAt).getDate();
                    dataCounts[day] += 1;
                });

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: lastDays,
                        datasets: [{
                            label: 'Number of users',
                            data: dataCounts,
                            backgroundColor: 'rgba(252,169,107,255)',
                            borderColor: 'rgba(252,169,107,255)',
                            borderWidth: 3
                        }]
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
        <div className='flex justify-center items-center mt-28' style={{ height: '600px', width: '95%' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}