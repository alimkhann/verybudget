"use client"

import { useEffect, useMemo, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '@/lib/supabase'
import clsx from 'clsx'

// Lightweight i18n dictionaries
const dict = {
    en: {
        brand: 'VERYBUDGET',
        headline: 'Budget Smarter. Save More.',
        subhead: 'Track your spending in minutes and watch your savings grow. Built for students with a playful fishbowl vibe.',
        cta: 'Join the Waitlist',
        support: 'Ask a Question',
        features: 'Features',
        f1: 'Simple Setup',
        f2: 'Fun Gamification',
        f3: 'AI Spending Tips',
        f1Desc: 'Set up your budget in under 3 minutes with our streamlined onboarding process.',
        f2Desc: 'Watch your savings grow in a virtual fishbowl - spend money, water drops; save money, fish grows.',
        f3Desc: 'Get personalized AI tips to optimize your spending and reach your financial goals faster.',
        useCases: 'Perfect For',
        uc1: 'First-year students',
        uc2: 'Part-time workers',
        uc3: 'Savings goals',
        uc1Desc: 'Learning to manage your first student loan or allowance responsibly.',
        uc2Desc: 'Balancing work income with study expenses and building emergency funds.',
        uc3Desc: 'Saving for that laptop, trip, or just building better money habits.',
        faq: 'Frequently Asked Questions',
        faq1: 'When will VeryBudget launch?',
        faq1Ans: 'We\'re targeting a soft launch in 8 weeks. Join the waitlist to get early access!',
        faq2: 'Is my data secure?',
        faq2Ans: 'Absolutely. All data stays on your device - no cloud storage, no tracking, just local privacy.',
        faq3: 'What makes this different from other budgeting apps?',
        faq3Ans: 'VeryBudget combines the simplicity students need with gamification that actually makes budgeting fun. Plus, our AI gives personalized tips, not generic advice.',
        faq4: 'Will there be a free version?',
        faq4Ans: 'Yes! The core budgeting and fishbowl features will always be free. Premium features like advanced AI insights and customization will be optional.',
        emailPh: 'Enter your email',
        namePh: 'First name (optional)',
        signingUp: 'Joining…',
        signed: "You're in! 🐟",
        error: 'Something went wrong. Try again.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        lang: 'Language',
        supportTitle: 'We\'re here to help',
        supportDesc: 'Ask anything and leave your email so we can reply.',
        messagePh: 'Your question or message…',
        sending: 'Sending…',
        send: 'Send Message',
        sent: 'Thanks! We\'ll get back to you. 🐟',
        waitlistTitle: 'Join the VeryBudget Waitlist',
        waitlistDesc: 'Be first to know when we launch and get exclusive early access.',
        enrolledCount: 'students already enrolled',
        finalCta: 'Ready to transform your finances?',
        finalCtaSub: 'Join thousands of students who are already budgeting smarter.',
    },
    ru: {
        brand: 'VERYBUDGET',
        headline: 'Бюджетируй умнее. Копи больше.',
        subhead: 'Отслеживай траты за минуты и наблюдай, как растут сбережения. Приложение для студентов с игрой про аквариум.',
        cta: 'Присоединиться к листу ожидания',
        support: 'Задать вопрос',
        features: 'Возможности',
        f1: 'Простой старт',
        f2: 'Весёлая геймификация',
        f3: 'AI‑советы по тратам',
        f1Desc: 'Настрой бюджет за 3 минуты с помощью простого процесса регистрации.',
        f2Desc: 'Наблюдай, как растут сбережения в виртуальном аквариуме - тратишь деньги, вода убывает; копишь - рыбка растёт.',
        f3Desc: 'Получай персональные AI-советы для оптимизации трат и быстрого достижения финансовых целей.',
        useCases: 'Идеально для',
        uc1: 'Студентов первого курса',
        uc2: 'Работающих студентов',
        uc3: 'Целей по накоплению',
        uc1Desc: 'Обучение управлению первым студенческим кредитом или стипендией.',
        uc2Desc: 'Балансирование дохода от работы с учебными расходами и создание резервного фонда.',
        uc3Desc: 'Накопление на ноутбук, поездку или просто формирование лучших денежных привычек.',
        faq: 'Часто задаваемые вопросы',
        faq1: 'Когда запустится VeryBudget?',
        faq1Ans: 'Мы планируем мягкий запуск через 8 недель. Присоединяйся к списку ожидания для раннего доступа!',
        faq2: 'Безопасны ли мои данные?',
        faq2Ans: 'Абсолютно. Все данные остаются на твоём устройстве - никакого облачного хранения, никакого отслеживания, только локальная конфиденциальность.',
        faq3: 'Чем это отличается от других приложений для бюджетирования?',
        faq3Ans: 'VeryBudget сочетает простоту, необходимую студентам, с геймификацией, которая действительно делает бюджетирование весёлым. Плюс наш AI даёт персональные советы, а не общие рекомендации.',
        faq4: 'Будет ли бесплатная версия?',
        faq4Ans: 'Да! Основные функции бюджетирования и аквариума всегда будут бесплатными. Премиум-функции, такие как продвинутые AI-инсайты и настройка, будут опциональными.',
        emailPh: 'Ваш email',
        namePh: 'Имя (необязательно)',
        signingUp: 'Добавляем…',
        signed: 'Вы в списке! 🐟',
        error: 'Что‑то пошло не так. Попробуйте ещё раз.',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
        lang: 'Язык',
        supportTitle: 'Поможем с удовольствием',
        supportDesc: 'Задайте вопрос и оставьте email — мы ответим.',
        supportEmailPh: 'Ваш email',
        supportMsgPh: 'Ваш вопрос…',
        messagePh: 'Ваш вопрос или сообщение…',
        sending: 'Отправляем…',
        send: 'Отправить сообщение',
        sent: 'Спасибо! Мы ответим. 🐟',
        waitlistTitle: 'Присоединиться к списку ожидания VeryBudget',
        waitlistDesc: 'Узнай первым о запуске и получи эксклюзивный ранний доступ.',
        enrolledCount: 'студентов уже записались',
        finalCta: 'Готов трансформировать свои финансы?',
        finalCtaSub: 'Присоединяйся к тысячам студентов, которые уже бюджетируют умнее.',
    },
}

type LangKey = keyof typeof dict

function useLang(): [LangKey, (l: LangKey) => void] {
    const [lang, setLang] = useState<LangKey>('en')
    useEffect(() => {
        const url = new URL(window.location.href)
        const q = (url.searchParams.get('lang') as LangKey) || undefined
        const nav = (navigator.language || 'en').slice(0, 2)
        setLang(q ?? (nav === 'ru' ? 'ru' : 'en'))
    }, [])
    return [lang, setLang]
}

function BackgroundGraphic() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1600 900"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full object-cover"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
            >
                <defs>
                    <radialGradient id="glowA" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8BE9DC" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#2BBBAD" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="glowB" cx="25%" cy="25%" r="50%">
                        <stop offset="0%" stopColor="#FFC1B8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#FF6F61" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="glowC" cx="70%" cy="70%" r="50%">
                        <stop offset="0%" stopColor="#B8D0FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#1B2B4A" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="800" cy="450" r="400" fill="url(#glowA)" />
                <circle cx="500" cy="300" r="300" fill="url(#glowB)" />
                <circle cx="1100" cy="600" r="300" fill="url(#glowC)" />
            </svg>
        </div>
    )
}

