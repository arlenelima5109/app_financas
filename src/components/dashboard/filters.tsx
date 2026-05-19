"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_CATEGORIES } from "@/types";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

function getMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = subMonths(now, i);
    options.push({
      value: format(date, "yyyy-MM"),
      label: format(date, "MMMM 'de' yyyy", { locale: ptBR }),
    });
  }
  return options;
}

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const month = searchParams.get("month") ?? format(new Date(), "yyyy-MM");
  const category = searchParams.get("category") ?? "all";
  const type = searchParams.get("type") ?? "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/dashboard?${params.toString()}`);
  }

  const monthOptions = getMonthOptions();

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={month} onValueChange={(v) => v && updateFilter("month", v)}>
        <SelectTrigger className="w-48 bg-white border-slate-200">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {monthOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={(v) => v && updateFilter("type", v)}>
        <SelectTrigger className="w-40 bg-white border-slate-200">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="income">Receitas</SelectItem>
          <SelectItem value="expense">Despesas</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={(v) => v && updateFilter("category", v)}>
        <SelectTrigger className="w-48 bg-white border-slate-200">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {ALL_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
