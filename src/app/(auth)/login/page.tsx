"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      toast.error("Erro ao entrar: " + result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              FinançasPessoais
            </span>
          </div>
          <ThemeToggle />
        </div>

        <Card className="shadow-lg border-0 dark:bg-slate-800/60 dark:border dark:border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center dark:text-slate-100">Entrar</CardTitle>
            <CardDescription className="text-center dark:text-slate-400">
              Acesse sua conta para gerenciar suas finanças
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
