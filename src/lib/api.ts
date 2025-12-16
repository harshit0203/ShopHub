import { Product, CreateProductInput } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

export async function fetchProductById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }
    return response.json();
}

export async function fetchCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
}

export async function createProduct(data: CreateProductInput): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    return response.json();
}
