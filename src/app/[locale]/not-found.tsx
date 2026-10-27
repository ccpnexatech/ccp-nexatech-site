import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <span className="display text-8xl text-line" aria-hidden>404</span>
        <h1 className="text-2xl font-semibold"><span lang="pt-BR">Página não encontrada</span> · <span lang="en">Page not found</span></h1>
        <Link href="/pt-BR" className="btn-primary"><ArrowLeft size={16} aria-hidden /><span lang="pt-BR">Voltar ao início</span> / <span lang="en">Back home</span></Link>
      </div>
    </div>
  );
}
