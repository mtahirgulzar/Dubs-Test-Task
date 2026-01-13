import { Product } from "@/types/product"

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    price: 29.99,
    category: "Electronics",
    description: "Ergonomic wireless mouse with 2.4GHz connectivity",
    stock: 150,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 89.99,
    category: "Electronics",
    description: "RGB mechanical keyboard with blue switches",
    stock: 75,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "USB-C Hub",
    price: 45.50,
    category: "Accessories",
    description: "7-in-1 USB-C hub with HDMI and ethernet",
    stock: 200,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Laptop Stand",
    price: 34.99,
    category: "Accessories",
    description: "Adjustable aluminum laptop stand",
    stock: 120,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "5",
    name: "Webcam HD",
    price: 59.99,
    category: "Electronics",
    description: "1080p HD webcam with built-in microphone",
    stock: 90,
    createdAt: new Date("2024-02-15"),
  },
]
