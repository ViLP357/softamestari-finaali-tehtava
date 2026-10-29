import { text } from '../data/localization.js'

export default function Header({ onSources, bestScore, language, onLanguageChange }) {
  return (
    <header className="topbar">
      <a className="brand" href="#alku" aria-label={text(language, 'homeAria', 'Itämeri tasapainoon, alkuun')}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" focusable="false">
            <circle className="brand-mark-orbit" cx="20" cy="20" r="18" />
            <path className="brand-mark-sun" d="M25.5 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            <path className="brand-mark-wave" d="M8 19c4.2 0 4.2-3 8.4-3s4.2 3 8.4 3 4.2-3 8.4-3M8 25c4.2 0 4.2-3 8.4-3s4.2 3 8.4 3 4.2-3 8.4-3M12 30h16" />
          </svg>
        </span>
        <span>{text(language, 'brandTitle', 'ITÄMERI TASAPAINOON')}<small>{text(language, 'tagline', 'TUTKI · TUNNISTA · PALAUTA')}</small></span>
      </a>
      <div className="topbar-right">
        {bestScore !== null && <span className="best-score">{text(language, 'recordsLabel', 'ENNÄTYS')} <b>{bestScore}</b></span>}
        <div className="language-switch" role="group" aria-label={text(language, 'languageLabel', 'Valitse kieli')}>
          <button type="button" aria-label={text(language, 'languageFi', 'Suomi')} aria-pressed={language === 'fi'} onClick={() => onLanguageChange('fi')}>FI</button>
          <button type="button" aria-label={text(language, 'languageEn', 'Englanti')} aria-pressed={language === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
        </div>
        <button className="text-button" type="button" onClick={onSources}>{text(language, 'sources', 'Lähteet ja lajisto')}</button>
      </div>
    </header>
  )
}
