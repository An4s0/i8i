'use client';
import { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Props {
    data: {
        label: string;
        Visits: number
    }[]
}

export default class Visits extends PureComponent<Props> {
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    style={{
                        color: "var(--foreground)",
                    }}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline)"/>
                    <XAxis dataKey="label" tick={{ fill: 'var(--foreground)', fontSize: 12 }}/>
                    <YAxis tick={{ fill: 'var(--foreground)', fontSize: 15 }}/>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--color-outline)', borderRadius: 5 }}/>
                    <Legend />
                    <Line type="monotone" dataKey="Visits" stroke="var(--color-primary)" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}