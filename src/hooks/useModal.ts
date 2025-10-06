import { useState, useCallback } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenClick = useCallback(() => setIsOpen(true), [])
  const onCloseClick = useCallback(() => setIsOpen(false), [])

  return { isOpen, onOpenClick, onCloseClick }
}
