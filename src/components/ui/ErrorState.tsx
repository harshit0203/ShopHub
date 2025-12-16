"use client";

import { motion } from "framer-motion";

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    message = "Something went wrong",
    onRetry,
}: ErrorStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
        >
            <div className="w-20 h-20 mb-6 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-sm">
                {message}
            </p>
            {onRetry && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRetry}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
                >
                    Try Again
                </motion.button>
            )}
        </motion.div>
    );
}
