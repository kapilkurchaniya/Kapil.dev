"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "sent" | "error";

interface FloatingFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  index: number;
}

function FloatingField({ name, label, type = "text", multiline = false, index }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  const sharedClass =
    "peer w-full rounded-lg border bg-white/[0.04] px-4 text-sm text-white outline-none transition-all duration-300 placeholder-transparent " +
    "focus:border-cyan-200/60 focus:bg-cyan-200/5 focus:shadow-[0_0_20px_rgba(103,232,249,0.08)]";

  const borderClass = hasValue && !focused
    ? "border-emerald-400/30"
    : "border-white/10";

  return (
    <motion.div
      className="relative"
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      transition={{ delay: index * 0.07 }}
    >
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          placeholder={label}
          required
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`${sharedClass} ${borderClass} resize-none pt-6 pb-3`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={label}
          required
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`${sharedClass} ${borderClass} h-14 pt-5 pb-1`}
        />
      )}
      <motion.label
        htmlFor={name}
        className="pointer-events-none absolute left-4 text-slate-400 transition-all duration-200"
        animate={{
          top: isActive ? (multiline ? "10px" : "8px") : multiline ? "16px" : "50%",
          y: isActive ? 0 : multiline ? 0 : "-50%",
          fontSize: isActive ? "10px" : "14px",
          color: focused ? "rgb(103, 232, 249)" : isActive ? "rgb(148, 163, 184)" : "rgb(100, 116, 139)",
          letterSpacing: isActive ? "0.08em" : "0em",
          fontWeight: isActive ? 600 : 400,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </motion.div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not send message.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Message sent! I'll reply soon.");

      // Auto-reset after 4 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send message.");
    }
  };

  return (
    <motion.form
      ref={formRef}
      className="space-y-4"
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      <FloatingField name="name" label="Your name" index={0} />
      <FloatingField name="email" label="Email address" type="email" index={1} />
      <FloatingField name="message" label="Project idea" multiline index={2} />

      {/* Multi-state submit button */}
      <motion.button
        disabled={status === "sending" || status === "sent"}
        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        className={`relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-md px-6 text-sm font-semibold transition disabled:cursor-not-allowed ${
          status === "sent"
            ? "bg-emerald-400 text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.25)]"
            : "bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200"
        } ${status === "sending" ? "opacity-80" : ""}`}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2"
            >
              Send signal <Send size={17} />
            </motion.span>
          )}
          {status === "sending" && (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2"
            >
              Sending… <Loader2 size={17} className="animate-spin" />
            </motion.span>
          )}
          {status === "sent" && (
            <motion.span
              key="sent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              Sent <Check size={17} strokeWidth={3} />
            </motion.span>
          )}
          {status === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2"
            >
              Try again <Send size={17} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`text-sm ${status === "sent" ? "text-emerald-200" : "text-rose-200"}`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
