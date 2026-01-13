import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"

interface HeroProps {
  onCreateProduct: () => void
}

export function Hero({ onCreateProduct }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6">
            <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
              <span className="text-muted-foreground">Introducing Product Management</span>
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Manage your products <span className="text-primary">with ease</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            The modern platform for product listing, inventory tracking, and streamlined management
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onCreateProduct} className="gap-2 text-base px-8">
              <Plus className="h-4 w-4" />
              Create Product
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">View Demo</Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Easy management</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Fast & secure</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
