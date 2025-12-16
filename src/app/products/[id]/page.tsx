"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchProductById } from "@/lib/api";
import { useProducts } from "@/providers/ProductsProvider";
import { useCart } from "@/store/cart";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CartIcon from "@/components/ui/CartIcon";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const numericId = Number(id);

    const { localProducts, isLocalProduct, deleteProduct } = useProducts();
    const { items, addToCart, updateQuantity, removeFromCart } = useCart();
    const isLocal = isLocalProduct(numericId);
    const localProduct = localProducts.find((p) => p.id === numericId);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const cartItem = items.find((item) => item.product.id === numericId);
    const isInCart = !!cartItem;
    const quantity = cartItem?.quantity || 0;

    const {
        data: apiProduct,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
        enabled: !!id && !isLocal,
    });

    const product = isLocal ? localProduct : apiProduct;

    const handleDelete = () => {
        deleteProduct(numericId);
        router.push("/");
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    const handleIncrement = () => {
        updateQuantity(numericId, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity <= 1) {
            removeFromCart(numericId);
        } else {
            updateQuantity(numericId, quantity - 1);
        }
    };

    const handleBuyNow = () => {
        if (product && !isInCart) {
            addToCart(product);
        }
        router.push("/checkout");
    };

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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </Link>
                </motion.div>

                {isLoading && !isLocal ? (
                    <ProductDetailSkeleton />
                ) : error && !isLocal ? (
                    <ErrorState
                        message="Failed to load product details. Please try again."
                        onRetry={() => refetch()}
                    />
                ) : product ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid lg:grid-cols-2 gap-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="sticky top-24">
                                <div className="relative h-[450px] lg:h-[550px] card-bg rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
                                    {isLocal && (
                                        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                            NEW PRODUCT
                                        </div>
                                    )}
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-10"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col"
                        >
                            <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                                {product.category}
                            </span>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ${product.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/20 rounded-full">
                                    <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                                        {product.rating.rate}
                                    </span>
                                    <span className="text-xs text-amber-600/70 dark:text-amber-500/70">
                                        ({product.rating.count} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-auto space-y-4">
                                {isLocal ? (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="flex-1 py-3.5 px-6 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors text-center shadow-lg shadow-indigo-500/25"
                                        >
                                            Edit Product
                                        </Link>
                                        <motion.button
                                            onClick={() => setShowDeleteModal(true)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="flex-1 py-3.5 px-6 card-bg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            Delete Product
                                        </motion.button>
                                    </div>
                                ) : (
                                    <>
                                        {isInCart ? (
                                            <div className="flex items-center gap-4 p-4 card-bg border border-gray-200 dark:border-gray-700 rounded-xl">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quantity:</span>
                                                <div className="flex items-center gap-3">
                                                    <motion.button
                                                        onClick={handleDecrement}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center font-semibold text-lg"
                                                    >
                                                        −
                                                    </motion.button>
                                                    <span className="w-12 text-center text-xl font-bold text-gray-900 dark:text-white">
                                                        {quantity}
                                                    </span>
                                                    <motion.button
                                                        onClick={handleIncrement}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center font-semibold text-lg"
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                                <span className="ml-auto text-lg font-semibold text-gray-900 dark:text-white">
                                                    ${(product.price * quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ) : (
                                            <motion.button
                                                onClick={handleAddToCart}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                className="w-full py-3.5 px-6 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
                                            >
                                                Add to Cart
                                            </motion.button>
                                        )}
                                        <motion.button
                                            onClick={handleBuyNow}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="w-full py-3.5 px-6 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/25"
                                        >
                                            Buy Now
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <ErrorState message="Product not found" />
                )}
            </main>

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
}
