"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Linkedin, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MotionSection } from "@/components/shared/motion-section";

const LINKEDIN_URL = "https://www.linkedin.com/in/ccp-nexatech/";

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
    <section id="contact" className="section-padding">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <MotionSection direction="left">
            <div className="flex flex-col gap-6">
              <Badge variant="default">{t("label")}</Badge>
              <h2 className="heading-lg">{t("title")}</h2>
              <p className="body-lg">{t("description")}</p>

              <div className="flex flex-col gap-3 mt-4">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 surface-card rounded-2xl p-4 hover:bg-surface-700/70 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/25 flex items-center justify-center shrink-0">
                    <Linkedin size={18} className="text-[#0A66C2]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {t("linkedin")}
                    </p>
                    <p className="text-xs text-slate-500">linkedin.com/in/ccp-nexatech</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 surface-card rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-700/80 border border-surface-500/40 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{t("location")}</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          <MotionSection direction="right" delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="surface-card rounded-3xl p-7 flex flex-col gap-5"
              noValidate
            >
              <Input
                label={tf("name")}
                placeholder={tf("name_placeholder")}
                autoComplete="name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label={tf("email")}
                type="email"
                placeholder={tf("email_placeholder")}
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label={tf("company")}
                placeholder={tf("company_placeholder")}
                autoComplete="organization"
                {...register("company")}
              />
              <Textarea
                label={tf("message")}
                placeholder={tf("message_placeholder")}
                rows={5}
                error={errors.message?.message}
                {...register("message")}
              />

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 size={15} />
                  {tf("success")}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={15} />
                  {tf("error")}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={status === "sending"}
                className="group"
              >
                {status === "sending" ? tf("submitting") : tf("submit")}
                <Send
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </form>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
