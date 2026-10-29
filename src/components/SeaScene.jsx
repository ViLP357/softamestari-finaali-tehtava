import { localizedTask, text } from '../data/localization.js'

export default function SeaScene({ region, metrics, discoveries = [], compact = false, language = 'fi' }) {
  const species = discoveries.filter((item) => item.round !== 'life' || item.scientificName)
  const poorOxygen = metrics?.oxygen < 42
  const highPressure = metrics?.pressure > 70

  return (
    <div className={`region-sea-scene theme-${region.theme}${compact ? ' region-sea-scene--compact' : ''}`}>
      <div className="scene-surface" />
      <div className="scene-light" />
      <div className="scene-shoal scene-shoal--back" />
      <div className="scene-shoal scene-shoal--front" />
      <div className={`scene-haze${highPressure ? ' scene-haze--visible' : ''}`} />
      <div className="scene-specimens" aria-label={text(language, 'discoveriesLabel', 'Oikein tunnistetut eliöt')}>
        {species.length === 0 && <span className="scene-empty-note">{text(language, 'emptyDiscoveries', 'Oikein tunnistetut eliöt ilmestyvät tähän')}</span>}
        {species.slice(-12).map((item, index) => {
          const localized = localizedTask(item, language)
          return (
          <span
            className={`scene-specimen scene-specimen--${item.round}`}
            key={item.id}
            style={{
              '--specimen-index': index,
              top: `${item.round === 'fish' ? 23 + (index % 3) * 12 : item.round === 'life' ? 57 + (index % 2) * 9 : 12 + (index % 4) * 15}%`,
              left: `${10 + (index * 17) % 75}%`,
              animationDelay: `0s, ${index * -0.5}s`,
            }}
            title={localized.nameFi}
            aria-label={localized.nameFi}
          >
            {item.image}
          </span>
          )
        })}
      </div>
      {poorOxygen && <div className="scene-oxygen-note">{text(language, 'oxygenWarning', 'HAPPITILANNE KOETUKSELLA')}</div>}
      <div className="scene-region-tag">{region.name.toUpperCase()} <span>·</span> {text(language, 'gameState', 'PELILLINEN TILA')}</div>
      <div className="scene-health-indicator" aria-hidden="true">
        <i style={{ width: `${metrics ? Math.round((100 - metrics.pressure + metrics.habitat + metrics.biodiversity + metrics.oxygen) / 4) : 50}%` }} />
      </div>
    </div>
  )
}