function EmailCounter({ lang }: { lang: LangKey }) {
    const [count, setCount] = useState(0)

    const fetchCount = async () => {
        const { data, error } = await supabase.rpc('waitlist_count')
        if (!error && typeof data === 'number') setCount(data)
    }

    useEffect(() => {
        fetchCount()

        // Refresh count every 30 seconds
        const interval = setInterval(fetchCount, 30000)

        function onAdded() {
            setCount((c) => c + 1)
        }
        window.addEventListener('waitlist-added', onAdded)

        return () => {
            clearInterval(interval)
            window.removeEventListener('waitlist-added', onAdded)
        }
    }, [])

    return (
        <div className="flex items-center gap-2 text-sm text-navy/70">
            <div className="relative">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <span>{count.toLocaleString()} {dict[lang].enrolledCount}</span>
        </div>
    )
}

export default function Page() {
    const [lang, setLang] = useLang()
    const t = useMemo(() => dict[lang], [lang])

    return (
        <main className="relative min-h-screen">
            <BackgroundGraphic />

            {/* Sticky Header with Glass Effect */}
            <header className="sticky top-4 z-40">
                <div className="mx-auto mt-0 w-full md:w-[60%] max-w-5xl min-w-[320px]">
                    <div className="rounded-2xl border border-white/25 bg-white/25 backdrop-blur-md shadow-lg">
                        <div className="flex items-center justify-between py-3 px-5">
                            <div className="flex items-center gap-3">
                                <img src="/icon.png" alt="VeryBudget Logo" className="h-9 w-9 rounded-xl" />
                                <span className="text-sm font-semibold tracking-widest text-navy">{t.brand}</span>
                            </div>
                            <nav className="flex items-center gap-3 text-sm">
                                <div className="btn-secondary rounded-lg border border-aqua/30 bg-white/50 px-3 py-2 shadow-sm">
                                    <label htmlFor="lang" className="sr-only">{t.lang}</label>
                                    <select id="lang" value={lang} onChange={(e) => setLang(e.target.value as LangKey)} className="bg-transparent text-sm outline-none">
                                        <option value="en">EN</option>
                                        <option value="ru">RU</option>
                                    </select>
                                </div>
                                <SupportButton lang={lang} t={t} />
                                <WaitlistButton lang={lang} t={t} compact />
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container-wide flex flex-col items-center justify-center text-center min-h-[85vh] md:min-h-[92vh] pt-6 pb-24">
                <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-6xl lg:text-7xl">
                    {t.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-balance text-lg text-navy/80 sm:text-xl">
                    {t.subhead}
                </p>
                <div className="mt-8">
                    <WaitlistButton lang={lang} t={t} />
                </div>
                <div className="mt-6">
                    <EmailCounter lang={lang} />
                </div>
            </section>

            {/* Features Section */}
            <section className="container-wide py-24">
                <h2 className="text-center text-3xl font-bold text-navy mb-16">{t.features}</h2>
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-aqua/10 text-3xl">⚙️</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.f1}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.f1Desc}</p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-aqua/10 text-3xl">🎮</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.f2}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.f2Desc}</p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-aqua/10 text-3xl">🧠</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.f3}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.f3Desc}</p>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="container-wide py-24">
                <h2 className="text-center text-3xl font-bold text-navy mb-16">{t.useCases}</h2>
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100/60 text-3xl">🎓</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.uc1}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.uc1Desc}</p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100/60 text-3xl">💼</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.uc2}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.uc2Desc}</p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-100/60 text-3xl">🎯</div>
                        <h3 className="mb-3 text-xl font-semibold text-navy">{t.uc3}</h3>
                        <p className="text-navy/70 leading-relaxed">{t.uc3Desc}</p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="container-wide py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy mb-4">{t.finalCta}</h2>
                    <p className="text-lg text-navy/70 mb-8">{t.finalCtaSub}</p>
                    <div className="mb-6 flex justify-center">
                        <EmailCounter lang={lang} />
                    </div>
                    <WaitlistButton lang={lang} t={t} />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container-wide py-24">
                <h2 className="text-center text-3xl font-bold text-navy mb-16">{t.faq}</h2>
                <div className="max-w-4xl mx-auto space-y-6">
                    <FAQItem question={t.faq1} answer={t.faq1Ans} />
                    <FAQItem question={t.faq2} answer={t.faq2Ans} />
                    <FAQItem question={t.faq3} answer={t.faq3Ans} />
                    <FAQItem question={t.faq4} answer={t.faq4Ans} />
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-12 border-t border-aqua/20 bg-white/50">
                <div className="container-wide">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-8 text-sm">
                            <a className="text-navy/70 hover:text-navy" href="/privacy">{t.privacy}</a>
                            <a className="text-navy/70 hover:text-navy" href="/terms">{t.terms}</a>
                        </div>
                        <p className="text-xs text-navy/60">© {new Date().getFullYear()} VeryBudget</p>
                    </div>
                </div>
            </footer>
        </main>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-aqua/20 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-aqua/5 transition-colors"
            >
                <span className="font-medium text-navy text-lg">{question}</span>
                <span className="text-aqua text-2xl transition-transform duration-200">
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="px-8 pb-6">
                    <p className="text-navy/70 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    )
}

