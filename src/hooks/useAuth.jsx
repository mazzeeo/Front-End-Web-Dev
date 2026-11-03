import { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const AuthContext = createContext(null)
const USER = { email: 'aluno@jovi.com', password: 'jovi123', name: 'Aluno JOVI' }

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('jovi-user', null)
  const login = (email, password) => {
    if (email === USER.email && password === USER.password) { setUser({ name: USER.name, email }); return true }
    return false
  }
  const logout = () => setUser(null)
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
