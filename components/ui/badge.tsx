import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#334926] text-white",
        secondary: "border-transparent bg-[#F5F7F0] text-[#5C6657]",
        outline: "border-[#334926] text-[#334926] bg-transparent",
        destructive: "border-transparent bg-red-100 text-red-700",
        success: "border-transparent bg-green-100 text-green-700",
        warning: "border-transparent bg-yellow-100 text-yellow-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
