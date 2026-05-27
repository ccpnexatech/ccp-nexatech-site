import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-6">
        <span className="text-8xl font-black text-surface-700 select-none">404</span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-100">Página não encontrada</h1>
          <p className="text-slate-400">A página que você procura não existe ou foi movida.</p>
        </div>
        <Button asChild size="lg" variant="primary">
          <Link href="/pt-BR">
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        </Button>
      </div>
    </div>
  );
}
