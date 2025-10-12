import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  type?: string
  isRequired?: boolean
  isDisabled?: boolean
  register?: UseFormRegisterReturn
  error?: string
  containerClassName?: string
  inputClassName?: string
}
