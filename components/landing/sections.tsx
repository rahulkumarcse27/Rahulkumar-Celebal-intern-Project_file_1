'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  MessagesSquare,
  ShieldCheck,
  Zap,
  BarChart3,
  Upload,
  Brain,
  Check,
  Minus,
  Plus,
  Star,
  Quote,
} from 'lucide-react'
import { Logo } from '@/components/logo'

/* ---------------------------------- Hero --------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] size-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] size-[360px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pt-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.a
            href="#features"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="size-2.5" />
            </span>
            Introducing Lumen 2.0 — semantic document intelligence
            <ArrowRight className="size-3" />
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Turn documents into{' '}
            <span className="text-primary">answers</span>, instantly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Upload contracts, reports, and research. Lumen reads, understands,
            and answers your questions with cited sources — so your team stops
            searching and starts deciding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start free trial
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-accent/5"
            >
              See how it works
            </a>
          </motion.div>

          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · 14-day Pro trial · SOC 2 Type II
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/hero-app.png"
              alt="Lumen document intelligence dashboard preview"
              width={1600}
              height={1000}
              priority
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
            Trusted by teams at
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-muted-foreground/50">
            {['Northwind', 'Acme Corp', 'Lumina', 'Vertex', 'Quanta', 'Helios'].map(
              (b) => (
                <span key={b}>{b}</span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Features -------------------------------- */

