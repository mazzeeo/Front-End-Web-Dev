export default function FeatureCard({ title, text, tag }) {
  return (
    <article className="rounded-2xl border-l-4 border-jovi bg-white p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
      {tag && <p className="mt-3 text-xs font-medium text-jovi">{tag}</p>}
    </article>
  )
}
