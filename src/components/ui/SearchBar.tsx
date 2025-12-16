"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
    value?: string;
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value: externalValue,
    onSearch,
    placeholder = "Search products...",
}: SearchBarProps) {
    const [value, setValue] = useState(externalValue || "");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (externalValue !== undefined && externalValue !== value) {
            setValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value);
        }, 300);

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <div className={`relative transition-all duration-200 ${isFocused ? "scale-[1.02]" : ""}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className={`w-5 h-5 transition-colors ${isFocused ? "text-indigo-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3.5 card-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-sm"
            />
            {value && (
                <button
                    onClick={() => setValue("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
