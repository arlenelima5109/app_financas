import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Transaction } from "@/types";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { TransactionList } from "@/components/transactions/transaction-list";
import { AddTransactionButton } from "@/components/dashboard/add-transaction-button";
import { Filters } from "@/components/dashboard/filters";
import { Navbar } from "@/components/layout/navbar";
import { Suspense } from "react";
import { format } from "date-fns";

interface DashboardPageProps {
  searchParams: Promise<{
    month?: string;
    category?: string;
    type?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  const month = params.month ?? format(new Date(), "yyyy-MM");
  const [year, monthNum] = month.split("-");
  const startDate = `${year}-${monthNum}-01`;
  const endDate = new Date(parseInt(year), parseInt(monthNum), 0).toISOString().split("T")[0];

  let query = supabase
    .from("transactions")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }

  if (params.type && params.type !== "all") {
    query = query.eq("type", params.type);
  }

  const { data: transactions = [] } = await query;

  // Busca todas as transações do mês para os cards de resumo (sem filtro de tipo/categoria)
  const { data: allMonthTransactions = [] } = await supabase
    .from("transactions")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Visão geral das suas finanças</p>
          </div>
          <AddTransactionButton />
        </div>

        <SummaryCards transactions={allMonthTransactions as Transaction[]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseChart transactions={allMonthTransactions as Transaction[]} />
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border-0 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-base font-semibold text-slate-700">Transações</h2>
              <Suspense>
                <Filters />
              </Suspense>
            </div>
            <TransactionList transactions={transactions as Transaction[]} />
          </div>
        </div>
      </main>
    </div>
  );
}
