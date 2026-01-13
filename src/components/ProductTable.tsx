import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Package, Pencil, Trash2, Search } from "lucide-react"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          const product = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 border border-neutral-200">
                <Package className="h-5 w-5 text-neutral-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-900">{product.name}</span>
                {product.description && (
                  <span className="text-xs text-neutral-500 truncate max-w-[200px]">
                    {product.description}
                  </span>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return (
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
              {row.original.category}
            </span>
          )
        },
      },
      {
        id: "status",
        accessorFn: (row) => (row.stock > 0 ? "In Stock" : "Out of Stock"),
        header: "Status",
        cell: ({ row }) => {
          const stock = row.original.stock
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${stock > 0
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
                }`}
            >
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          )
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          return (
            <span className="font-medium text-neutral-900">
              ${row.original.price.toFixed(2)}
            </span>
          )
        },
      },
      {
        accessorKey: "stock",
        header: "Inventory",
        cell: ({ row }) => {
          return (
            <span className="text-neutral-600">
              {row.original.stock} units
            </span>
          )
        },
      },
      {
        id: "createdAt",
        accessorFn: (row) => new Date(row.createdAt),
        header: "Added",
        cell: ({ row }) => {
          return (
            <span className="text-neutral-500">
              {new Date(row.original.createdAt).toLocaleDateString()}
            </span>
          )
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const product = row.original
          return (
            <div className="flex justify-end gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(product)}
                className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(product.id)}
                className="h-8 w-8 text-neutral-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
          <Input
            placeholder="Search products..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="pl-9 border-neutral-200 focus-visible:ring-neutral-400"
          />
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-neutral-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-neutral-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs uppercase tracking-wider text-neutral-500 font-medium h-10">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-neutral-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
