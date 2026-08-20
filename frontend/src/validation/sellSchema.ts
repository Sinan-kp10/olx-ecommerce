import { z } from "zod";

const commonProductFields = {
    title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .regex(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/,
        "Title must contain at least one letter and can only contain letters and numbers"
    ),

    description: z
        .string()
        .min(20, "Description must be at least 20 characters"),

    price: z
        .number("Price is required")
        .positive("Price must be greater than 0"),

    category: z
        .string()
        .min(1, "Category is required"),
}



export const AddProductSchema = z.object({

    ...commonProductFields,

    image: z
        .instanceof(FileList)
        .refine(
            (files) => files.length > 0,
            "Please select an image"
        )
});



export const EditProductSchema = z.object({

    ...commonProductFields,

    image: z
        .instanceof(FileList)
        .optional()
});