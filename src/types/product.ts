import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  stock: z.coerce.number().int().min(0, "Stock must be a positive integer"),
})

export type Product = z.infer<typeof productSchema> & {
  id: string
  createdAt: Date
}

export type ProductFormData = z.infer<typeof productSchema>
