import { QUESTIONS_PER_ROUND, ROUND_COUNT, TOTAL_QUESTIONS } from '../data/regions.js'
import { roundName, text } from '../data/localization.js'
import SeaScene from './SeaScene.jsx'
import SpeciesCardArtwork from './SpeciesCardArtwork.jsx'
import StatusPanel from './StatusPanel.jsx'

export default function SpeciesRound({
  region,
  round,
  taskIndex,
  task,
  score,
  metrics,
  discoveries,
  answered,
  correctInRound,
  onAnswer,
  onNext,
  onSources,
  language,
}) {
  const correctChoiceIndex = task.choices.indexOf(task.correctAnswer)
  const correct = answered === correctChoiceIndex
  const total = round * QUESTIONS_PER_ROUND + taskIndex

  return (
    <main className="region-game">
      <div className="region-game-header">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> {region.name.toUpperCase()} · {text(language, 'researchTrip', 'TUTKIMUSRETKI')}</p>
          <h1>{roundName(round, language)}</h1>
          <p className="game-region-focus">{region.focus}</p>
        </div>
        <div className="research-score"><span>{text(language, 'score', 'PISTEET')}</span><strong>{score}</strong><span>+{correctInRound} / 6 {text(language, 'thisRound', 'tällä kierroksella')}</span></div>
      </div>
      <div className="research-progress" aria-label={text(language, 'taskAria', `Tehtävä ${total + 1} / ${TOTAL_QUESTIONS}`, { current: total + 1, total: TOTAL_QUESTIONS })}>
        <span style={{ width: `${(total / TOTAL_QUESTIONS) * 100}%` }} />
      </div>
      <div className="research-meta">
        <span>{text(language, 'roundTask', `KIERROS 0${round + 1} / ${String(ROUND_COUNT).padStart(2, '0')} · TEHTÄVÄ ${String(taskIndex + 1).padStart(2, '0')} / ${String(QUESTIONS_PER_ROUND).padStart(2, '0')}`, { round: `0${round + 1}`, roundCount: String(ROUND_COUNT).padStart(2, '0'), task: String(taskIndex + 1).padStart(2, '0'), taskCount: String(QUESTIONS_PER_ROUND).padStart(2, '0') })}</span>
        <button className="tiny-link" type="button" onClick={onSources}>{text(language, 'sourcesOpen', 'Lähteet ja lajisto ↗')}</button>
      </div>
      <section className="research-layout">
        <div className="research-world">
          <SeaScene language={language} region={region} metrics={metrics} discoveries={discoveries} />
          <StatusPanel language={language} values={metrics} compact />
          <p className="metrics-disclaimer">{text(language, 'metricsDisclaimer', 'Pelilliset mittarit kuvaavat tämän retken skenaariota, eivät todellisia mittaustuloksia.')}</p>
        </div>
        <article className="research-card">
          <SpeciesCardArtwork key={task.id} task={task} language={language} />
          <div className="research-card-content">
            <div className="region-badge">{region.name} · {task.habitat}</div>
            <h2>{task.nameFi}</h2>
            {task.scientificName && <p className="research-scientific">{task.scientificName}</p>}
            <p className="research-ecology">{task.ecologicalRole}</p>
            <div className="research-question">
              <span>{text(language, 'observation', `KENTTÄHAVAINTO ${String(total + 1).padStart(2, '0')}`, { number: String(total + 1).padStart(2, '0') })}</span>
              <h3>{task.question}</h3>
            </div>
            <div className="research-choices" role="group" aria-label={text(language, 'options', 'Vastausvaihtoehdot')}>
              {task.choices.map((choice, index) => {
                const isCorrect = index === correctChoiceIndex
                const isChosen = index === answered
                let className = 'research-choice'
                if (answered !== null && isCorrect) className += ' research-choice--correct'
                else if (isChosen) className += ' research-choice--wrong'
                return (
                  <button
                    className={className}
                    type="button"
                    key={choice}
                    onClick={() => onAnswer(index)}
                    disabled={answered !== null}
                    aria-pressed={isChosen}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>{choice}
                    {answered !== null && isCorrect && <b aria-label={text(language, 'optionCorrect', 'Oikein')}>✓</b>}
                    {answered !== null && isChosen && !isCorrect && <b aria-label={text(language, 'optionWrong', 'Väärä valinta')}>×</b>}
                  </button>
                )
              })}
            </div>
            {answered !== null && (
              <div className={`research-feedback${correct ? ' research-feedback--correct' : ' research-feedback--wrong'}`} aria-live="polite">
                <strong>{correct ? text(language, 'correctFeedback', 'Havainto vahvistettu · +10') : text(language, 'wrongFeedback', 'Havainto ei vahvistunut')}</strong>
                <p>{task.explanation}</p>
                <button className="primary-button" type="button" onClick={onNext}>
                  {taskIndex === QUESTIONS_PER_ROUND - 1 && round === ROUND_COUNT - 1 ? text(language, 'finalChallenge', 'Siirry loppuhaasteeseen') : taskIndex === QUESTIONS_PER_ROUND - 1 ? text(language, 'nextRound', 'Jatka seuraavaan kierrokseen') : text(language, 'nextObservation', 'Seuraava havainto')}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  )
}
