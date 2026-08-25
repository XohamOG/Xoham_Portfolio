"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { personalInfo } from "@/data/portfolio";

const ParticlesBackdrop = dynamic(() => import("@/components/ui/ParticlesBackdrop"), {
  ssr: false,
});

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

const socials = [
  { label: "GitHub", href: personalInfo.github, icon: FaGithub },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: FaLinkedin },
  { label: "LeetCode", href: personalInfo.leetcode, icon: SiLeetcode },
  { label: "CodeChef", href: personalInfo.codechef, icon: SiCodechef },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setIsSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // TODO: Replace with your actual Web3Forms Access Key
          access_key: "107c1fc6-89c4-48c1-8807-f99ca2a31c28",
          ...form
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setFeedback("Message sent. I will get back to you soon.");
      setForm(initialFormState);
    } catch (err: any) {
      console.error(err);
      setFeedback("Could not send message. Please try again or email me directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-dot-grid py-24">
      <ParticlesBackdrop />

      <div className="section-shell relative z-10 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
        <div>
          <p className="font-display text-[clamp(2.8rem,8vw,5rem)] leading-[0.84] md:whitespace-nowrap">
            Contact Me
          </p>
          <p className="mt-4 max-w-[44ch] text-sm leading-relaxed sm:text-base">
            Let&apos;s build something or have any queries regarding placement / hackathons or anything in general, just send a message here itself and I&apos;ll get back to you, or drop me an email below.
          </p>

          <div className="section-divider my-8" />

          <div className="space-y-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-3 text-lg"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="link-underline">{social.label}</span>
                </a>
              );
            })}

            <a href={`mailto:${personalInfo.email}`} className="link-underline mt-4 inline-block text-base">
              {personalInfo.email}
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="brutal-card bg-white p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-4">
            <label className="block text-sm uppercase tracking-[0.08em]">
              Name
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="brutal-input mt-2"
              />
            </label>

            <label className="block text-sm uppercase tracking-[0.08em]">
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="brutal-input mt-2"
              />
            </label>

            <label className="block text-sm uppercase tracking-[0.08em]">
              Message
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                className="brutal-input mt-2 resize-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="brutal-btn mt-6 w-full bg-black py-3 font-display text-4xl leading-none text-white disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-70"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>

          {feedback ? <p className="mt-4 text-sm font-medium">{feedback}</p> : null}
        </motion.form>
      </div>
    </section>
  );
}
