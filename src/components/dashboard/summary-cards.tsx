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
      {/* Receitas */}
      <Card className="border border-border shadow-sm bg-green-50 dark:bg-green-950/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
            Total de Receitas
          </CardTitle>
          <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">
            {formatCurrency(totalIncome)}
          </p>
          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
            {transactions.filter((t) => t.type === "income").length} transações
          </p>
        </CardContent>
      </Card>

      {/* Despesas */}
      <Card className="border border-border shadow-sm bg-red-50 dark:bg-red-950/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">
            Total de Despesas
          </CardTitle>
          <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-700 dark:text-red-400">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
            {transactions.filter((t) => t.type === "expense").length} transações
          </p>
        </CardContent>
      </Card>

      {/* Saldo */}
      <Card
        className={`border border-border shadow-sm ${
          balance >= 0
            ? "bg-blue-50 dark:bg-blue-950/30"
            : "bg-red-50 dark:bg-red-950/30"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            className={`text-sm font-medium ${
              balance >= 0
                ? "text-blue-700 dark:text-blue-400"
                : "text-red-700 dark:text-red-400"
            }`}
          >
            Saldo
          </CardTitle>
          <div
            className={`p-2 rounded-full ${
              balance >= 0
                ? "bg-blue-100 dark:bg-blue-900/50"
                : "bg-red-100 dark:bg-red-900/50"
            }`}
          >
            <Wallet
              className={`h-4 w-4 ${
                balance >= 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${
              balance >= 0
                ? "text-blue-700 dark:text-blue-400"
                : "text-red-700 dark:text-red-400"
            }`}
          >
            {formatCurrency(balance)}
          </p>
          <p
            className={`text-xs mt-1 ${
              balance >= 0
                ? "text-blue-600 dark:text-blue-500"
                : "text-red-600 dark:text-red-500"
            }`}
          >
            {balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
