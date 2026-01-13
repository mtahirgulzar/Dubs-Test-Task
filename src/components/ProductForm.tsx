import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { productSchema, type ProductFormData, type Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
  defaultValues?: Product
}

export function ProductForm({ onSubmit, onCancel, defaultValues }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          price: defaultValues.price,
          category: defaultValues.category,
          description: defaultValues.description,
          stock: defaultValues.stock,
        }
      : undefined,
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        price: defaultValues.price,
        category: defaultValues.category,
        description: defaultValues.description,
        stock: defaultValues.stock,
      })
    } else {
      reset({
        name: "",
        price: 0,
        category: "",
        description: "",
        stock: 0,
      })
    }
  }, [defaultValues, reset])

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="0"
            {...register("stock")}
          />
          {errors.stock && (
            <p className="text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Enter category"
          {...register("category")}
        />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter product description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <motion.div
        className="flex gap-3 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting
            ? defaultValues
              ? "Updating..."
              : "Creating..."
            : defaultValues
            ? "Update Product"
            : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </motion.div>
    </motion.form>
  )
}
