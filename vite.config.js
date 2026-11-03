import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import handler from './api/captures.js'

// Em desenvolvimento (npm run dev) serve a mesma função de /api/captures que a Vercel executa em produção.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/captures', async (req, res) => {
        req.query = Object.fromEntries(new URL(req.url, 'http://localhost').searchParams)
        let raw = ''
        for await (const chunk of req) raw += chunk
        try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)) }
        handler(req, res)
      })
    },
  }
}
export default defineConfig({ plugins: [react(), devApi()] })
