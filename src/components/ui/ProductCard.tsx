"use client";

import { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/providers/ProductsProvider";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";

interface ProductCardProps {
    product: Product;
    onDelete?: () => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    const { isLocalProduct, deleteProduct } = useProducts();
    const { items, addToCart, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();
    const isLocal = isLocalProduct(product.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const cartItem = items.find((item) => item.product.id === product.id);
    const isInCart = !!cartItem;
    const quantity = cartItem?.quantity || 0;

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/products/${product.id}/edit`);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        deleteProduct(product.id);
        onDelete?.();
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity <= 1) {
            removeFromCart(product.id);
        } else {
            updateQuantity(product.id, quantity - 1);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <Link href={`/products/${product.id}`}>
                    <div className="group relative card-bg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 card-shadow hover:card-shadow-hover transition-all duration-300">
                        {isLocal && (
                            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                NEW
                            </div>
                        )}

                        {isLocal && (
                            <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleEdit}
                                    className="p-2.5 card-bg rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleDeleteClick}
                                    className="p-2.5 card-bg rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </motion.button>
                            </div>
                        )}

                        <div className="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {!isLocal && (
                                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    {isInCart ? (
                                        <div className="flex items-center gap-1 card-bg rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleDecrement}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </motion.button>
                                            <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                                {quantity}
                                            </span>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleIncrement}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            onClick={handleAddToCart}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2.5 card-bg rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </motion.button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                                    {product.category}
                                </span>
                                {isInCart && (
                                    <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                                        In Cart ({quantity})
                                    </span>
                                )}
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-4 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {product.title}
                            </h3>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    ${product.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                        {product.rating.rate}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-500">
                                        ({product.rating.count})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </>
    );
}
