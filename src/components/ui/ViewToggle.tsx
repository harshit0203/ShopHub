"use client";

import { motion } from "framer-motion";

export type ViewMode = "paginated" | "infinite";

interface ViewToggleProps {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
    return (
        <div className="flex card-bg rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
            <button
                onClick={() => onChange("paginated")}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${value === "paginated"
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
            >
                {value === "paginated" && (
                    <motion.div
                        layoutId="viewToggle"
                        className="absolute inset-0 bg-indigo-600 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                )}
                <span className="relative flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Pages
                </span>
            </button>
            <button
                onClick={() => onChange("infinite")}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${value === "infinite"
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
            >
                {value === "infinite" && (
                    <motion.div
                        layoutId="viewToggle"
                        className="absolute inset-0 bg-indigo-600 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                )}
                <span className="relative flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    Infinite
                </span>
            </button>
        </div>
    );
}
