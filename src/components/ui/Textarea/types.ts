import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  isRequired?: boolean
  isDisabled?: boolean
  register?: UseFormRegisterReturn
  maxCharacters?: number
  error?: string
  className?: string
}
