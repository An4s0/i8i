export default function loading() {
    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-background flex items-center justify-center z-50">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
        </div>
    );
}