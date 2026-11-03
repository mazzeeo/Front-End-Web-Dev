// API própria da JOVI Study Cam (função serverless da Vercel).
// GET /api/captures?album=&q=&trashed=   PATCH/DELETE /api/captures?id=   POST /api/captures
const ALBUMS = ['Estudos', 'Social', 'Documentos', 'Comida']
const TITLES = ['Lousa de Cálculo', 'Resumo de Redes', 'Grupo do Challenge', 'Slide de UX', 'Almoço na FIAP', 'Prova de Python',
  'Mapa mental', 'Selfie na biblioteca', 'RG digitalizado', 'Marmita da semana', 'Quadro de Sprint', 'Comprovante de matrícula']

const seed = () => TITLES.map((title, i) => ({
  id: i + 1, title, album: ALBUMS[i % 4], trashed: false,
  img: `https://picsum.photos/seed/jovi${i + 1}/400/300`, date: Date.now() - i * 86400000,
}))
// Memória do servidor: reinicia quando a função "dorme" (ver README).
const store = (globalThis.__joviStore ??= seed())

export default function handler(req, res) {
  const { id, album, q, trashed } = req.query || {}
  const body = req.body || {}

  if (req.method === 'GET') {
    let list = [...store]
    if (trashed !== undefined) list = list.filter((i) => String(i.trashed) === trashed)
    if (album) list = list.filter((i) => i.album === album)
    if (q) list = list.filter((i) => i.title.toLowerCase().includes(String(q).toLowerCase()))
    return res.status(200).json(list.sort((a, b) => b.date - a.date))
  }

  if (req.method === 'POST') {
    const title = String(body.title || '').trim()
    if (!title || title.length > 60) return res.status(400).json({ error: 'Informe um título de até 60 caracteres.' })
    if (!ALBUMS.includes(body.album)) return res.status(400).json({ error: 'Álbum inválido.' })
    const nid = Date.now()
    const item = { id: nid, title, album: body.album, trashed: false, img: `https://picsum.photos/seed/jovi${nid}/400/300`, date: nid }
    store.unshift(item)
    return res.status(201).json(item)
  }

  if (req.method === 'PATCH' || req.method === 'DELETE') {
    const idx = store.findIndex((i) => String(i.id) === String(id))
    if (idx < 0) return res.status(404).json({ error: 'Captura não encontrada.' })
    if (req.method === 'DELETE') { store.splice(idx, 1); return res.status(204).end() }
    if (body.album !== undefined) {
      if (!ALBUMS.includes(body.album)) return res.status(400).json({ error: 'Álbum inválido.' })
      store[idx].album = body.album
    }
    if (typeof body.trashed === 'boolean') store[idx].trashed = body.trashed
    return res.status(200).json(store[idx])
  }

  res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
  return res.status(405).json({ error: 'Método não permitido.' })
}
