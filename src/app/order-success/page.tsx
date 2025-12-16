"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function OrderSuccessPage() {
    const [orderId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

    useEffect(() => {
        const confetti = () => {
            const colors = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];
            for (let i = 0; i < 50; i++) {
                const confettiPiece = document.createElement("div");
                confettiPiece.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: -10px;
          left: ${Math.random() * 100}vw;
          opacity: ${Math.random()};
          border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
          animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
          pointer-events: none;
          z-index: 100;
        `;
                document.body.appendChild(confettiPiece);
                setTimeout(() => confettiPiece.remove(), 5000);
            }
        };

        const style = document.createElement("style");
        style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);

        confetti();

        return () => {
            style.remove();
        };
    }, []);

    return (
        <div className="min-h-screen page-bg">
            <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                ShopHub
                            </span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                        className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
                    >
                        <svg
                            className="w-12 h-12 text-emerald-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Order Confirmed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-gray-500 dark:text-gray-400 mb-8"
                    >
                        Thank you for your purchase. Your order has been placed successfully.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Order Number
                        </p>
                        <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                            #{orderId}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Confirmation Email Sent
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        A confirmation email will be sent shortly
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Estimated Delivery
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        3-5 business days
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="block w-full py-3.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-center shadow-lg shadow-indigo-500/25"
                        >
                            Continue Shopping
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
