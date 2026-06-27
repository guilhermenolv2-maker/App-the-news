export default function BrandLogo({ compact = false }) {
  return (
    <div className={`brand-logo ${compact ? 'brand-logo--compact' : ''}`}>
      {!compact && <i aria-hidden="true" />}
      {compact && <span aria-hidden="true">-t</span>}
      {!compact && <strong>the news</strong>}
    </div>
  )
}
