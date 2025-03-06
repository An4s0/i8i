import MainLayout from "@/components/mainLayout";
import Header from "@/components/header";
import { RiHome6Line } from "react-icons/ri";
import { FaRegFlag } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { IoStatsChartOutline } from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";

export default function Page() {
    return (
        <MainLayout>
            <Header isDocs={true} />
            <div className="w-64 p-1 docs mt-6">
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary-dc-hover ">
                    <RiHome6Line size={20} />
                    <span className="ml-2">Home</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary-dc-hover">
                    <FaRegFlag size={20} />
                    <span className="ml-2">Getting Started</span>
                </div>
                <br />
                <span className="text-zinc-500 p-2">API</span>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary-dc-hover">
                    <IoIosLink size={20} />
                    <span className="ml-2">Create URL Shortener</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary-dc-hover">
                    <BiLinkExternal size={20} />
                    <span className="ml-2">Get URL Shortener</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary-dc-hover">
                    <IoStatsChartOutline size={20} />
                    <span className="ml-2">Get Analytics</span>
                </div>
            </div>
        </MainLayout>
    );
}