const features = [
  {
    icon: MessagesSquare,
    title: 'Chat with your documents',
    desc: 'Ask questions in plain language and get precise answers with citations to the exact page and paragraph.',
  },
  {
    icon: FileSearch,
    title: 'Semantic search',
    desc: 'Find concepts, not just keywords. Lumen understands meaning across your entire document library.',
  },
  {
    icon: Brain,
    title: 'Automatic insights',
    desc: 'Surface risks, renewal dates, anomalies, and cross-document entities without lifting a finger.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise security',
    desc: 'SOC 2 Type II, SSO/SAML, granular permissions, and full audit logs on every workspace.',
  },
  {
    icon: Zap,
    title: 'Lightning fast',
    desc: 'Process 200+ page documents in seconds with our optimized extraction and embedding pipeline.',
  },
  {
    icon: BarChart3,
    title: 'Usage analytics',
    desc: 'Track adoption, accuracy, and query volume across teams with a real-time analytics dashboard.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <SectionHeading
        eyebrow="Product features"
        title="Everything you need to understand your documents"
        subtitle="A complete intelligence layer over every file your organization touches."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-transform group-hover:scale-105">
              <f.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- How it works ----------------------------- */

const steps = [
  {
    icon: Upload,
    title: 'Upload anything',
    desc: 'Drag in PDFs, Word docs, spreadsheets, or scans. Lumen ingests and indexes them automatically.',
  },
  {
    icon: Brain,
    title: 'Lumen understands',
    desc: 'Our models extract structure, entities, and meaning, building a searchable knowledge graph.',
  },
  {
    icon: MessagesSquare,
    title: 'Ask & act',
    desc: 'Chat, search, and generate summaries with cited answers your whole team can trust.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From upload to answer in three steps"
          subtitle="No setup, no training data, no data science team required."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <s.icon className="size-5" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Benefits -------------------------------- */

const benefits = [
  'Cut document review time by up to 80%',
  'Never miss a renewal or compliance deadline',
  'Answer client questions in seconds, with sources',
  'Onboard new team members with instant context',
  'Keep sensitive data private with enterprise controls',
  'Search across thousands of files in one place',
]

export function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why teams choose Lumen
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Spend less time searching, more time deciding
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Your knowledge is trapped in documents nobody has time to read.
            Lumen unlocks it — turning static files into a living, queryable
            source of truth for your whole organization.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="size-3.5" />
                </span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '80%', label: 'Less review time' },
            { value: '96.8%', label: 'Extraction accuracy' },
            { value: '3.4s', label: 'Avg. processing' },
            { value: '10k+', label: 'Teams onboarded' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <p className="text-3xl font-semibold tracking-tight text-primary">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Pricing -------------------------------- */

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    desc: 'For individuals exploring document AI.',
    features: ['100 pages / month', '1 workspace', 'AI chat & search', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    desc: 'For teams that live in their documents.',
    features: [
      '20,000 pages / month',
      'Unlimited workspaces',
      'Advanced insights & analytics',
      'Priority support',
      'SSO & audit logs',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with scale & compliance needs.',
    features: [
      'Unlimited pages',
      'Dedicated infrastructure',
      'SAML SSO & SCIM',
      'Custom data retention',
      'Dedicated success manager',
    ],
    cta: 'Contact sales',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="Start free and scale as your team grows. No hidden fees."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                'relative flex flex-col rounded-2xl border bg-card p-6 ' +
                (p.featured
                  ? 'border-primary shadow-xl shadow-primary/10'
                  : 'border-border')
              }
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {p.price}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">
                  {p.period}
                </span>
              </div>
              <Link
                href="/register"
                className={
                  'mt-6 inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 ' +
                  (p.featured
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'border border-border bg-card hover:bg-accent/5')
                }
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      'Lumen replaced hours of contract review with a 30-second conversation. It flagged a renewal clause our legal team had missed.',
    name: 'Amara Chen',
    role: 'General Counsel, Northwind',
  },
  {
    quote:
      'We indexed 12 years of research reports. Now analysts get cited answers instantly instead of digging through folders.',
    name: 'Liam Ortiz',
    role: 'Head of Research, Vertex',
  },
  {
    quote:
      'The accuracy is genuinely impressive. It is the first AI tool our compliance team actually trusts with sources.',
    name: 'Sofia Rossi',
    role: 'VP Compliance, Helios',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by teams that read for a living"
        subtitle="From legal and finance to research and operations."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <Quote className="size-6 text-primary/40" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-pretty">
              {t.quote}
            </blockquote>
            <div className="mt-5 flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <figcaption className="mt-4 border-t border-border pt-4">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------- FAQ ---------------------------------- */

const faqs = [
  {
    q: 'What file types does Lumen support?',
    a: 'Lumen supports PDF, DOCX, TXT, XLSX, and common image formats (PNG, JPG) with OCR. More formats are added regularly.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'Yes. Lumen is SOC 2 Type II compliant, encrypts data at rest and in transit, and never trains public models on your documents.',
  },
  {
    q: 'How accurate are the AI answers?',
    a: 'Every answer includes citations to the source page so you can verify it. Average extraction accuracy is 96.8% across document types.',
  },
  {
    q: 'Can I invite my whole team?',
    a: 'Absolutely. Pro and Enterprise plans include unlimited workspaces, role-based permissions, and SSO for seamless onboarding.',
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes — every account starts with a 14-day Pro trial. No credit card required, and you can downgrade to the free Starter plan anytime.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything else you might want to know."
        />
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {isOpen ? (
                      <Minus className="size-3.5" />
                    ) : (
                      <Plus className="size-3.5" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------- CTA ---------------------------------- */

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-0 size-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-0 right-1/4 size-72 rounded-full bg-primary-foreground/30 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to turn your documents into answers?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
            Join thousands of teams using Lumen to work smarter. Start your free
            trial today — no credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-card px-6 text-sm font-semibold text-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Get started free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-xl border border-primary-foreground/30 px-6 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Footer --------------------------------- */

const footerCols = [
  { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Integrations', 'Changelog'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'API reference', 'Guides', 'Community', 'Status'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR', 'DPA'] },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The document intelligence platform that turns your files into
              instant, cited answers.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lumen Intelligence, Inc. All rights reserved.</p>
          <p>Built for teams who read for a living.</p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------ Shared heading ---------------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}
