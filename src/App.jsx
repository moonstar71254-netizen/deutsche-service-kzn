import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'
import Lenis from 'lenis'
import { ArrowUpRight, Clock, CreditCard, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react'
import { siteConfig } from './data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

const easeOutExpo = [0.23, 1, 0.32, 1]

export default function App() {
  const rootRef = useRef(null)
  const [selectedMarque, setSelectedMarque] = useState(siteConfig.marques[1])
  const [selectedTopic, setSelectedTopic] = useState(siteConfig.quickTopics[0])

  const prefilledText = encodeURIComponent(
    `Здравствуйте, хочу записаться в Deutsche Service. Автомобиль: ${selectedMarque}, вопрос: ${selectedTopic}.`
  )
  const dynamicWhatsappHref = `https://wa.me/${siteConfig.contacts.whatsappNumber}?text=${prefilledText}`

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-item', {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })

        gsap.to('.hero-media-img', {
          scale: 1.1,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-grid',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.utils.toArray('.section-reveal').forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          })
        })

        gsap.from('.service-card-item', {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 82%',
            once: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="min-h-screen bg-[#050608] text-[#F3F4F6] selection:bg-[#D94126]/30">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#F3F4F6]/[0.08] bg-[#050608]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#D94126]" />
            <span className="font-display text-sm font-medium tracking-wider uppercase text-[#F3F4F6] sm:text-base">
              {siteConfig.brandName}
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-medium tracking-wide uppercase text-[#8C93A0] md:flex">
            <a href="#services" className="transition-colors duration-200 hover:text-[#F3F4F6]">
              Работы
            </a>
            <a href="#booking" className="transition-colors duration-200 hover:text-[#F3F4F6]">
              Запись
            </a>
            <a href="#contacts" className="transition-colors duration-200 hover:text-[#F3F4F6]">
              Контакты
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.contacts.phoneHref}
              className="hidden font-mono-tech text-xs text-[#8C93A0] transition-colors duration-200 hover:text-[#F3F4F6] lg:inline"
            >
              {siteConfig.contacts.phoneDisplay}
            </a>
            <a
              href={siteConfig.contacts.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-tactile btn-accent-hover inline-flex items-center gap-2 rounded-lg bg-[#D94126] px-4 py-2 text-xs font-semibold text-white"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-grid grid-backdrop relative min-h-screen border-b border-[#F3F4F6]/[0.08] pt-24">
          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-7">
              <div className="hero-item mb-6 inline-flex flex-wrap items-center gap-3 rounded-lg border border-[#F3F4F6]/10 bg-[#0B0D11] px-3.5 py-2">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#D94126]">
                  {siteConfig.hero.eyebrow}
                </span>
                <span className="h-3 w-px bg-[#F3F4F6]/15" />
                <a
                  href={siteConfig.rating.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#F3F4F6]"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D94126]" />
                  <span>{siteConfig.rating.score}</span>
                  <span className="text-[#8C93A0]">({siteConfig.rating.reviewsCount})</span>
                </a>
              </div>

              <h1 className="hero-item font-display text-4xl leading-[1.05] font-medium tracking-tight text-[#F3F4F6] sm:text-5xl lg:text-[56px]">
                {siteConfig.hero.headline}
              </h1>

              <p className="hero-item mt-6 max-w-xl text-base leading-relaxed text-[#9CA3AF]">
                {siteConfig.hero.description}
              </p>

              <div className="hero-item mt-8 flex flex-wrap gap-2">
                {siteConfig.marques.map((marque) => (
                  <span
                    key={marque}
                    className="font-mono-tech rounded border border-[#F3F4F6]/10 bg-[#0B0D11] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#D1D5DB]"
                  >
                    {marque}
                  </span>
                ))}
              </div>

              <div className="hero-item mt-9 flex flex-wrap items-center gap-3.5">
                <a
                  href={siteConfig.contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-accent-hover inline-flex items-center gap-2.5 rounded-lg bg-[#D94126] px-6 py-3.5 text-sm font-semibold text-white"
                >
                  <Send className="h-4 w-4" />
                  <span>{siteConfig.hero.primaryCta}</span>
                </a>
                <a
                  href={siteConfig.contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile btn-outline-hover inline-flex items-center gap-2.5 rounded-lg border border-[#F3F4F6]/15 bg-[#0B0D11] px-6 py-3.5 text-sm font-medium text-[#F3F4F6]"
                >
                  <MessageCircle className="h-4 w-4 text-[#D94126]" />
                  <span>{siteConfig.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            <div className="hero-item lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#F3F4F6]/10 bg-[#0B0D11]">
                <img
                  src={siteConfig.hero.image}
                  alt={siteConfig.hero.imageAlt}
                  className="hero-media-img h-full w-full object-cover object-center will-change-transform"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5,6,8,0.12) 0%, rgba(5,6,8,0.2) 55%, rgba(5,6,8,0.9) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#D94126]">
                    {siteConfig.contacts.hours}
                  </div>
                  <div className="mt-1 text-sm text-[#F3F4F6]">{siteConfig.contacts.bookingNote}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#0B0D11] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="section-reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D94126]">
                  Направления работ
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium text-[#F3F4F6] sm:text-4xl">
                  Диагностика, ремонт и дооснащение
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#8C93A0]">
                Работаем по профильным регламентам концернов VAG, BMW Group и Mercedes-Benz.
              </p>
            </div>

            <div className="services-grid mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {siteConfig.services.map((service) => (
                <article
                  key={service.code}
                  className="service-card-item card-interactive flex flex-col justify-between rounded-xl border border-[#F3F4F6]/[0.09] bg-[#11141B] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-xs text-[#D94126]">{service.code}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#8C93A0]" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-medium text-[#F3F4F6]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#8C93A0]">{service.summary}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[#F3F4F6]/[0.07] pt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#0B0D11] px-2.5 py-1 text-[11px] text-[#C2C7D0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#F3F4F6]/[0.08] bg-[#050608] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="section-reveal grid gap-6 md:grid-cols-3">
              {siteConfig.gallery.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-xl border border-[#F3F4F6]/[0.08] bg-[#0B0D11]"
                >
                  <div className="aspect-[16/11] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#D94126]">
                      {item.label}
                    </div>
                    <h3 className="mt-2 font-display text-base font-medium text-[#F3F4F6]">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="border-t border-[#F3F4F6]/[0.08] bg-[#0B0D11] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="section-reveal rounded-2xl border border-[#F3F4F6]/10 bg-[#11141B] p-6 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D94126]">
                    Быстрая запись
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-medium text-[#F3F4F6] sm:text-3xl">
                    Выберите марку и задачу для оценки в мессенджере
                  </h2>

                  <div className="mt-7">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#8C93A0]">
                      Марка автомобиля
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {siteConfig.marques.map((marque) => {
                        const active = marque === selectedMarque
                        return (
                          <button
                            key={marque}
                            type="button"
                            onClick={() => setSelectedMarque(marque)}
                            className={`btn-tactile relative rounded-lg px-3.5 py-2 font-mono-tech text-xs ${
                              active
                                ? 'text-white'
                                : 'border border-[#F3F4F6]/10 bg-[#0B0D11] text-[#8C93A0] hover:text-[#F3F4F6]'
                            }`}
                          >
                            {active && (
                              <motion.span
                                layoutId="marquePill"
                                transition={{ duration: 0.24, ease: easeOutExpo }}
                                className="absolute inset-0 rounded-lg bg-[#D94126]"
                              />
                            )}
                            <span className="relative z-10">{marque}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#8C93A0]">
                      Причина обращения
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {siteConfig.quickTopics.map((topic) => {
                        const active = topic === selectedTopic
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setSelectedTopic(topic)}
                            className={`btn-tactile rounded-lg border px-3.5 py-2 text-xs font-medium ${
                              active
                                ? 'border-[#D94126] bg-[#D94126]/15 text-[#F3F4F6]'
                                : 'border-[#F3F4F6]/10 bg-[#0B0D11] text-[#8C93A0] hover:text-[#F3F4F6]'
                            }`}
                          >
                            {topic}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#F3F4F6]/[0.09] bg-[#0B0D11] p-6 lg:col-span-5">
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#8C93A0]">
                    Выбранный запрос
                  </div>
                  <div className="mt-3 font-display text-lg text-[#F3F4F6]">{selectedMarque}</div>
                  <div className="mt-1 text-sm text-[#9CA3AF]">{selectedTopic}</div>
                  <p className="mt-4 text-xs leading-relaxed text-[#8C93A0]">
                    Отправьте марку, год выпуска или VIN в чат — сориентируем по ближайшему окну на
                    подъемник и наличию запчастей.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={dynamicWhatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-tactile btn-accent-hover inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#D94126] px-5 py-3.5 text-sm font-semibold text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Отправить в WhatsApp</span>
                    </a>
                    <a
                      href={siteConfig.contacts.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-tactile btn-outline-hover inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#F3F4F6]/15 px-5 py-3.5 text-sm font-medium text-[#F3F4F6]"
                    >
                      <Send className="h-4 w-4 text-[#D94126]" />
                      <span>Написать в Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="border-t border-[#F3F4F6]/[0.08] bg-[#050608] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#F3F4F6]/[0.08] bg-[#0B0D11] p-6">
              <MapPin className="h-4 w-4 text-[#D94126]" />
              <div className="mt-4 text-sm font-medium text-[#F3F4F6]">
                {siteConfig.contacts.address}
              </div>
              <div className="mt-1 text-xs text-[#8C93A0]">{siteConfig.contacts.district}</div>
              <div className="mt-2 font-mono-tech text-[11px] text-[#8C93A0]">
                {siteConfig.contacts.landmark}
              </div>
            </div>

            <div className="rounded-xl border border-[#F3F4F6]/[0.08] bg-[#0B0D11] p-6">
              <Clock className="h-4 w-4 text-[#D94126]" />
              <div className="mt-4 text-sm font-medium text-[#F3F4F6]">
                {siteConfig.contacts.hours}
              </div>
              <div className="mt-1 text-xs text-[#8C93A0]">{siteConfig.contacts.bookingNote}</div>
              <a
                href={siteConfig.contacts.phoneHref}
                className="mt-4 inline-flex items-center gap-2 font-mono-tech text-xs text-[#F3F4F6]"
              >
                <Phone className="h-3.5 w-3.5 text-[#D94126]" />
                <span>{siteConfig.contacts.phoneDisplay}</span>
              </a>
            </div>

            <div className="rounded-xl border border-[#F3F4F6]/[0.08] bg-[#0B0D11] p-6">
              <CreditCard className="h-4 w-4 text-[#D94126]" />
              <div className="mt-4 text-sm font-medium text-[#F3F4F6]">Оплата и карточка</div>
              <div className="mt-1 text-xs text-[#8C93A0]">{siteConfig.contacts.paymentMethods}</div>
              <a
                href={siteConfig.rating.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#D94126]"
              >
                <span>Отзывы в 2ГИС ({siteConfig.rating.score})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#F3F4F6]/[0.08] pt-6 text-xs text-[#8C93A0] sm:flex-row sm:items-center">
            <span>{siteConfig.brandName} · {siteConfig.city}</span>
            <div className="flex items-center gap-6">
              <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-[#F3F4F6]">
                Telegram
              </a>
              <a href={siteConfig.contacts.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-[#F3F4F6]">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
