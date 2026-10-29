import { useState } from 'react'
import { text } from '../data/localization.js'

export default function SpeciesCardArtwork({ task, language }) {
  const [imageFailed, setImageFailed] = useState(false)
  const photo = task.photo
  const showPhoto = photo && !imageFailed
  const kicker = task.round === 'life' && !task.scientificName
    ? text(language, 'envPhenomenon', 'YMPÄRISTÖILMIÖ')
    : task.round === 'plants'
      ? text(language, 'plantsAndAlgae', 'KASVIT & LEVÄT')
      : task.round === 'fish'
        ? text(language, 'fish', 'KALA')
        : text(language, 'marineLife', 'MEREN ELIÖ')

  return (
    <div className={`research-card-art${showPhoto ? ' research-card-art--photo' : ''}`}>
      {showPhoto
        ? <img className="research-card-photo" src={photo.url} alt={photo.alt} onError={() => setImageFailed(true)} />
        : <span>{task.image}</span>}
      <div className="research-card-kicker">{kicker}</div>
      {photo && imageFailed && <span className="species-photo-unavailable">{text(language, 'photoFallback', 'Valokuva ei latautunut')}</span>}
      {showPhoto && (
        <a
          className="species-photo-credit"
          href={photo.sourceUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={text(language, 'imageCreditLabel', `Kuva: ${photo.credit}, ${photo.license}; avaa alkuperäinen kuva Wikimedia Commonsissa`, { credit: photo.credit, license: photo.license })}
        >
          {text(language, 'imageCredit', `Kuva: ${photo.credit} · ${photo.license}`, { credit: photo.credit, license: photo.license })}
        </a>
      )}
    </div>
  )
}
