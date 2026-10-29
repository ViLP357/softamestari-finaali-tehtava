import { useState } from 'react'
import { regionList } from '../data/regions.js'
import { localizedRegion, text } from '../data/localization.js'
import RegionMap from './RegionMap.jsx'

export default function RegionSelector({ onChoose, onBack, language }) {
  const [selectedId, setSelectedId] = useState(regionList[0].id)
  const selected = localizedRegion(regionList.find((region) => region.id === selectedId), language)

  return (
    <main className="region-selector">
      <div className="region-heading">
        <button className="back-link" type="button" onClick={onBack}>{text(language, 'backHome', '← Alkuun')}</button>
        <p className="eyebrow"><span className="eyebrow-line" /> {text(language, 'chooseRegion', 'VALITSE TUTKIMUSALUE')}</p>
        {language === 'en'
          ? <h1>Every sea has<br /><span>its own story.</span></h1>
          : <h1>Jokaisella merellä<br /><span>on oma tarinansa.</span></h1>}
        <p>{text(language, 'regionDescription', 'Valitse alue. Sen lajisto, lähtötilanne ja loppuhaaste muuttuvat valintasi mukaan.')}</p>
      </div>
      <div className="region-selection-layout">
        <RegionMap language={language} selectedRegionId={selectedId} onSelect={setSelectedId} />
        <div className="region-options">
          {regionList.map((region) => {
            const localized = localizedRegion(region, language)
            return (
            <button
              className={`region-option region-option--${region.theme}${selectedId === region.id ? ' region-option--selected' : ''}`}
              key={region.id}
              type="button"
              onClick={() => setSelectedId(region.id)}
              aria-pressed={selectedId === region.id}
            >
              <span className="region-option-top"><span>{localized.location}</span><b>{selectedId === region.id ? text(language, 'selected', 'VALITTU') : text(language, 'select', 'VALITSE')}</b></span>
              <strong>{localized.name}</strong>
              <span className="region-option-description">{localized.description}</span>
              <span className="region-focus">{localized.focus}</span>
            </button>
            )
          })}
          <div className={`selected-region-brief theme-${selected.theme}`}>
            <span className="brief-label">{text(language, 'researchArea', 'TUTKIMUSALUE')}</span>
            <p>{selected.intro}</p>
            <button className="primary-button" type="button" onClick={() => onChoose(regionList.find((region) => region.id === selectedId))}>{text(language, 'exploreArea', 'Tutki tätä aluetta')} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
      <p className="scenario-note">{text(language, 'scenarioDisclaimer', 'Alueiden lähtötilat ja mittarit ovat pelillisiä skenaarioita, eivät mitattuja ympäristöarvoja.')}</p>
    </main>
  )
}
