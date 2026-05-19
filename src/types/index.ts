export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
}

export interface TransactionFormData {
  type: TransactionType;
  amount: string;
  description: string;
  category: string;
  date: string;
}

export const INCOME_CATEGORIES = [
  "Salário",
  "Freelance",
  "Investimentos",
  "Aluguel",
  "Presente",
  "Outros",
] as const;

export const EXPENSE_CATEGORIES = [
  "Alimentação",
  "Moradia",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Vestuário",
  "Tecnologia",
  "Assinaturas",
  "Outros",
] as const;

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const CATEGORY_COLORS: Record<string, string> = {
  Alimentação: "#f97316",
  Moradia: "#6366f1",
  Transporte: "#06b6d4",
  Saúde: "#ec4899",
  Educação: "#8b5cf6",
  Lazer: "#f59e0b",
  Vestuário: "#14b8a6",
  Tecnologia: "#3b82f6",
  Assinaturas: "#a855f7",
  Outros: "#64748b",
  Salário: "#22c55e",
  Freelance: "#10b981",
  Investimentos: "#0ea5e9",
  Aluguel: "#84cc16",
  Presente: "#fb923c",
};