type T = typeof dict['en']

function WaitlistButton({ lang, t, compact }: { lang: LangKey, t: T, compact?: boolean }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button
                className={compact ? "btn-secondary px-4 py-2" : "btn-primary text-lg px-6 py-3"}
                onClick={() => setOpen(true)}
            >
                {t.cta}
            </button>
            {open && (
                <Portal>
                    <WaitlistModal lang={lang} t={t} onClose={() => setOpen(false)} />
                </Portal>
            )}
        </>
    )
}

function Portal({ children }: { children: React.ReactNode }) {
    const elRef = useRef<HTMLDivElement | null>(null)
    if (!elRef.current) elRef.current = document.createElement('div')
    useEffect(() => {
        const el = elRef.current!
        document.body.appendChild(el)
        return () => { document.body.removeChild(el) }
    }, [])
    return createPortal(children, elRef.current!)
}

function ModalShell({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = prev }
    }, [])

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="min-h-full grid place-items-center">
                <button aria-hidden onClick={onClose} className="fixed inset-0 bg-black/40" />
                <div role="dialog" aria-modal className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-soft ring-1 ring-aqua/10">
                    {children}
                </div>
            </div>
        </div>
    )
}

function WaitlistModal({ lang, t, onClose }: { lang: LangKey, t: T, onClose: () => void }) {
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
    const [err, setErr] = useState<string | undefined>()
    const [utms, setUtms] = useState({ source: '', medium: '', campaign: '' })

    useEffect(() => {
        const p = new URLSearchParams(window.location.search)
        setUtms({
            source: p.get('utm_source') ?? '',
            medium: p.get('utm_medium') ?? '',
            campaign: p.get('utm_campaign') ?? '',
        })
    }, [])

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('saving'); setErr(undefined)
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error'); setErr('Invalid email'); return
        }
        const { error } = await supabase.from('waitlist_signups').insert([{
            email_address: email.trim(),
            first_name: fname.trim() || null,
            status: 'pending',
            source: 'landing',
            referrer_url: document.referrer || null,
            utm_source: utms.source,
            utm_medium: utms.medium,
            utm_campaign: utms.campaign,
            locale: lang,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
            user_agent: navigator.userAgent,
        }])

        if (error) {
            setStatus('error'); setErr(error.message); return
        }

        // success
        window.dispatchEvent(new CustomEvent('waitlist-added'))
        setStatus('done')
        setEmail('')
        setFname('')
    }

    return (
        <ModalShell onClose={onClose}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">{t.waitlistTitle}</h3>
                <button onClick={onClose} aria-label="Close" className="rounded-md px-2 py-1 text-navy/60 hover:bg-aqua/10">✕</button>
            </div>
            <p className="mt-1 text-sm text-navy/70">{t.waitlistDesc}</p>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
                <label className="sr-only" htmlFor="wEmail">Email</label>
                <input
                    id="wEmail"
                    type="email"
                    required
                    placeholder={t.emailPh}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />

                <label className="sr-only" htmlFor="wFname">First name</label>
                <input
                    id="wFname"
                    type="text"
                    placeholder={t.namePh}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="input"
                />

                <button disabled={status === 'saving'} className="w-full btn-primary">
                    {status === 'saving' ? t.signingUp : t.cta}
                </button>

                {status === 'error' && <p className="text-sm text-red-600">{err ?? t.error}</p>}
                {status === 'done' && <p className="text-sm text-aqua-600">{t.signed}</p>}
            </form>
        </ModalShell>
    )
}


