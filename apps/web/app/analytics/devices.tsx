

export default function Devices({ data }: { data: { label: string, visits: number }[] }) {
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Devices</h3>
            </div>
            <div className="w-full h-full flex flex-col gap-2 overflow-auto">
                {data.map((c, i) => {
                    const total = data.reduce((acc, cur) => acc + cur.visits, 0);
                    const percentage = total === 0 ? 0 : (c.visits / total) * 100;
                    return (
                        <div
                            key={c.label}
                            className="flex items-center justify-between rounded-md bg-gradient-to-r from-outline/50 to-outline/50 px-2 text-subtle"
                            style={{
                                backgroundSize: `${percentage}% 100%`,
                                backgroundRepeat: "no-repeat"
                            }}>
                            <div>
                                <span>{c.label}</span>
                                <p className='text-sm'>{percentage.toFixed(2)}%</p>
                            </div>
                            <span>{c.visits}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}