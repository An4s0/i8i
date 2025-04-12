import { Error404 } from "@/components/icons";

export default function NotFoundPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
                <Error404 className="text-subtle" size={150} />
                <span className="font-bold text-2xl">Page Not Found</span>
                <p className="text-subtle">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        </>
    );
};