function SupportButton({ lang, t }: { lang: LangKey, t: T }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button className="btn-secondary px-6 py-3" onClick={() => setOpen(true)}>{t.support}</button>
            {open && (
                <Portal>
                    <SupportModal lang={lang} t={t} onClose={() => setOpen(false)} />
                </Portal>
            )}
        </>
    )
}

function SupportModal({ lang, t, onClose }: { lang: LangKey, t: T, onClose: () => void }) {
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
    const [err, setErr] = useState<string | undefined>()

    async function send(e: React.FormEvent) {
        e.preventDefault()
        setStatus('saving'); setErr(undefined)
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || msg.trim().length < 4) {
            setStatus('error'); setErr('Invalid'); return
        }
        const { error } = await supabase.from('support_inquiries').insert([
            {
                email_address: email.trim(),
                message: msg.trim(),
                referrer_url: document.referrer || null,
                locale: lang,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
                user_agent: navigator.userAgent,
            },
        ])
        setStatus(error ? 'error' : 'done')
        if (error) setErr(error.message)

        window.dispatchEvent(new CustomEvent('support-sent'))
        setStatus('done')
        setEmail('')
        setMsg('')
    }

    return (
        <ModalShell onClose={onClose}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">{t.supportTitle}</h3>
                <button onClick={onClose} aria-label="Close" className="rounded-md px-2 py-1 text-navy/60 hover:bg-aqua/10">✕</button>
            </div>
            <p className="mt-1 text-sm text-navy/70">{t.supportDesc}</p>
            <form onSubmit={send} className="mt-4 space-y-3">
                <label className="sr-only" htmlFor="sEmail">Email</label>
                <input
                    id="sEmail"
                    type="email"
                    required
                    placeholder={t.emailPh}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />

                <label className="sr-only" htmlFor="sMessage">Message</label>
                <textarea
                    id="sMessage"
                    required
                    placeholder={t.messagePh}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    className="input resize-none"
                />

                <button disabled={status === 'saving'} className="w-full btn-primary">
                    {status === 'saving' ? t.sending : t.send}
                </button>

                {status === 'error' && <p className="text-sm text-red-600">{err ?? t.error}</p>}
                {status === 'done' && <p className="text-sm text-aqua-600">{t.sent}</p>}
            </form>
        </ModalShell>
    )
}