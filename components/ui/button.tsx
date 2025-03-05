export default function Button({
    children,
    onClick,
    className
}: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`bg-primary hover:bg-primary-hover text-black font-semibold h-12 w-48 rounded-3xl mt-5 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}