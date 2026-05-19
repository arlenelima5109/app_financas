import Link from "next/link";
import { TrendingUp, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">

        {/* Header com logo e toggle de tema */}
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
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="flex justify-center">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full">
                <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">
                Confirme seu e-mail
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Quase lá! Só mais um passo.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 text-center">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Enviamos um link de confirmação para o seu e-mail. Clique no link para ativar sua conta e acessar o app.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium text-sm">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Não encontrou o e-mail?
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-400/80 space-y-1 pl-6 list-disc">
                <li>Verifique a pasta de <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong></li>
                <li>Confira se digitou o e-mail corretamente</li>
                <li>Aguarde alguns minutos e recarregue a caixa de entrada</li>
              </ul>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-500">
              Após confirmar o e-mail, você poderá fazer login normalmente.
            </p>

            <Button
              render={<Link href="/login" />}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 mt-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ir para o login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
