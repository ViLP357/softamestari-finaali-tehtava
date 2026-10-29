import SeaScene from './SeaScene.jsx'
import StatusPanel from './StatusPanel.jsx'
import { QUESTIONS_PER_ROUND, TOTAL_QUESTIONS } from '../data/regions.js'
import { ecosystemIndex } from '../game/gameLogic.js'
import { roundName, text } from '../data/localization.js'

export default function ResultsScreen({
  region,
  score,
  strategyScore,
  finalScore,
  correctCount,
  roundResults,
  discoveries,
  challenge,
  bestScore,
  onReplay,
  onHome,
  onSources,
  language,
}) {
  const indexBefore = ecosystemIndex(challenge.before)
  const indexAfter = ecosystemIndex(challenge.after)
  const ending = language === 'en'
    ? indexAfter >= 70
      ? text(language, 'endingStrong', '')
      : indexAfter >= 50
        ? text(language, 'endingMedium', '')
        : text(language, 'endingLow', '')
    : indexAfter >= 70
      ? 'Valintasi tukivat alueen elinympäristöjä ja meren tasapainoa. Palautuminen vaatii silti pitkäjänteistä työtä.'
      : indexAfter >= 50
        ? 'Toimesi auttoivat alueen tilaa, mutta osa paineista jäi ratkaisematta. Meriluonnon toipuminen vie aikaa.'
        : 'Alueen haasteet ovat sitkeitä. Valintasi toivat hyötyä, mutta toisella alueella tai strategialla tulos voisi muuttua.'

  return (
    <main className="results-screen strategy-results">
      <section className="results-heading">
        <p className="eyebrow"><span className="eyebrow-line" /> {text(language, 'resultsEyebrow', `TUTKIMUS PÄÄTTYI · ${region.name.toUpperCase()}`, { region: region.name.toUpperCase() })}</p>
        {language === 'en'
          ? <h1>Ecosystem<br /><span>status report.</span></h1>
          : <h1>Ekosysteemin<br /><span>tilannekatsaus.</span></h1>}
        <p className="ending-copy">{ending}</p>
      </section>
      <div className="result-score-row">
        <div><span>{text(language, 'speciesScore', 'LAJINTUNNISTUS')}</span><strong>{score}</strong><small>{text(language, 'correctOfTotal', `pistettä · ${correctCount} / ${TOTAL_QUESTIONS} oikein`, { correct: correctCount, total: TOTAL_QUESTIONS })}</small></div>
        <div><span>{text(language, 'strategyScore', 'STRATEGIAPISTEET')}</span><strong>+{strategyScore}</strong><small>{text(language, 'ecosystemImprovement', 'ekosysteemin parantumisesta')}</small></div>
        <div><span>{text(language, 'ecosystemIndex', 'EKOSYSTEEMI-INDEKSI')}</span><strong>{indexBefore}<i> → </i>{indexAfter}</strong><small>{text(language, 'gameSummary', 'pelillinen yhteenveto · ei mittaustulos')}</small></div>
        <div><span>{text(language, 'bestResult', `PARAS TULOS · ${region.shortName}`, { region: region.shortName })}</span><strong>{bestScore}</strong><small>{text(language, 'totalPoints', `yhteispisteet ${finalScore} · aluekohtainen`, { score: finalScore })}</small></div>
      </div>
      <section className="before-after">
        <div className="before-after-heading">
          <div><p className="eyebrow">{text(language, 'actionImpact', 'SUOJELUTOIMIEN VAIKUTUS')}</p><h2>{text(language, 'beforeAfter', 'Ennen ja jälkeen')}</h2></div>
          <button className="tiny-link" type="button" onClick={onSources}>{text(language, 'sourcesOpen', 'Lähteet ja lajisto ↗')}</button>
        </div>
        <div className="scene-comparison">
          <div className="comparison-panel">
            <div className="comparison-label"><span>{text(language, 'beforeActions', 'ENNEN TOIMIA')}</span><b>{text(language, 'ecosystemIndex', 'EKOSYSTEEMI')} {indexBefore}</b></div>
            <SeaScene language={language} region={region} metrics={challenge.before} discoveries={discoveries} compact />
            <StatusPanel language={language} values={challenge.before} compact />
          </div>
          <div className="comparison-arrow" aria-hidden="true">→</div>
          <div className="comparison-panel comparison-panel--after">
            <div className="comparison-label"><span>{text(language, 'afterActions', 'TOIMIEN JÄLKEEN')}</span><b>{text(language, 'ecosystemIndex', 'EKOSYSTEEMI')} {indexAfter}</b></div>
            <SeaScene language={language} region={region} metrics={challenge.after} discoveries={discoveries} compact />
            <StatusPanel language={language} values={challenge.after} compact />
          </div>
        </div>
      </section>
      <div className="result-detail-grid">
        <section className="result-detail-card">
          <p className="eyebrow">{text(language, 'chosenActions', 'VALITSEMASI TOIMET')}</p>
          {challenge.actions.map((action) => (
            <div className="selected-action-result" key={action.id}>
              <span>✓</span><div><strong>{action.title}</strong><p>{action.description} {action.limitation}</p></div>
            </div>
          ))}
          <p className="remaining-challenges"><b>{text(language, 'remaining', 'Jäljelle jäi:')}</b> {challenge.after.pressure > 55 ? `${text(language, 'remainingPressure', 'ravinnepaine vaatii yhä valuma-alueen pitkäjänteistä työtä.')} ` : ''}{challenge.after.oxygen < 55 ? `${text(language, 'remainingOxygen', 'happitilanne on edelleen haavoittuva.')} ` : ''}{challenge.after.habitat < 65 ? `${text(language, 'remainingHabitats', 'elinympäristöjen palautuminen jatkuu hitaasti.')} ` : ''}{challenge.after.biodiversity < 65 ? text(language, 'remainingBiodiversity', 'monimuotoisuuden elpyminen vaatii aikaa ja seurantaa.') : text(language, 'monitorBenefits', 'seuranta auttaa varmistamaan, että hyödyt säilyvät.')}</p>
        </section>
        <section className="result-detail-card round-summary">
          <p className="eyebrow">{text(language, 'researchRounds', `TUTKIMUSKIERROKSET · ${TOTAL_QUESTIONS} TEHTÄVÄÄ`, { total: TOTAL_QUESTIONS })}</p>
          {roundResults.map((item, index) => (
            <div className="round-result" key={item.round}>
              <span>0{index + 1} <b>{roundName(item.round, language)}</b></span><span>{item.correct} / {QUESTIONS_PER_ROUND}</span>
            </div>
          ))}
          <p className="scenario-note">{text(language, 'gameIndexDisclaimer', 'Ekosysteemi-indeksi on pelillinen yhdistelmä valituista mittareista. Se ei vastaa virallista ympäristöarviota.')}</p>
        </section>
      </div>
      <div className="results-actions">
        <button className="primary-button" type="button" onClick={onReplay}>{text(language, 'exploreAnother', 'Tutki toista aluetta')} <span aria-hidden="true">↻</span></button>
        <button className="quiet-button" type="button" onClick={onHome}>{text(language, 'returnHome', 'Palaa alkuun')}</button>
      </div>
    </main>
  )
}
