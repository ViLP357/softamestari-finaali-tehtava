import { useEffect, useRef } from 'react'
import { QUESTIONS_PER_ROUND, ROUND_COUNT } from '../data/regions.js'
import { roundDescription, roundName, text } from '../data/localization.js'

export default function RoundIntroModal({ round, onContinue, language }) {
  const continueButton = useRef(null)

  useEffect(() => {
    continueButton.current?.focus()
  }, [])

  return (
    <div className="modal-backdrop round-intro-backdrop">
      <section className="round-intro-dialog" role="dialog" aria-modal="true" aria-labelledby="round-intro-title" aria-describedby="round-intro-description">
        <p className="eyebrow">{text(language, 'roundIntro', `KIERROS 0${round + 1} / 0${ROUND_COUNT} · UUSI KATEGORIA`, { round: `0${round + 1}`, roundCount: `0${ROUND_COUNT}` })}</p>
        <h2 id="round-intro-title">{roundName(round, language)}</h2>
        <p id="round-intro-description">{roundDescription(round, language)}</p>
        <div className="round-intro-count"><span>{QUESTIONS_PER_ROUND}</span> {text(language, 'observationsThisRound', 'havaintoa tällä kierroksella')}</div>
        <button className="primary-button" type="button" ref={continueButton} onClick={onContinue}>
          {text(language, 'startRound', 'Aloita kierros')} <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  )
}
