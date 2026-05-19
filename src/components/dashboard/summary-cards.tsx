import { Transaction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryCardsProps {
  transactions: Transaction[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total de Receitas
          </CardTitle>
          <div className="bg-green-100 p-2 rounded-full">
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
          <p className="text-xs text-green-600 mt-1">
            {transactions.filter((t) => t.type === "income").length} transações
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-red-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            Total de Despesas
          </CardTitle>
          <div className="bg-red-100 p-2 rounded-full">
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
          <p className="text-xs text-red-500 mt-1">
            {transactions.filter((t) => t.type === "expense").length} transações
          </p>
        </CardContent>
      </Card>

      <Card
        className="border-0 shadow-sm"
        style={{
          backgroundColor: balance >= 0 ? "#eff6ff" : "#fff1f2",
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            className="text-sm font-medium"
            style={{ color: balance >= 0 ? "#1d4ed8" : "#b91c1c" }}
          >
            Saldo
          </CardTitle>
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: balance >= 0 ? "#dbeafe" : "#fee2e2" }}
          >
            <Wallet
              className="h-4 w-4"
              style={{ color: balance >= 0 ? "#2563eb" : "#ef4444" }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p
            className="text-2xl font-bold"
            style={{ color: balance >= 0 ? "#1d4ed8" : "#dc2626" }}
          >
            {formatCurrency(balance)}
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: balance >= 0 ? "#3b82f6" : "#ef4444" }}
          >
            {balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
