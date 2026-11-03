# JOVI Study Cam — Challenge 2026 (FIAP x JOVI)

Evolução da Landing Page da Sprint 3 para React + Tailwind, com Central de conteúdo (área privada) e consumo de API. Projeto único para Front-End Design e Web Development (Sprint 4).

## Tecnologias
React 18, Vite 5, React Router 6, Tailwind CSS 3, API própria (funções serverless da Vercel em `api/`), Picsum (imagens), Git + Vercel.

## Instalação e execução
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção
```
O `npm run dev` já serve a API própria em `/api/captures` (mesmo código que roda na Vercel); não é preciso iniciar outro servidor.

## API própria — `/api/captures`
| Método | Rota | Função |
|---|---|---|
| GET | `/api/captures?album=&q=&trashed=` | lista capturas (filtros opcionais) |
| POST | `/api/captures` `{title, album}` | cria captura |
| PATCH | `/api/captures?id=` `{album?, trashed?}` | move de álbum / envia à lixeira / restaura |
| DELETE | `/api/captures?id=` | apaga definitivamente |

Respostas de erro vêm como `{ "error": "mensagem" }` (400, 404, 405). Limitação: os dados ficam na memória da função e voltam ao conjunto inicial quando o servidor reinicia ou a função da Vercel "dorme". Para persistência real, trocar o `store` por Vercel KV, Upstash ou Supabase. O `localStorage` é usado apenas para a sessão de login.

## Login de teste (rota privada /central)
- E-mail: `aluno@jovi.com`
- Senha: `jovi123`

## Estrutura
- `components/`: Header, Footer, FeatureCard, PrivateRoute (props e composição pai → filho)
- `hooks/`: `useLocalStorage`, `useAuth`, `useGallery` (hooks customizados que separam lógica da interface)
- `public/gallery/`: mockups SVG da Galeria
- `services/api.js`: cliente da API
- `api/captures.js`: API própria (serverless)
- `pages/`: Home (pública, CSS Grid + HTML semântico), Login, Dashboard (privada)

## Uso de IA
A IA (Claude, da Anthropic) foi usada para criar a API e este README. A equipe revisou, testou e adaptou o código, testamos evalidamos a API com testes em 3 computadores diferentes.

## Links
- Repositório Git: (https://github.com/mazzeeo/Front-End-Web-Dev)
- Deploy na Vercel: https://front-end-web-dev-pearl.vercel.app/
