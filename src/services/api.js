const BASE = '/api/captures'

async function request(url, options) {
  let res
  try { res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options }) }
  catch { throw new Error('Sem conexão com a API. Tente novamente.') }
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Erro ao falar com a API.')
  return data
}

export const listCaptures = () => request(BASE)
export const createCapture = (body) => request(BASE, { method: 'POST', body: JSON.stringify(body) })
export const updateCapture = (id, body) => request(`${BASE}?id=${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteCapture = (id) => request(`${BASE}?id=${id}`, { method: 'DELETE' })
