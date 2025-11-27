export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
}

const FIRST_NAMES = [
  'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Chris', 'Amanda',
  'James', 'Lisa', 'Robert', 'Jennifer', 'William', 'Jessica', 'Daniel', 'Ashley'
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
]

const ROLES = [
  'Software Engineer', 'Product Manager', 'Designer', 'Data Analyst',
  'DevOps Engineer', 'QA Engineer', 'Tech Lead', 'Marketing Manager'
]

const DEPARTMENTS = [
  'Engineering', 'Product', 'Design', 'Analytics',
  'Operations', 'Marketing', 'Sales', 'HR'
]

const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const generatePhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100
  const prefix = Math.floor(Math.random() * 900) + 100
  const line = Math.floor(Math.random() * 9000) + 1000
  return `(${areaCode}) ${prefix}-${line}`
}

export const getUsers = (start: number, end: number): User[] => {
  const users: User[] = []

  for (let i = start; i < end; i++) {
    const firstName = randomElement(FIRST_NAMES)
    const lastName = randomElement(LAST_NAMES)
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`

    users.push({
      id: `user-${i + 1}`,
      name,
      email,
      phone: generatePhone(),
      role: randomElement(ROLES),
      department: randomElement(DEPARTMENTS),
    })
  }

  return users
}
