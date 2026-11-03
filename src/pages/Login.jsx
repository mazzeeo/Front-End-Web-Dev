import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (login(email, password)) nav('/central')
    else setError('E-mail ou senha incorretos. Use aluno@jovi.com e jovi123.')
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-12 grid max-w-sm gap-3 rounded-2xl bg-white p-6">
      <h1 className="text-2xl font-extrabold">Entrar na Central</h1>
      <label>E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-lg border p-2" /></label>
      <label>Senha<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full rounded-lg border p-2" /></label>
      {error && <p role="alert" className="text-sm text-coral">{error}</p>}
      <button className="rounded-full bg-jovi py-2 font-medium text-white">Entrar</button>
    </form>
  )
}
