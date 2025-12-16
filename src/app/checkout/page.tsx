"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CartIcon from "@/components/ui/CartIcon";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const total = getTotal();
    const shipping = total > 100 ? 0 : 9.99;
    const grandTotal = total + shipping;

    const handleBuyNow = async () => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        clearCart();
        router.push("/order-success");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen page-bg flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Your cart is empty
                    </h2>
                    <Link
                        href="/"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        Go back to shopping
                    </Link>
                </div>
            </div>
        );
    }

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
                        <div className="flex items-center gap-3">
                            <CartIcon />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Cart
                    </Link>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
                >
                    Checkout
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
                >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex gap-4">
                                <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.title}
                                        fill
                                        className="object-contain p-2"
                                        sizes="64px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {item.product.title}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        {shipping > 0 && (
                            <p className="text-xs text-gray-500">
                                Free shipping on orders over $100
                            </p>
                        )}
                        <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/25 text-lg"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            `Buy Now - $${grandTotal.toFixed(2)}`
                        )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        This is a demo. No actual payment will be processed.
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
