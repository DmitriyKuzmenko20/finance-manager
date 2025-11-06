import { ROUTES } from '@/routes/constant'

export const metaTagsData = {
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard | Finance Manager',
    description: 'Track and manage your expenses and assets with comprehensive financial insights and analytics.',
    twitterCard: 'summary_large_image',
    keywords: ['finance', 'dashboard', 'expenses', 'assets', 'financial tracking'],
  },
  [ROUTES.EXPENSES]: {
    title: 'Expenses | Finance Manager',
    description: 'Track and manage all your expenses. Monitor spending patterns and optimize your budget.',
    twitterCard: 'summary_large_image',
    keywords: ['expenses', 'spending', 'budget', 'financial management', 'expense tracking'],
  },
  [ROUTES.ASSETS]: {
    title: 'Assets | Finance Manager',
    description: 'Manage your investment portfolio including stocks, crypto, and bonds. Track asset performance.',
    twitterCard: 'summary_large_image',
    keywords: ['assets', 'investments', 'stocks', 'crypto', 'bonds', 'portfolio'],
  },
  [ROUTES.TARGETS]: {
    title: 'Targets | Finance Manager',
    description: 'Set and track spending targets for expense categories. Achieve your financial goals.',
    twitterCard: 'summary_large_image',
    keywords: ['targets', 'goals', 'budgeting', 'financial planning', 'savings'],
  },
}
