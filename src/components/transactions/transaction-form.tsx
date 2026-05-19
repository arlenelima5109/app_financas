"use client";

import { useState } from "react";
import { Transaction, TransactionFormData, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/types";
import { createTransaction, updateTransaction } from "@/app/transactions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format } from "date-fns";

interface TransactionFormProps {
  transaction?: Transaction;
  onSuccess: () => void;
}

export function TransactionForm({ transaction, onSuccess }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"income" | "expense">(transaction?.type ?? "expense");
  const [category, setCategory] = useState(transaction?.category ?? "");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: TransactionFormData = {
      type,
      amount: formData.get("amount") as string,
      description: formData.get("description") as string,
      category,
      date: formData.get("date") as string,
    };

    if (!data.amount || parseFloat(data.amount) <= 0) {
      toast.error("Informe um valor válido");
      setLoading(false);
      return;
    }

    if (!data.category) {
      toast.error("Selecione uma categoria");
      setLoading(false);
      return;
    }

    const result = transaction
      ? await updateTransaction(transaction.id, data)
      : await createTransaction(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(transaction ? "Transação atualizada!" : "Transação criada!");
      onSuccess();
    }

    setLoading(false);
  }

  function handleTypeChange(value: string) {
    setType(value as "income" | "expense");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo</Label>
        <Tabs value={type} onValueChange={handleTypeChange}>
          <TabsList className="w-full">
            <TabsTrigger value="income" className="flex-1 data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Receita
            </TabsTrigger>
            <TabsTrigger value="expense" className="flex-1 data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Despesa
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor (R$)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0,00"
          defaultValue={transaction?.amount}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Ex: Supermercado, Salário..."
          defaultValue={transaction?.description}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <Select value={category} onValueChange={(v) => v && setCategory(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          name="date"
          type="date"
          defaultValue={transaction?.date ?? format(new Date(), "yyyy-MM-dd")}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        style={{ backgroundColor: type === "income" ? "#16a34a" : "#ef4444" }}
      >
        {loading
          ? "Salvando..."
          : transaction
          ? "Atualizar transação"
          : `Adicionar ${type === "income" ? "receita" : "despesa"}`}
      </Button>
    </form>
  );
}
