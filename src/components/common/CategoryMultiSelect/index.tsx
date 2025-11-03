import { memo, useState, useRef } from 'react'
import { ChevronDown, X } from 'lucide-react'
import clsx from 'clsx'
import { CategoryMultiSelectProps } from './types'
import { ExpenseCategory } from '@/store/expensesStore/models'
import { useOutsideClick } from '@/hooks'
import { EXPENSE_CATEGORY } from '@/constant'
import { STATUS_COLORS } from '../CategoryLabel/constant'
import { CategoryLabel } from '@/components/common/CategoryLabel'
import { Checkbox } from '@/components'

const CATEGORY_OPTIONS = [
  { label: 'Food', value: EXPENSE_CATEGORY.FOOD, color: STATUS_COLORS.ORANGE },
  { label: 'Travel', value: EXPENSE_CATEGORY.TRAVEL, color: STATUS_COLORS.BLUE },
  { label: 'Education', value: EXPENSE_CATEGORY.EDUCATION, color: STATUS_COLORS.INDIGO },
  { label: 'Clothes', value: EXPENSE_CATEGORY.CLOTHES, color: STATUS_COLORS.PINK },
  { label: 'Entertainment', value: EXPENSE_CATEGORY.ENTERTAINMENT, color: STATUS_COLORS.PURPLE },
  { label: 'Shopping', value: EXPENSE_CATEGORY.SHOPPING, color: STATUS_COLORS.TEAL },
  { label: 'Transport', value: EXPENSE_CATEGORY.TRANSPORT, color: STATUS_COLORS.CYAN },
  { label: 'Health', value: EXPENSE_CATEGORY.HEALTH, color: STATUS_COLORS.GREEN },
  { label: 'Utilities', value: EXPENSE_CATEGORY.UTILITIES, color: STATUS_COLORS.YELLOW },
  { label: 'Other', value: EXPENSE_CATEGORY.OTHER, color: STATUS_COLORS.CYAN },
]

export const CategoryMultiSelect = memo(
  ({ selectedCategories, label, placeholder, isDisabled, containerClassName, onChange }: CategoryMultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick(containerRef, handleCloseDropdown)

    function handleCloseDropdown() {
      setIsOpen(false)
    }

    const onToggleDropdown = () => {
      if (!isDisabled) {
        setIsOpen((prev) => !prev)
      }
    }

    const onToggleCategory = (category: ExpenseCategory) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
        : [...selectedCategories, category]

      onChange(newCategories)
    }

    const onRemoveCategoryClick = (event: React.MouseEvent, category: ExpenseCategory) => {
      event.stopPropagation()
      onChange(selectedCategories.filter((c) => c !== category))
    }

    const onClearAllClick = () => {
      onChange([])
    }

    return (
      <div className={clsx('relative w-full', containerClassName)} ref={containerRef}>
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <div
          className={clsx(
            'w-full min-h-8 mt-1 px-2 py-1.5 rounded-md border border-gray-100 text-sm shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring',
            isDisabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={onToggleDropdown}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 flex-1">
              {!selectedCategories.length ? (
                <span className="text-muted-foreground">{placeholder || 'Select categories...'}</span>
              ) : (
                selectedCategories.map((category) => {
                  const option = CATEGORY_OPTIONS.find((opt) => opt.value === category)

                  if (!option) return null

                  return (
                    <div key={category} className="flex items-center gap-1">
                      <CategoryLabel text={option.label} color={option.color} />
                      <button
                        type="button"
                        className="p-0.5 rounded-full cursor-pointer hover:bg-gray-200"
                        onClick={(e) => onRemoveCategoryClick(e, category)}
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
            <ChevronDown
              className={clsx('size-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute w-full max-h-60 mt-1 z-2 border border-gray-100 rounded-md shadow-lg overflow-auto bg-white">
            <div className="flex justify-between items-center p-2 border-b border-gray-100">
              <span className="text-xs font-medium text-muted-foreground">{selectedCategories.length} selected</span>
              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  className="text-xs text-blue-600 cursor-pointer hover:text-blue-700"
                  onClick={onClearAllClick}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="p-1">
              {CATEGORY_OPTIONS.map((option) => {
                const isSelected = selectedCategories.includes(option.value)

                return (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => onToggleCategory(option.value)}
                  >
                    <Checkbox checked={isSelected} />
                    <CategoryLabel text={option.label} color={option.color} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
)
