import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        // ✅ Default variant
        default: "bg-card text-card-foreground border-border",

        // ✅ Destructive variant (error)
        destructive:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-950 dark:text-red-50 " +
          "[&>svg]:text-red-600 dark:[&>svg]:text-red-400 " +
          "*:data-[slot=alert-description]:text-red-800 dark:*:data-[slot=alert-description]:text-red-100",

        // ✅ Success variant (green)
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-50 " +
          "[&>svg]:text-green-600 dark:[&>svg]:text-green-400 " +
          "*:data-[slot=alert-description]:text-green-800 dark:*:data-[slot=alert-description]:text-green-100",

        // ✅ Info variant (blue)
        info:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50 " +
          "[&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 " +
          "*:data-[slot=alert-description]:text-blue-800 dark:*:data-[slot=alert-description]:text-blue-100",

        // ✅ Warning variant (amber)
        warning:
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-50 " +
          "[&>svg]:text-amber-600 dark:[&>svg]:text-amber-400 " +
          "*:data-[slot=alert-description]:text-amber-800 dark:*:data-[slot=alert-description]:text-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
