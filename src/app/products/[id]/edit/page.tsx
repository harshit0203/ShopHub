"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createProductSchema, CreateProductFormData } from "@/lib/schemas";
import { fetchCategories } from "@/lib/api";
import { useProducts } from "@/providers/ProductsProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CartIcon from "@/components/ui/CartIcon";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const { localProducts, updateProduct, isLocalProduct } = useProducts();
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const product = localProducts.find((p) => p.id === id);

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema) as any,
    });

    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
            });
        }
    }, [product, reset]);

    useEffect(() => {
        if (!isLocalProduct(id)) {
            router.push("/");
        }
    }, [id, isLocalProduct, router]);

    const onSubmit = async (data: CreateProductFormData) => {
        setSubmitSuccess(false);
        updateProduct(id, data);
        setSubmitSuccess(true);
        setTimeout(() => {
            router.push("/");
        }, 1500);
    };

    if (!product) {
        return (
            <div className="min-h-screen page-bg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Product not found</p>
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
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Edit Product
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Update the product details below
                    </p>
                </motion.div>

                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                                Product updated! Redirecting...
                            </p>
                        </div>
                    </motion.div>
                )}

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-bg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
                >
                    <div className="p-6 sm:p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                {...register("title")}
                                className="w-full px-4 py-3 input-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                                placeholder="Product name"
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("price")}
                                    className="w-full pl-9 pr-4 py-3 input-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                className="w-full px-4 py-3 input-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none"
                                placeholder="Describe your product..."
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                {...register("image")}
                                className="w-full px-4 py-3 input-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.image && (
                                <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    {...register("category")}
                                    className="w-full appearance-none px-4 py-3 pr-10 input-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 cursor-pointer transition-all"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.category && (
                                <p className="mt-2 text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-3.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/25"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                "Update Product"
                            )}
                        </motion.button>
                    </div>
                </motion.form>
            </main>
        </div>
    );
}
