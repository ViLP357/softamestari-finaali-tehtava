import { useEffect } from 'react'
import { speciesById } from '../data/species.js'
import { localizedTask, text } from '../data/localization.js'

const photoCredits = [...new Map(
  Object.values(speciesById)
    .filter((card) => card.photo)
    .map((card) => [card.photo.sourceUrl, card.photo]),
).values()]

export default function SourcesModal({ onClose, language }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const sourceGroups = Object.values(speciesById).reduce((groups, card) => {
    const localized = localizedTask(card, language)
    const group = groups.find((item) => item.sourceUrl === card.sourceUrl)
    if (group) group.species.push(localized.nameFi)
    else groups.push({
      sourceName: localized.sourceName,
      sourceUrl: card.sourceUrl,
      species: [localized.nameFi],
    })
    return groups
  }, [])

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="sources-modal" role="dialog" aria-modal="true" aria-labelledby="sources-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label={text(language, 'closeSources', 'Sulje lähteet')}>×</button>
        <p className="eyebrow">{text(language, 'sourcesEyebrow', 'PELISSÄ KÄYTETTY AINEISTO')}</p>
        <h2 id="sources-title">{text(language, 'sourcesTitle', 'Lähteet ja lajisto')}</h2>
        <p className="sources-intro">{text(language, 'sourcesIntro', 'Paikalliset tehtäväkortit on rajattu alueittain. Alueiden tilamittarit ja suojelutoimien vaikutukset ovat pelillisiä skenaarioita, eivät mitattua tai reaaliaikaista ympäristödataa.')}</p>
        <ul className="source-list">
          {sourceGroups.map((source) => (
            <li key={source.sourceUrl}>
              <a href={source.sourceUrl} target="_blank" rel="noreferrer">{source.sourceName} <span>↗</span></a>
              <p>{text(language, 'sourceCards', `${source.species.length} tehtäväkortin aineistolähde: ${[...new Set(source.species)].join(', ')}.`, { count: source.species.length, names: [...new Set(source.species)].join(', ') })}</p>
            </li>
          ))}
        </ul>
        <h3 className="photo-credits-heading">{text(language, 'photoCredits', 'Lajikuvien kuvaajat ja lisenssit')}</h3>
        <ul className="photo-credits-list">
          {photoCredits.map((photo) => (
            <li key={photo.sourceUrl}>
              <a href={photo.sourceUrl} target="_blank" rel="noreferrer">{text(language, 'photoSource', 'Kuvan alkuperä')} <span>↗</span></a>
              <span>{photo.alt} · {photo.credit} · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></span>
            </li>
          ))}
        </ul>
        <p className="art-note">{text(language, 'photoOffline', 'Lajikuvat ladataan Wikimedia Commonsista. Jos yhteys ei ole käytettävissä, korteissa näytetään emoji-kuvitus.')}</p>
        <p className="art-note">{text(language, 'mapDisclaimer', 'Karttapisteet osoittavat alueiden yleisen sijainnin, eivät virallisia mittausasemia.')}</p>
      </section>
    </div>
  )
}
