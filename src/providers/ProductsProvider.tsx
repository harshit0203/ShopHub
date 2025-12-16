"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product, CreateProductInput } from "@/types";

interface ProductsContextType {
    localProducts: Product[];
    addProduct: (product: CreateProductInput) => Product;
    updateProduct: (id: number, product: Partial<CreateProductInput>) => void;
    deleteProduct: (id: number) => void;
    isLocalProduct: (id: number) => boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "shophub_local_products";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [localProducts, setLocalProducts] = useState<Product[]>([]);
    const [nextId, setNextId] = useState(1000);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setLocalProducts(parsed.products || []);
            setNextId(parsed.nextId || 1000);
        }
    }, []);

    useEffect(() => {
        if (localProducts.length > 0 || nextId > 1000) {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({ products: localProducts, nextId })
            );
        }
    }, [localProducts, nextId]);

    const addProduct = useCallback(
        (productData: CreateProductInput): Product => {
            const newProduct: Product = {
                id: nextId,
                title: productData.title,
                price: productData.price,
                description: productData.description,
                category: productData.category,
                image: productData.image,
                rating: {
                    rate: 0,
                    count: 0,
                },
            };
            setLocalProducts((prev) => [newProduct, ...prev]);
            setNextId((prev) => prev + 1);
            return newProduct;
        },
        [nextId]
    );

    const updateProduct = useCallback(
        (id: number, productData: Partial<CreateProductInput>) => {
            setLocalProducts((prev) =>
                prev.map((product) =>
                    product.id === id ? { ...product, ...productData } : product
                )
            );
        },
        []
    );

    const deleteProduct = useCallback((id: number) => {
        setLocalProducts((prev) => prev.filter((product) => product.id !== id));
    }, []);

    const isLocalProduct = useCallback(
        (id: number) => {
            return localProducts.some((product) => product.id === id);
        },
        [localProducts]
    );

    return (
        <ProductsContext.Provider
            value={{
                localProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                isLocalProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}
