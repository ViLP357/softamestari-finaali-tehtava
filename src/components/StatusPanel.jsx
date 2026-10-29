const metrics = [
  { id: 'pressure', label: 'Nutrient pressure', labelFi: 'Ravinnepaine', hint: 'lower is better', hintFi: 'pienempi parempi', reverse: true },
  { id: 'habitat', label: 'Habitats', labelFi: 'Elinympäristöt', hint: 'higher is better', hintFi: 'suurempi parempi' },
  { id: 'biodiversity', label: 'Biodiversity', labelFi: 'Monimuotoisuus', hint: 'higher is better', hintFi: 'suurempi parempi' },
  { id: 'oxygen', label: 'Oxygen level', labelFi: 'Happitilanne', hint: 'higher is better', hintFi: 'suurempi parempi' },
]

export default function StatusPanel({ values, compact = false, language = 'fi' }) {
  return (
    <div className={`status-panel${compact ? ' status-panel--compact' : ''}`}>
      {metrics.map((metric) => (
        <div className="status-metric" key={metric.id}>
          <div className="status-metric-heading">
            <span>{language === 'en' ? metric.label : metric.labelFi}</span>
            <strong>{values[metric.id]}</strong>
          </div>
          <div className="status-track" role="progressbar" aria-label={language === 'en' ? metric.label : metric.labelFi} aria-valuenow={values[metric.id]} aria-valuemin="0" aria-valuemax="100">
            <i className={metric.reverse ? 'status-fill status-fill--reverse' : 'status-fill'} style={{ width: `${values[metric.id]}%` }} />
          </div>
          {!compact && <span className="status-hint">{language === 'en' ? metric.hint : metric.hintFi}</span>}
        </div>
      ))}
    </div>
  )
}
