import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Product, ProductFormData } from '@/types/product'
import { mockProducts } from '@/data/mockProducts'

const PRODUCTS_KEY = ['products']

const getProducts = (): Product[] => {
  const stored = localStorage.getItem('products')
  return stored ? JSON.parse(stored) : mockProducts
}

const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products))
}

export const useProducts = () => {
  const queryClient = useQueryClient()

  const { data: products = [] } = useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: getProducts,
  })

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => {
      const newProduct: Product = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      }
      const updated = [newProduct, ...products]
      saveProducts(updated)
      return Promise.resolve(newProduct)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) => {
      const updated = products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      )
      saveProducts(updated)
      return Promise.resolve(updated.find((p) => p.id === id)!)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const updated = products.filter((p) => p.id !== id)
      saveProducts(updated)
      return Promise.resolve(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    },
  })

  return {
    products,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
  }
}
