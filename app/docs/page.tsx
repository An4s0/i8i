import { GiProcessor } from "react-icons/gi";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
            <GiProcessor className="text-zinc-700" size={150} />
            <span className="font-bold text-2xl">Under Development</span>
            <p className="text-zinc-500">This page is currently under development.</p>
        </div>
    );
}