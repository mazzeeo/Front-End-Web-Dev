import FeatureCard from '../components/FeatureCard.jsx'

const features = [
  { title: 'Sugestão de modo por contexto', text: 'A câmera percebe o que está no quadro (caderno, lousa, prato, grupo de amigos) e destaca o modo certo, sem o aluno procurar no menu "Mais".', tag: 'Resolve: modos confusos' },
  { title: 'Modo Aula', text: 'Fotografa lousa e slides com correção de perspectiva e texto legível, e já guarda na pasta da matéria.', tag: 'Resolve: anotações rápidas' },
  { title: 'Central de conteúdo', text: 'Tudo o que foi capturado em um só lugar: busca, álbuns, histórico, lixeira e estatísticas de uso.', tag: 'Resolve: fotos perdidas' },
]
const audience = [
  ['Estudantes full-time', 'Dividem o dia entre aulas, trabalhos e vida social e usam a câmera como caderno e como espelho do que vivem.'],
  ['Por que importa', 'Hoje ficam no modo automático: não sabem qual modo usar e perdem tempo achando fotos de aula no meio das selfies.'],
]
const gallery = [
  ['Câmera com sugestão de modo', 'camera-sugestao'], ['Modo Aula: lousa corrigida', 'modo-aula'], ['Central de conteúdo', 'central'],
  ['Álbuns por matéria', 'albuns'], ['Lixeira e histórico', 'lixeira'], ['Estatísticas de uso', 'estatisticas'],
]
const team = [
  ['Henry Ramos', 'Product Owner e UX/UI'], ['Eduardo Arruda', 'Front-end (Tailwind e responsividade)'],
  ['Lucas Mazzeo', 'Front-end (React e hooks)'], ['Renan Lopes', 'Pesquisas e testes de usabilidade'],
]

export default function Home() {
  return (
    <>
      <section className="bg-jovi px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">A câmera que entende o seu dia de estudante.</h1>
            <p className="mt-4 max-w-md">Menos menus, mais momentos: a JOVI Study Cam escolhe o modo certo para cada cena e organiza tudo o que você captura.</p>
            <a href="#solucao" className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-medium text-white">Conhecer a solução</a>
          </div>
          <div aria-hidden="true" className="mx-auto grid h-72 w-40 grid-rows-[1fr_auto] rounded-[2rem] border-4 border-white/80 bg-ink p-3">
            <div className="rounded-xl bg-gradient-to-b from-coral/70 to-jovi/40" />
            <div className="mt-3 flex justify-center gap-2 text-[10px]"><span>Foto</span><span className="text-coral">Aula</span><span>Comida</span></div>
          </div>
        </div>
      </section>

      <section id="solucao" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-extrabold">A Solução</h2>
        <p className="mt-3 max-w-2xl">O desafio da JOVI é tornar a câmera mais intuitiva, funcional e contextual. Nossa resposta combina três recursos:</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      <section id="publico" className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <h2 className="text-3xl font-extrabold md:col-span-2">Público-Alvo</h2>
          {audience.map(([t, d]) => <article key={t}><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2">{d}</p></article>)}
        </div>
      </section>

      <section id="galeria" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-extrabold">Galeria</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map(([g, file]) => (
            <figure key={g} className="rounded-2xl bg-white p-3 text-center">
              <img src={`/gallery/${file}.svg`} alt={`Mockup: ${g}`} loading="lazy" className="aspect-[9/16] w-full rounded-xl object-cover" />
              <figcaption className="mt-2 text-xs">{g}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="equipe" className="bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold">Nossa Equipe</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([n, r]) => <li key={n} className="rounded-2xl bg-mist p-5"><p className="font-semibold">{n}</p><p className="text-sm">{r}</p></li>)}
          </ul>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-extrabold">Contato</h2>
        <form className="mt-6 grid max-w-xl gap-3" onSubmit={(e) => { e.preventDefault(); alert('Mensagem registrada. Obrigado!'); e.target.reset() }}>
          <label>Nome<input required className="mt-1 w-full rounded-lg border p-2" /></label>
          <label>E-mail<input required type="email" className="mt-1 w-full rounded-lg border p-2" /></label>
          <label>Mensagem<textarea required rows="3" className="mt-1 w-full rounded-lg border p-2" /></label>
          <button className="rounded-full bg-jovi px-6 py-2 font-medium text-white sm:justify-self-start">Enviar mensagem</button>
        </form>
      </section>
    </>
  )
}
