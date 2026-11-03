import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const links = [['solucao', 'A Solução'], ['publico', 'Público-Alvo'], ['galeria', 'Galeria'], ['equipe', 'Nossa Equipe'], ['contato', 'Contato']]

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="sticky top-0 z-10 bg-jovi text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-2 px-4 py-3 md:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="font-display text-xl font-extrabold">JOVI Study Cam</Link>
        <nav aria-label="Principal">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm md:justify-center">
            {links.map(([id, label]) => <li key={id}><Link className="hover:underline" to={`/#${id}`}>{label}</Link></li>)}
          </ul>
        </nav>
        <div className="flex gap-3 text-sm">
          <NavLink to="/central" className="rounded-full bg-white px-4 py-1 font-medium text-jovi">Central</NavLink>
          {user && <button onClick={logout} className="underline">Sair</button>}
        </div>
      </div>
    </header>
  )
}
