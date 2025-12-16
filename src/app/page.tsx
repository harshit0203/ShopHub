"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { useProducts } from "@/providers/ProductsProvider";
import ProductCard from "@/components/ui/ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import CategoryFilter from "@/components/ui/CategoryFilter";
import SortSelect, { SortOption } from "@/components/ui/SortSelect";
import ViewToggle, { ViewMode } from "@/components/ui/ViewToggle";
import Pagination from "@/components/ui/Pagination";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";

import CartIcon from "@/components/ui/CartIcon";

const PRODUCTS_PER_PAGE = 6;
const INFINITE_SCROLL_INCREMENT = 3;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("paginated");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [refreshKey, setRefreshKey] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { localProducts } = useProducts();

  const {
    data: apiProducts,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const allProducts = useMemo(() => {
    const api = apiProducts || [];
    return [...localProducts, ...api];
  }, [apiProducts, localProducts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, []);

  const handleProductDelete = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, sortOption, refreshKey]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

  const displayedProducts = useMemo(() => {
    if (viewMode === "paginated") {
      return filteredAndSortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
      );
    }
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, currentPage, viewMode, visibleCount]);

  const hasMoreProducts = visibleCount < filteredAndSortedProducts.length;

  useEffect(() => {
    if (viewMode !== "infinite" || !hasMoreProducts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + INFINITE_SCROLL_INCREMENT, filteredAndSortedProducts.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [viewMode, hasMoreProducts, filteredAndSortedProducts.length]);

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
              <Link
                href="/products/create"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </Link>
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
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Browse our curated collection of {allProducts.length} products
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </div>
          <div className="flex flex-wrap gap-3">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={handleCategoryChange}
            />
            <SortSelect value={sortOption} onChange={handleSortChange} />
            <ViewToggle value={viewMode} onChange={handleViewModeChange} />
          </div>
        </motion.div>

        {(searchQuery || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Showing {filteredAndSortedProducts.length} results</span>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {productsLoading ? (
          <ProductGridSkeleton />
        ) : productsError ? (
          <ErrorState
            message="Failed to load products. Please check your connection and try again."
            onRetry={() => refetchProducts()}
          />
        ) : displayedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode === "paginated" ? `page-${currentPage}` : "infinite"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} onDelete={handleProductDelete} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {viewMode === "infinite" && hasMoreProducts && (
              <div
                ref={loadMoreRef}
                className="flex justify-center py-12"
              >
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm">Loading more products...</span>
                </div>
              </div>
            )}

            {viewMode === "infinite" && !hasMoreProducts && filteredAndSortedProducts.length > PRODUCTS_PER_PAGE && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You&apos;ve reached the end • {filteredAndSortedProducts.length} products
                </p>
              </div>
            )}
          </>
        )}

        {viewMode === "paginated" && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <Link
          href="/products/create"
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </main>
    </div>
  );
}
