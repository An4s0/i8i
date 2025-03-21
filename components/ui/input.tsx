import React from 'react';

export default function Input({
    type,
    placeholder,
    value,
    onChange,
    icon,
    label,
    id,
    className
}: {
    type: string,
    placeholder?: string,
    value?: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: React.ElementType,
    label?: string,
    id?: string,
    className?: string
}) {
    return (
        <div className={`flex items-center border border-border rounded-xl w-full ` + className}>
            {icon && React.createElement(icon, { className: "text-2xl text-zinc-500 ml-5" })}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={id}
                className={`h-12 sm:px-5 rounded-xl focus:outline-none p-2 w-full ${label ? 'w-10/12' : 'w-full'}`}
            />
            {label && (
                <span className="text-subtle mr-5">
                    {label}
                </span>
            )}
        </div>
    );
}
