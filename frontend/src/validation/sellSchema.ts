import { z } from "zod";

export const sellSchema = z.object({

    title: z
        .string()
        .min(1, "Title is required"),

    description: z
        .string()
        .min(
            20,
            "Description must be at least 20 characters"
        ),

    price: z
        .number()
        .positive(
            "Price must be greater than 0"
        ),

    category: z
        .string()
        .min(1, "Category is required"),

    image: z
        .string()
        .url("Enter a valid image URL"),
});