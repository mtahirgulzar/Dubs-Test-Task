import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table"
import { Product } from "@/types/product"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Package, Pencil, Trash2 } from "lucide-react"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "product",
        accessorFn: (row) => row,
        cell: ({ row }) => {
          const product = row.original
          return (
            <div className="group relative rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-neutral-300">
              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(product)}
                  className="h-8 w-8 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(product.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-neutral-100 to-white border border-neutral-200">
                  <Package className="h-6 w-6 text-neutral-600" />
                </div>

                <div className="flex-1 min-w-0 pr-16">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold text-neutral-900">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-neutral-500">
                        Category
                      </span>
                      <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-neutral-500">
                        Stock
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          product.stock > 100
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : product.stock > 50
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-neutral-400">
                        Added {product.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
      },
    ],
    [onEdit, onDelete]
  )

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm border-neutral-300 focus-visible:ring-neutral-400"
        />
      </div>

      <div className="space-y-3">
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row, index) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-neutral-500"
          >
            <Package className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search query</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
