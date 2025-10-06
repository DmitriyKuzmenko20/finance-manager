import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './variants'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    type?: ButtonType
    isLoading?: boolean
    isDisabled?: boolean
  }

export type ButtonType = 'button' | 'submit'
