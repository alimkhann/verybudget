"use client"

import { useEffect, useMemo, useState } from 'react'

// Lightweight i18n dictionaries for Terms
const termsDict = {
    en: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated',
        intro: 'These Terms govern your use of the VeryBudget landing site and participation in our waitlist. By submitting your email you agree to be contacted about updates, beta access, and product launches. You can unsubscribe at any time.',
        useOfSite: 'Use of the Site',
        useOfSite1: 'Do not misuse, attack, or attempt to disrupt the service.',
        useOfSite2: 'Content is provided "as is" without warranties.',
        waitlist: 'Waitlist',
        waitlistDesc: 'Joining the waitlist does not guarantee access or availability dates.',
        intellectualProperty: 'Intellectual Property',
        intellectualPropertyDesc: 'All trademarks, logos, and content on this site are owned by VeryBudget.',
        limitationOfLiability: 'Limitation of Liability',
        limitationOfLiabilityDesc: 'To the maximum extent permitted by law, VeryBudget is not liable for indirect or incidental damages arising from your use of this site.',
        contact: 'Contact',
        contactDesc: 'Questions? Email',
        backToHome: '← Back to home',
        language: 'Language'
    },
    ru: {
        title: 'Условия использования',
        lastUpdated: 'Последнее обновление',
        intro: 'Эти Условия регулируют использование вами лендинга VeryBudget и участие в нашем списке ожидания. Отправляя email, вы соглашаетесь получать уведомления об обновлениях, бета-доступе и запуске продукта. Вы можете отписаться в любое время.',
        useOfSite: 'Использование сайта',
        useOfSite1: 'Не злоупотребляйте, не атакуйте и не пытайтесь нарушить работу сервиса.',
        useOfSite2: 'Контент предоставляется "как есть" без гарантий.',
        waitlist: 'Список ожидания',
        waitlistDesc: 'Присоединение к списку ожидания не гарантирует доступ или даты доступности.',
        intellectualProperty: 'Интеллектуальная собственность',
        intellectualPropertyDesc: 'Все товарные знаки, логотипы и контент на этом сайте принадлежат VeryBudget.',
        limitationOfLiability: 'Ограничение ответственности',
        limitationOfLiabilityDesc: 'В максимальной степени, разрешенной законом, VeryBudget не несет ответственности за косвенные или случайные убытки, возникающие в результате использования вами этого сайта.',
        contact: 'Контакты',
        contactDesc: 'Вопросы? Напишите на email',
        backToHome: '← Назад на главную',
        language: 'Язык'
    }
}

type LangKey = keyof typeof termsDict

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

export default function TermsPage() {
    const [lang, setLang] = useLang()
    const t = useMemo(() => termsDict[lang], [lang])

    return (
        <main className="container-balanced py-10">
            {/* Language Picker */}
            <div className="mb-6 flex justify-end">
                <div className="btn-secondary rounded-lg border border-aqua/30 bg-white/50 px-3 py-2 shadow-sm">
                    <label htmlFor="lang" className="sr-only">{t.language}</label>
                    <select
                        id="lang"
                        value={lang}
                        onChange={(e) => setLang(e.target.value as LangKey)}
                        className="bg-transparent text-sm outline-none"
                    >
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-navy">{t.title}</h1>
            <p className="mt-1 text-navy/70">{t.lastUpdated}: {new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>

            <div className="mt-6 space-y-4 text-navy/90">
                <p>{t.intro}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.useOfSite}</h2>
                <ul className="list-disc space-y-1 pl-5">
                    <li>{t.useOfSite1}</li>
                    <li>{t.useOfSite2}</li>
                </ul>

                <h2 className="mt-6 text-xl font-semibold">{t.waitlist}</h2>
                <p>{t.waitlistDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.intellectualProperty}</h2>
                <p>{t.intellectualPropertyDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.limitationOfLiability}</h2>
                <p>{t.limitationOfLiabilityDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.contact}</h2>
                <p>{t.contactDesc} <strong>alimkhan.ergebayev@gmail.com</strong>.</p>

                <p className="pt-6">
                    <a className="text-aqua underline" href="/">← {t.backToHome}</a>
                </p>
            </div>
        </main>
    )
}