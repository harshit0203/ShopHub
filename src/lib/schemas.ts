import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.coerce.number().positive("Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    image: z.string().url("Please enter a valid image URL"),
    category: z.string().min(1, "Category is required"),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
