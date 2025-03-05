import React from 'react';

export default function Input({
    type,
    placeholder,
    value,
    onChange,
    icon,
    label,
    id
}: {
    type: string,
    placeholder?: string,
    value?: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: React.ElementType,
    label?: string,
    id?: string
}) {
    return (
        <div className={`flex items-center mt-5 ${type === 'checkbox' ? 'ml-2' : 'border border-zinc-600 rounded-3xl'}`}>
            {icon && React.createElement(icon, { className: "text-2xl text-zinc-500 ml-5" })}
            {type === 'checkbox' ? (
                <>
                    <input
                        type={type}
                        id={id}
                        onChange={onChange}
                        className="mr-2 accent-primary"
                    />
                    {label && (
                        <label htmlFor={id} className="text-zinc-500">
                            {label}
                        </label>
                    )}
                </>
            ) : (
                <>
                    <input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        id={id}
                        className={`h-12 sm:px-5 rounded-3xl focus:outline-none p-2 w-full ${label ? 'w-10/12' : 'w-full'}`}
                    />
                    {label && (
                        <span className="text-zinc-600 mr-5">
                            {label}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
