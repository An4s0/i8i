'use client';
import { useEffect, useState } from 'react';
import Loading from "./loading";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loading />;

    return (
        <main>
            {children}
        </main>
    );
}