"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Bell, Clock3, ExternalLink, Filter, Gift, Radio, Star, X } from "lucide-react"

const badges = [
  { id: "1", name: "Warrior Jar Alexander", type: "Suscripción", endsAt: "2026-11-28T23:59:00Z", claim: "Suscríbete o regala una suscripción a cualquier canal de la categoría ELDEN RING. Prime no cuenta.", category: "ELDEN RING", isNew: true, icon: Gift },
  { id: "2", name: "BeAGoldfish", type: "Suscripción", endsAt: "2026-11-05T20:00:00Z", claim: "Suscríbete o regala una suscripción a cualquier canal. Prime no cuenta.", category: "Cualquier canal", isNew: false, icon: Star },
  { id: "3", name: "Suscripción de 12 meses", type: "Suscripción", endsAt: "2026-11-10T12:00:00Z", claim: "Activa la renovación automática o regala una suscripción de 12 meses.", category: "Cualquier canal", isNew: false, icon: Star },
  { id: "4", name: "50 horas vistas", type: "Tiempo visto", endsAt: "2026-11-08T18:30:00Z", claim: "Alcanza este hito de tiempo visto en cualquier canal.", category: "Cualquier canal", isNew: true, icon: Clock3 },
  { id: "5", name: "Suscripción premium", type: "Suscripción", endsAt: "2026-11-15T09:00:00Z", claim: "Activa una suscripción al canal.", category: "Cualquier canal", isNew: false, icon: Star },
  { id: "6", name: "100 horas vistas", type: "Tiempo visto", endsAt: "2026-11-20T14:00:00Z", claim: "Alcanza este hito de tiempo visto.", category: "Cualquier canal", isNew: false, icon: Clock3 },
]

type BadgeItem = (typeof badges)[number]

function timeLeft(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return "Caducada"
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  return `${days}d ${hours}h ${minutes}m`
}

function BadgeCard({ badge, onSelect }: { badge: BadgeItem; onSelect: () => void }) {
  const Icon = badge.icon
  const endingSoon = new Date(badge.endsAt).getTime() - Date.now() < 7 * 86400000
  return (
    <button onClick={onSelect} className={`group relative w-full rounded-2xl border bg-card/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-card ${endingSoon ? "border-orange-400/30" : "border-border/70"}`}>
      {badge.isNew && <span className="absolute -top-2 left-4 rounded-full bg-cyan-300 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-950">NUEVO</span>}
      {endingSoon && <span className="absolute -top-2 right-3 rounded-full bg-orange-400 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-950">TERMINA PRONTO</span>}
      <div className="flex gap-3.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-cyan-300"><Icon aria-hidden="true" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-semibold text-foreground">{badge.name}</h3><span className="rounded-full bg-violet-400/15 px-2 py-0.5 text-[11px] text-violet-300">{badge.type}</span></div>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-cyan-300"><Clock3 aria-hidden="true" className="size-3.5" />{timeLeft(badge.endsAt)}</div>
          <p className="mt-1 truncate text-xs text-muted-foreground">{badge.claim}</p>
        </div>
        <ArrowRight aria-hidden="true" className="mt-3 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cyan-300" />
      </div>
    </button>
  )
}

export function BadgeTracker() {
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<BadgeItem | null>(null)
  const filtered = useMemo(() => badges.filter((badge) => filter === "all" || (filter === "subscription" ? badge.type === "Suscripción" : badge.type === "Tiempo visto")), [filter])
  return (
    <div className="min-h-screen overflow-hidden bg-[#06070d] text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#090a12]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex items-center gap-3"><img src="/alertadropsmx-logo.png" alt="Logo de Alertas de Drops" className="size-12 rounded-xl object-cover" /><span><strong className="block text-base leading-tight">Alertas <span className="text-cyan-300">de Drops</span></strong><span className="text-[11px] text-muted-foreground">Rastreador de insignias de Twitch</span></span></a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"><a className="text-cyan-300" href="#top">Inicio</a><a href="#badges">Insignias</a><a href="https://twitch.tv/alertadropsmx" target="_blank" rel="noreferrer">En vivo</a></nav>
          <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200" href="https://twitch.tv/alertadropsmx" target="_blank" rel="noreferrer"><Radio aria-hidden="true" className="size-4" />Ver transmisión</a>
        </div>
      </header>
      <main id="top">
        <section className="relative mx-auto max-w-4xl px-5 pb-14 pt-16 text-center sm:pt-24"><div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,.14),transparent_65%)]" /><div className="relative"><div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300"><span className="size-1.5 animate-pulse rounded-full bg-cyan-300" />Rastreador de insignias de Twitch en tiempo real</div><h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">No vuelvas a perderte una <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">insignia de Twitch</span></h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Consulta insignias de suscripción, tiempo visto y más. Recibe avisos antes de que caduquen para no perder las que importan.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 font-bold text-slate-950 hover:bg-cyan-200" href="#badges"><Bell aria-hidden="true" className="size-4" />Ver insignias activas</a><a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 hover:bg-white/10" href="https://discord.gg/5hVNNTh7a" target="_blank" rel="noreferrer">Unirse al Discord <ExternalLink aria-hidden="true" className="size-4" /></a></div></div></section>
        <section id="badges" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8"><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Colección en tiempo real</p><h2 className="text-2xl font-bold sm:text-3xl">Insignias activas</h2></div><div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/50 p-1"><Filter aria-hidden="true" className="ml-2 size-4 text-muted-foreground" />{["all", "subscription", "watch"].map((value) => <button key={value} onClick={() => setFilter(value)} className={`min-h-10 rounded-full px-3.5 text-xs font-medium transition ${filter === value ? "bg-cyan-300 text-slate-950" : "text-muted-foreground hover:text-foreground"}`}>{value === "all" ? "Todas" : value === "subscription" ? "Suscripciones" : "Tiempo visto"}</button>)}</div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((badge) => <BadgeCard key={badge.id} badge={badge} onSelect={() => setSelected(badge)} />)}</div></section>
      </main>
      <footer className="border-t border-white/5 px-5 py-7 text-center text-xs text-muted-foreground">© 2026 Alertas de Drops · Hecho para la comunidad mexicana de Twitch</footer>
      {selected && <div role="dialog" aria-modal="true" aria-label={`Detalles de ${selected.name}`} className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setSelected(null)}><div className="w-full max-w-xl rounded-t-3xl border border-border bg-[#11121b] p-6 shadow-2xl sm:rounded-3xl" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-start justify-between"><div className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-xl bg-muted text-cyan-300"><selected.icon aria-hidden="true" /></span><div><div className="flex gap-2"><span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-300">Activa</span><span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{selected.type}</span></div><h2 className="mt-2 text-xl font-bold">{selected.name}</h2></div></div><button aria-label="Cerrar detalles" onClick={() => setSelected(null)} className="flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground"><X aria-hidden="true" /></button></div><div className="rounded-2xl border border-border/70 bg-black/20 p-4"><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Disponible por</p><p className="text-3xl font-extrabold text-cyan-300">{timeLeft(selected.endsAt)}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{selected.claim}</p></div><a className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 font-bold text-slate-950 hover:opacity-90" href="https://twitch.tv/alertadropsmx" target="_blank" rel="noreferrer">Reclamar esta insignia <ArrowRight aria-hidden="true" className="size-4" /></a></div></div>}
    </div>
  )
}
