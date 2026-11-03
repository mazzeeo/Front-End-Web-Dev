import { useState } from 'react'
import { useGallery, ALBUMS } from '../hooks/useGallery.js'
import { useAuth } from '../hooks/useAuth.jsx'

const TIPS = ['Use o Modo Aula para lousas.', 'Crie um álbum por matéria.', 'Itens na lixeira podem ser restaurados.']

export default function Dashboard() {
  const { user } = useAuth()
  const g = useGallery()
  const [title, setTitle] = useState('')
  const [newAlbum, setNewAlbum] = useState(ALBUMS[0])
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)]

  if (g.loading) return <p className="p-10">Carregando capturas…</p>
  const submit = (e) => { e.preventDefault(); if (title.trim()) { g.add(title, newAlbum); setTitle('') } }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Central de conteúdo de {user.name}</h1>
      <p className="mt-1 text-sm">Dica: {tip}</p>

      {g.error && (
        <p role="alert" className="mt-4 rounded-lg bg-coral/10 p-3 text-sm text-coral">
          {g.error} <button onClick={g.reload} className="underline">Tentar de novo</button>
        </p>
      )}

      <form onSubmit={submit} className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input aria-label="Título da nova captura" placeholder="Nova captura (ex.: Lousa de Física)" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border p-2" />
        <select aria-label="Álbum da nova captura" value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} className="rounded-lg border p-2">
          {ALBUMS.map((a) => <option key={a}>{a}</option>)}
        </select>
        <button className="rounded-lg bg-coral px-4 py-2 font-medium text-white">Adicionar captura</button>
      </form>

      <section aria-label="Estatísticas" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
        <p className="rounded-xl bg-white p-3"><strong className="block text-2xl">{g.stats.total}</strong>capturas</p>
        <p className="rounded-xl bg-white p-3"><strong className="block text-2xl">{g.stats.trash}</strong>na lixeira</p>
        {g.stats.perAlbum.map((a) => <p key={a.name} className="rounded-xl bg-white p-3"><strong className="block text-2xl">{a.pct}%</strong>{a.name}</p>)}
      </section>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input aria-label="Buscar" placeholder="Buscar capturas" value={g.search} onChange={(e) => g.setSearch(e.target.value)} className="rounded-lg border p-2" />
        <select aria-label="Álbum" value={g.album} onChange={(e) => g.setAlbum(e.target.value)} className="rounded-lg border p-2">
          {['Todos', ...ALBUMS].map((a) => <option key={a}>{a}</option>)}
        </select>
        <button onClick={() => g.setShowTrash(!g.showTrash)} className="rounded-lg bg-jovi px-4 py-2 text-white">{g.showTrash ? 'Ver capturas' : 'Ver lixeira'}</button>
      </div>

      {g.visible.length === 0 && <p className="mt-8">Nada por aqui. Ajuste a busca ou o álbum.</p>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {g.visible.map((i) => (
          <li key={i.id} className="overflow-hidden rounded-2xl bg-white">
            <img src={i.img} alt={i.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-3">
              <p className="font-semibold capitalize">{i.title}</p>
              <p className="text-xs">{new Date(i.date).toLocaleDateString('pt-BR')}</p>
              {g.showTrash ? (
                <div className="mt-2 flex justify-between text-sm">
                  <button onClick={() => g.setTrashed(i.id, false)} className="text-jovi underline">Restaurar</button>
                  <button onClick={() => g.remove(i.id)} className="text-coral underline">Apagar de vez</button>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between gap-2">
                  <select aria-label="Mover para álbum" value={i.album} onChange={(e) => g.moveTo(i.id, e.target.value)} className="rounded border p-1 text-sm">
                    {ALBUMS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                  <button onClick={() => g.setTrashed(i.id, true)} className="text-sm text-coral underline">Excluir</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
