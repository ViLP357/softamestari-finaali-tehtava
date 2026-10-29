import { useState } from 'react'
import { protectionActions } from '../data/actions.js'
import { localizedAction, text } from '../data/localization.js'
import SeaScene from './SeaScene.jsx'
import StatusPanel from './StatusPanel.jsx'

export default function FinalChallenge({ region, metrics, discoveries, score, onResolve, onSources, language }) {
  const [selectedIds, setSelectedIds] = useState([])
  const selectedCost = protectionActions
    .filter((action) => selectedIds.includes(action.id))
    .reduce((total, action) => total + action.cost, 0)
  const metricLabels = {
    pressure: text(language, 'nutrientPressure', 'Ravinnepaine'),
    habitat: text(language, 'habitats', 'Elinympäristöt'),
    biodiversity: text(language, 'biodiversity', 'Monimuotoisuus'),
    oxygen: text(language, 'oxygen', 'Happitilanne'),
  }

  function toggleAction(actionId) {
    setSelectedIds((current) => current.includes(actionId)
      ? current.filter((id) => id !== actionId)
      : current.length < 2 ? [...current, actionId] : current)
  }

  return (
    <main className="challenge-screen">
      <header className="challenge-heading">
        <p className="eyebrow"><span className="eyebrow-line" /> {text(language, 'finalChallengeLabel', 'LOPPUHAASTE')} · {region.name.toUpperCase()}</p>
        {language === 'en'
          ? <h1>Restore the balance,<br /><span>choose where to act.</span></h1>
          : <h1>Palauta tasapainoa,<br /><span>valitse mihin tartut.</span></h1>}
        <p>{text(language, 'finalIntro', 'Alueen lähtötilanne on muuttunut havaintojesi myötä. Valitse kaksi tointa rajallisella budjetilla — eri alueet hyötyvät eri ratkaisuista.')}</p>
      </header>
      <div className="challenge-overview">
        <div className="challenge-world">
          <SeaScene language={language} region={region} metrics={metrics} discoveries={discoveries} />
          <div className="challenge-budget">
            <span>{text(language, 'protectionBudget', 'SUOJELUBUDJETTI')}</span>
            <strong>{40 - selectedCost}<small> / 40</small></strong>
            <span>{text(language, 'actionSelectedCount', `${selectedIds.length} / 2 toimea valittu`, { selected: selectedIds.length })}</span>
          </div>
        </div>
        <div className="challenge-status">
          <div className="challenge-status-heading"><span>{text(language, 'currentGameState', 'NYKYINEN PELITILA')}</span><b>{score} {text(language, 'identificationPoints', 'lajintunnistuspistettä')}</b></div>
          <StatusPanel language={language} values={metrics} />
          <p>{text(language, 'actionGuidance', 'Valitse toimet alueen tunnistettujen lajien ja jäljellä olevien haasteiden perusteella.')}</p>
        </div>
      </div>
      <div className="actions-heading">
        <div><p className="eyebrow">{text(language, 'actionChoices', 'NELJÄ VAIHTOEHTOA · KAKSI VALINTAA')}</p><h2>{text(language, 'conservationActions', 'Suojelutoimet')}</h2></div>
        <button className="tiny-link" type="button" onClick={onSources}>{text(language, 'sourcesOpen', 'Lähteet ja lajisto ↗')}</button>
      </div>
      <div className="action-grid">
        {protectionActions.map((action, index) => {
          const selected = selectedIds.includes(action.id)
          const localized = localizedAction(action, language)
          const effectSummary = Object.entries(region.actionEffects[action.id])
            .filter(([, value]) => value !== 0)
            .map(([metric, value]) => `${metricLabels[metric]} ${value > 0 ? '+' : '−'}${Math.abs(value)}`)
            .join(' · ')
          return (
            <button
              className={`action-card${selected ? ' action-card--selected' : ''}`}
              key={action.id}
              type="button"
              onClick={() => toggleAction(action.id)}
              aria-pressed={selected}
            >
              <span className="action-card-number">0{index + 1} <b>{selected ? text(language, 'selected', 'VALITTU') : text(language, 'pointsCost', `${action.cost} PISTETTÄ`, { cost: action.cost })}</b></span>
              <strong>{localized.title}</strong>
              <span className="action-description">{localized.description}</span>
              <span className="action-primary">{localized.primary}</span>
              <span className="action-region-impact">{text(language, 'inThisRegion', 'TÄLLÄ ALUEELLA')} · {effectSummary}</span>
              <span className="action-limit">{localized.limitation}</span>
              <span className="action-learning">{localized.learning}</span>
            </button>
          )
        })}
      </div>
      <div className="challenge-footer">
        <p>{text(language, 'impactDisclaimer', 'Vaikutukset ovat aluekohtaisia peliskenaarioita, eivät ennusteita todellisesta luonnosta.')}</p>
        <button
          className="primary-button"
          type="button"
          disabled={selectedIds.length !== 2}
          onClick={() => onResolve(selectedIds)}
        >
          {text(language, 'assessEffects', 'Arvioi vaikutukset')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </main>
  )
}
