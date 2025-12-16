"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CartIcon from "@/components/ui/CartIcon";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    const [showClearModal, setShowClearModal] = useState(false);

    const total = getTotal();
    const shipping = total > 100 ? 0 : 9.99;
    const grandTotal = total + shipping;

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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {items.length} {items.length === 1 ? "item" : "items"} in your cart
                    </p>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Looks like you haven&apos;t added anything yet
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.product.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
                                    >
                                        <div className="flex gap-4 sm:gap-6">
                                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="128px"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/products/${item.product.id}`}
                                                    className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
                                                >
                                                    {item.product.title}
                                                </Link>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
                                                    {item.product.category}
                                                </p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                                                    ${item.product.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-gray-900 dark:text-white font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <button
                                onClick={() => setShowClearModal(true)}
                                className="text-sm text-red-500 hover:text-red-600 transition-colors"
                            >
                                Clear cart
                            </button>
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            Free shipping on orders over $100
                                        </p>
                                    )}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                            <span>Total</span>
                                            <span>${grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full py-3.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-center shadow-lg shadow-indigo-500/25"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/"
                                    className="block w-full py-3 mt-3 text-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                                >
                                    Continue Shopping
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </main>

            <ConfirmModal
                isOpen={showClearModal}
                onClose={() => setShowClearModal(false)}
                onConfirm={clearCart}
                title="Clear Cart"
                message="Are you sure you want to remove all items from your cart?"
                confirmText="Clear All"
                cancelText="Cancel"
                variant="warning"
            />
        </div>
    );
}
