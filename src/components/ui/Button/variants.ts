import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 min-w-16 h-8 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white shadow hover:shadow-lg hover:bg-blue-700 disabled:hover:bg-blue-600 disabled:hover:shadow-none dark:bg-blue-500 dark:hover:bg-blue-600',
        secondary: 'bg-white text-blue-600 border border-blue-600 hover:shadow-lg disabled:hover:shadow-none dark:bg-card dark:text-blue-400 dark:border-blue-400',
        tertiary: 'bg-white text-gray-600 border border-gray-100 hover:shadow-lg disabled:hover:shadow-none dark:bg-card dark:text-foreground dark:border-border',
        critical: 'bg-white text-red-600 border border-red-600 hover:shadow-lg disabled:hover:shadow-none dark:bg-card dark:text-red-400 dark:border-red-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)
