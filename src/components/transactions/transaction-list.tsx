"use client";

import { useState } from "react";
import { Transaction } from "@/types";
import { deleteTransaction } from "@/app/transactions/actions";
import { TransactionForm } from "./transaction-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const result = await deleteTransaction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Transação excluída");
    }
    setDeletingId(null);
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p className="text-lg font-medium">Nenhuma transação encontrada</p>
        <p className="text-sm">Adicione sua primeira transação usando o botão acima</p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 px-1 hover:bg-muted/50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={`p-2 rounded-full flex-shrink-0 ${
                  transaction.type === "income"
                    ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{transaction.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(parseISO(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span
                className={`font-semibold text-sm ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" className="h-8 w-8" />}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditingTransaction(transaction)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={deletingId === transaction.id}
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {deletingId === transaction.id ? "Excluindo..." : "Excluir"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar transação</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              transaction={editingTransaction}
              onSuccess={() => setEditingTransaction(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
