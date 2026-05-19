"use client";

import { useTheme } from "next-themes";
import { Transaction, CATEGORY_COLORS } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ExpenseChartProps {
  transactions: Transaction[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const expenses = transactions.filter((t) => t.type === "expense");

  const byCategory = expenses.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(byCategory)
    .map(([name, value]) => ({
      name,
      value,
      fill: CATEGORY_COLORS[name] ?? "#64748b",
    }))
    .sort((a, b) => b.value - a.value);

  const tooltipStyle = {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    border: "none",
    borderRadius: "8px",
    boxShadow: isDark
      ? "0 4px 6px -1px rgb(0 0 0 / 0.4)"
      : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    color: isDark ? "#f1f5f9" : "#0f172a",
  };

  if (data.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Despesas por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          Nenhuma despesa no período
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Despesas por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={tooltipStyle}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: isDark ? "#94a3b8" : "#475569", fontSize: 13 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
