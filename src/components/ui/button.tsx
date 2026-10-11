import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding font-bold whitespace-nowrap transition-[color,background-color,box-shadow,transform] duration-200 ease-out outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 active:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgb(46_36_97/0.6)] hover:bg-primary/90",
        /** Brand call to action: orange fill with indigo text (7:1 contrast). */
        cta: "bg-secondary text-secondary-foreground shadow-[0_10px_24px_-10px_rgb(246_139_41/0.9),inset_0_-4px_0_rgb(46_36_97/0.12)] hover:bg-secondary-400",
        outline:
          "border-primary/15 bg-background text-primary hover:bg-accent aria-expanded:bg-accent",
        secondary:
          "bg-accent text-accent-foreground hover:bg-primary-300/50",
        ghost: "text-primary hover:bg-accent aria-expanded:bg-accent",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-9 gap-1 px-3 text-sm",
        sm: "h-10 gap-1.5 px-4 text-sm",
        lg: "h-14 gap-2 px-8 text-lg",
        icon: "size-11",
        "icon-xs": "size-9",
        "icon-sm": "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
