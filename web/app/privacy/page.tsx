"use client"

import { useEffect, useMemo, useState } from 'react'

// Lightweight i18n dictionaries for Privacy
const privacyDict = {
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated',
        intro: 'VeryBudget respects your privacy. This landing page collects only the data you voluntarily submit to join our waitlist or ask for support.',
        informationWeCollect: 'Information We Collect',
        infoCollect1: 'Email address and optional first name when you join the waitlist.',
        infoCollect2: 'For attribution: referrer URL, UTM parameters, locale, timezone, and your browser user agent.',
        infoCollect3: 'When you contact support: your email and the message you send.',
        howWeUse: 'How We Use Information',
        howWeUse1: 'To confirm your waitlist signup and send product updates.',
        howWeUse2: 'To respond to support requests.',
        howWeUse3: 'To understand interest and improve our marketing (aggregate only).',
        dataSharing: 'Data Sharing',
        dataSharingDesc: 'We do not sell your data. We use Supabase to securely store submissions. Service providers are bound by confidentiality and process data on our behalf only.',
        dataRetention: 'Data Retention',
        dataRetentionDesc: 'We retain your data until you ask us to delete it or until launch, whichever is earlier, unless required longer by law.',
        yourRights: 'Your Rights',
        yourRightsDesc: 'You can request access or deletion by contacting us at',
        children: 'Children',
        childrenDesc: 'This site is intended for users 16+.',
        changes: 'Changes',
        changesDesc: 'We may update this policy and will post the new date above.',
        backToHome: '← Back to home',
        language: 'Language'
    },
    ru: {
        title: 'Политика конфиденциальности',
        lastUpdated: 'Последнее обновление',
        intro: 'VeryBudget уважает вашу конфиденциальность. Эта лендинг-страница собирает только те данные, которые вы добровольно предоставляете для присоединения к нашему списку ожидания или обращения в поддержку.',
        informationWeCollect: 'Информация, которую мы собираем',
        infoCollect1: 'Email адрес и необязательное имя при присоединении к списку ожидания.',
        infoCollect2: 'Для атрибуции: URL реферера, UTM параметры, локаль, часовой пояс и user agent вашего браузера.',
        infoCollect3: 'При обращении в поддержку: ваш email и сообщение, которое вы отправляете.',
        howWeUse: 'Как мы используем информацию',
        howWeUse1: 'Для подтверждения регистрации в списке ожидания и отправки обновлений продукта.',
        howWeUse2: 'Для ответов на запросы в поддержку.',
        howWeUse3: 'Для понимания интереса и улучшения нашего маркетинга (только в агрегированном виде).',
        dataSharing: 'Передача данных',
        dataSharingDesc: 'Мы не продаем ваши данные. Мы используем Supabase для безопасного хранения заявок. Поставщики услуг связаны конфиденциальностью и обрабатывают данные только от нашего имени.',
        dataRetention: 'Хранение данных',
        dataRetentionDesc: 'Мы храним ваши данные до тех пор, пока вы не попросите нас их удалить, или до запуска, в зависимости от того, что наступит раньше, если законом не требуется более длительное хранение.',
        yourRights: 'Ваши права',
        yourRightsDesc: 'Вы можете запросить доступ или удаление, связавшись с нами по адресу',
        children: 'Дети',
        childrenDesc: 'Этот сайт предназначен для пользователей 16+.',
        changes: 'Изменения',
        changesDesc: 'Мы можем обновить эту политику и опубликуем новую дату выше.',
        backToHome: '← Назад на главную',
        language: 'Язык'
    }
}

type LangKey = keyof typeof privacyDict

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

export default function PrivacyPage() {
    const [lang, setLang] = useLang()
    const t = useMemo(() => privacyDict[lang], [lang])

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

                <h2 className="mt-6 text-xl font-semibold">{t.informationWeCollect}</h2>
                <ul className="list-disc space-y-1 pl-5">
                    <li>{t.infoCollect1}</li>
                    <li>{t.infoCollect2}</li>
                    <li>{t.infoCollect3}</li>
                </ul>

                <h2 className="mt-6 text-xl font-semibold">{t.howWeUse}</h2>
                <ul className="list-disc space-y-1 pl-5">
                    <li>{t.howWeUse1}</li>
                    <li>{t.howWeUse2}</li>
                    <li>{t.howWeUse3}</li>
                </ul>

                <h2 className="mt-6 text-xl font-semibold">{t.dataSharing}</h2>
                <p>{t.dataSharingDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.dataRetention}</h2>
                <p>{t.dataRetentionDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.yourRights}</h2>
                <p>{t.yourRightsDesc} <strong>alimkhan.ergebayev@gmail.com</strong>.</p>

                <h2 className="mt-6 text-xl font-semibold">{t.children}</h2>
                <p>{t.childrenDesc}</p>

                <h2 className="mt-6 text-xl font-semibold">{t.changes}</h2>
                <p>{t.changesDesc}</p>

                <p className="pt-6">
                    <a className="text-aqua underline" href="/">← {t.backToHome}</a>
                </p>
            </div>
        </main>
    )
}
