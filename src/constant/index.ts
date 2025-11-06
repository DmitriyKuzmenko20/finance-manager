export const MAX_AMOUNT_COUNT = 1_000_000
export const MAX_TITLE_COUNT = 50
export const MAX_DESCRIPTION_COUNT = 150

export const EXPENSE_TYPE = {
  BANK: 'Bank',
  CASH: 'Cash',
} as const

export const EXPENSE_CATEGORY = {
  FOOD: 'Food',
  TRAVEL: 'Travel',
  EDUCATION: 'Education',
  CLOTHES: 'Clothes',
  ENTERTAINMENT: 'Entertainment',
  SHOPPING: 'Shopping',
  TRANSPORT: 'Transport',
  HEALTH: 'Health',
  UTILITIES: 'Utilities',
  OTHER: 'Other',
} as const

export const ASSET_TYPE = {
  INVESTMENTS: 'Investments',
  SAVINGS: 'Savings',
} as const

export const ASSET_CATEGORY = {
  CRYPTO: 'Crypto',
  STOCKS: 'Stocks',
  BONDS: 'Bonds',
} as const

export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
} as const
