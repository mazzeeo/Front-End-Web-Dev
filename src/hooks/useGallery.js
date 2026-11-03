import { useState, useEffect, useMemo, useCallback } from 'react'
import { listCaptures, createCapture, updateCapture, deleteCapture } from '../services/api.js'

export const ALBUMS = ['Estudos', 'Social', 'Documentos', 'Comida']

export function useGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [album, setAlbum] = useState('Todos')
  const [showTrash, setShowTrash] = useState(false)

  const load = useCallback(() => listCaptures()
    .then((data) => { setItems(data); setError('') })
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false)), [])
  useEffect(() => { load() }, [load])

  // executa uma chamada à API e recarrega a lista
  const run = (promise) => promise.then(load).catch((e) => setError(e.message))
  const add = (title, alb) => run(createCapture({ title, album: alb }))
  const setTrashed = (id, trashed) => run(updateCapture(id, { trashed }))
  const moveTo = (id, alb) => run(updateCapture(id, { album: alb }))
  const remove = (id) => run(deleteCapture(id))

  const visible = useMemo(() => items
    .filter((i) => i.trashed === showTrash)
    .filter((i) => album === 'Todos' || i.album === album)
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase())), [items, search, album, showTrash])

  const active = items.filter((i) => !i.trashed)
  const stats = {
    total: active.length,
    trash: items.length - active.length,
    perAlbum: ALBUMS.map((a) => ({
      name: a,
      pct: active.length ? Math.round((active.filter((i) => i.album === a).length / active.length) * 100) : 0,
    })),
  }
  return { visible, stats, loading, error, search, setSearch, album, setAlbum, showTrash, setShowTrash, add, setTrashed, moveTo, remove, reload: load }
}
