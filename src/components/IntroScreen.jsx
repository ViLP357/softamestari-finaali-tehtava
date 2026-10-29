import { text } from '../data/localization.js'

export default function IntroScreen({ bestScore, onStart, onSources, language }) {
  return (
    <main className="intro-layout" id="alku">
      <div className="intro-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> {text(language, 'introEyebrow', 'ITÄMERI TASAPAINOON')}</p>
        {language === 'en'
          ? <h1>The Baltic Sea<br /><span>can recover.</span></h1>
          : <h1>Itämeri<br /><span>palautuu.</span></h1>}
        <p className="intro-lead">{text(language, 'introLead', 'Ekosysteemin palauttajat\nKolme aluetta · 18 havaintoa').split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
        <p className="intro-description">{text(language, 'introDescription', 'Itämeri on monimuotoinen mutta haavoittuva ekosysteemi. Jokainen merialue on erilainen. Tutki lajistoa, tunnista ympäristön haasteet ja auta valitsemaasi aluetta palautumaan.')}</p>
        <div className="intro-actions">
          <button className="primary-button" type="button" onClick={onStart}>{text(language, 'startTrip', 'Aloita tutkimusretki')} <span aria-hidden="true">→</span></button>
          <button className="quiet-button" type="button" onClick={onSources}>{text(language, 'sources', 'Lajisto ja lähteet')}</button>
        </div>
        {bestScore !== null && <div className="intro-record"><span>✦</span> {text(language, 'bestTrip', 'Paras retki')} <b>{bestScore} {text(language, 'points', 'pistettä')}</b></div>}
        <div className="intro-facts"><span>18</span> {text(language, 'observations', 'havaintoa')} <i /> <span>3</span> {text(language, 'seaRegions', 'merialuetta')}</div>
      </div>
      <div className="intro-art">
        <div className="intro-seascape" role="img" aria-label={text(language, 'introArtAlt', 'Vedenalainen merimaisema, jossa valo siivilöityy veteen ja merenpohjassa kasvaa merikasveja')}>
          <div className="intro-seascape-light" />
          <div className="intro-seascape-floor" />
          <div className="intro-seascape-kelp" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <div className="art-stamp">{language === 'en' ? <>BALTIC<br /><span>ECOSYSTEM</span></> : <>ITÄMERI<br /><span>EKOSYSTEEMI</span></>}</div>
        <div className="art-caption"><span>01 — 03</span> {text(language, 'chooseRegion', 'VALITSE TUTKIMUSALUE')}</div>
      </div>
    </main>
  )
}
