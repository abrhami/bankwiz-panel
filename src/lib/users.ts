export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  accountNumber: string;
  status: "active" | "suspended";
  savingAmount: number;
  savingFrequency: "daily" | "weekly" | "monthly";
  registrationDate: Date;
  transactions: Transaction[];
}

const STORAGE_KEY = "savings_app_users";

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const users = JSON.parse(stored);
    return users.map((u: any) => ({
      ...u,
      registrationDate: new Date(u.registrationDate),
    }));
  }
  
  const defaultUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      balance: 5420.50,
      accountNumber: "ACC001",
      status: "active",
      savingAmount: 100,
      savingFrequency: "daily",
      registrationDate: new Date("2025-10-01"),
      transactions: [
        { id: "1", type: "deposit", amount: 1000, date: "2025-10-07", description: "Salary deposit" },
        { id: "2", type: "withdrawal", amount: 250, date: "2025-10-06", description: "ATM withdrawal" },
        { id: "3", type: "deposit", amount: 500, date: "2025-10-05", description: "Transfer received" },
        { id: "4", type: "withdrawal", amount: 120.50, date: "2025-10-04", description: "Online purchase" },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      balance: 12340.75,
      accountNumber: "ACC002",
      status: "active",
      savingAmount: 200,
      savingFrequency: "weekly",
      registrationDate: new Date("2025-09-15"),
      transactions: [],
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      balance: 890.25,
      accountNumber: "ACC003",
      status: "active",
      savingAmount: 50,
      savingFrequency: "daily",
      registrationDate: new Date("2025-09-20"),
      transactions: [],
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      balance: 23450.00,
      accountNumber: "ACC004",
      status: "active",
      savingAmount: 500,
      savingFrequency: "monthly",
      registrationDate: new Date("2025-08-01"),
      transactions: [],
    },
  ];
  
  saveUsers(defaultUsers);
  return defaultUsers;
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

export const addUser = (userData: Omit<User, "id" | "accountNumber" | "email" | "status" | "transactions">): User => {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    id: String(users.length + 1),
    email: `user${users.length + 1}@example.com`,
    accountNumber: `ACC${String(users.length + 1).padStart(3, '0')}`,
    status: "active",
    transactions: [],
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
};

export const addTransaction = (userId: string, transaction: Omit<Transaction, "id">): void => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    const newTransaction: Transaction = {
      ...transaction,
      id: String((user.transactions?.length || 0) + 1),
    };
    user.transactions = [newTransaction, ...(user.transactions || [])];
    
    if (transaction.type === "deposit") {
      user.balance += transaction.amount;
    } else {
      user.balance -= transaction.amount;
    }
    
    saveUsers(users);
  }
};
