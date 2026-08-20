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
        .number("Price is required")
        .positive("Price must be greater than 0"),

    category: z
        .string()
        .min(1, "Category is required"),

    image: z
        .instanceof(FileList)
        .refine(
            (files) => files.length > 0,
            "Please select an image"
        )
});