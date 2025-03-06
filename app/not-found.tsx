import { TbError404 } from "react-icons/tb";
import Header from "@/components/header";

const NotFoundPage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
                <TbError404 className="text-zinc-700" size={150} />
                <span className="font-bold text-2xl">Page Not Found</span>
                <p className="text-zinc-500">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        </>
    );
};

export default NotFoundPage;