import { useState } from "react"
import { Product, ProductFormData } from "@/types/product"
import { useProducts } from "@/hooks/useProducts"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ResponsiveModal } from "@/components/ResponsiveModal"
import { ProductForm } from "@/components/ProductForm"
import { ProductTable } from "@/components/ProductTable"

function App() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleCreateProduct = async (data: ProductFormData) => {
    if (editingProduct) {
      await updateProduct({ id: editingProduct.id, data })
    } else {
      await createProduct(data)
    }
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onCreateProduct={() => setIsModalOpen(true)} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Product Inventory
          </h2>
          <p className="text-muted-foreground mt-2">
            Browse and manage your products
          </p>
        </div>

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      <ResponsiveModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        title={editingProduct ? "Edit Product" : "Create New Product"}
        description={
          editingProduct
            ? "Update your product information"
            : "Add a new product to your inventory"
        }
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={handleModalClose}
          defaultValues={editingProduct || undefined}
        />
      </ResponsiveModal>
    </div>
  )
}

export default App
