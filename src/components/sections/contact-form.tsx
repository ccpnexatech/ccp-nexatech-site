"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LINKEDIN_URL = "https://www.linkedin.com/in/caio-cesar-ponte/";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

type ContactData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" tabIndex={-1} aria-labelledby="contato-t" className="bg-stage py-24 text-stage-ink outline-none">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F08A4B]">{t("label")}</p>
          <h2 id="contato-t" className="display mt-3 text-5xl md:text-6xl">{t("title")}</h2>
          <p className="mt-5 max-w-md text-lg text-stage-ink/85">{t("description")}</p>
          <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-stage-ink/70">LinkedIn</dt>
            <dd><a className="underline-offset-4 hover:underline" href={LINKEDIN_URL} rel="noopener noreferrer">linkedin.com/in/caio-cesar-ponte</a></dd>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-stage-ink/70">GitHub</dt>
            <dd><a className="underline-offset-4 hover:underline" href="https://github.com/ccpnexatech" rel="noopener noreferrer">github.com/ccpnexatech</a></dd>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-stage-ink/70">E-mail</dt>
            <dd><a className="underline-offset-4 hover:underline" href="mailto:ccpnexatech@gmail.com">ccpnexatech@gmail.com</a></dd>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-stage-ink/70"><MapPin size={14} aria-hidden className="inline" /></dt>
            <dd>{t("location")}</dd>
          </dl>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-5 p-6 text-ink md:p-8" noValidate aria-describedby="form-status">
          <Input label={tf("name")} placeholder={tf("name_placeholder")} autoComplete="name" error={errors.name ? tf("error_name") : undefined} {...register("name")} />
          <Input label={tf("email")} type="email" placeholder={tf("email_placeholder")} autoComplete="email" error={errors.email ? tf("error_email") : undefined} {...register("email")} />
          <Input label={tf("company")} placeholder={tf("company_placeholder")} autoComplete="organization" {...register("company")} />
          <Textarea label={tf("message")} placeholder={tf("message_placeholder")} rows={5} error={errors.message ? tf("error_message") : undefined} {...register("message")} />
          <div id="form-status" role="status" aria-live="polite">
            {status === "success" && <p className="flex items-center gap-2 font-semibold text-ok"><CheckCircle2 size={16} aria-hidden />{tf("success")}</p>}
            {status === "error" && <p className="flex items-center gap-2 font-semibold text-accent"><AlertCircle size={16} aria-hidden />{tf("error")}</p>}
          </div>
          <Button type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? tf("submitting") : tf("submit")}<Send size={16} aria-hidden />
          </Button>
        </form>
      </div>
    </section>
  );
}
