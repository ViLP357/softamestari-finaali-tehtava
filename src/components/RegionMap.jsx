import { regionList } from '../data/regions.js'
import { localizedRegion, text } from '../data/localization.js'

export default function RegionMap({ selectedRegionId, onSelect, language }) {
  function onKeyDown(event, regionId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(regionId)
    }
  }

  return (
    <div className="region-map-column">
      <div className="baltic-map" role="group" aria-label={text(language, 'mapGroup', 'Itämeren aluekartta, valitse tutkimusalue')}>
        <svg className="map-drawing" viewBox="0 0 400 320" role="img" aria-label={text(language, 'mapAlt', 'Pohjoinen on ylhäällä. Ruotsi sijaitsee Itämeren länsipuolella, Suomi itäpuolella ja Viro Suomenlahden eteläpuolella.')}>
          <defs>
            <linearGradient id="sea-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#15566a" />
              <stop offset="1" stopColor="#082f43" />
            </linearGradient>
            <linearGradient id="land-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d8dfc7" />
              <stop offset="1" stopColor="#a9c3aa" />
            </linearGradient>
            <pattern id="land-grain" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="3" r=".7" fill="#617e70" opacity=".18" />
              <circle cx="9" cy="8" r=".6" fill="#617e70" opacity=".14" />
            </pattern>
          </defs>
          <rect width="400" height="320" rx="16" fill="url(#sea-gradient)" />

          <path
            d="M0 0h104c-1 18 2 35 8 52 7 18 4 33 12 49 8 17 5 32 12 49 7 16 4 31-4 47-8 17-8 32-16 49-9 18-12 37-21 55-4 7-7 13-10 19H0Z"
            fill="url(#land-gradient)"
          />
          <path
            d="M0 0h104c-1 18 2 35 8 52 7 18 4 33 12 49 8 17 5 32 12 49 7 16 4 31-4 47-8 17-8 32-16 49-9 18-12 37-21 55-4 7-7 13-10 19H0Z"
            fill="url(#land-grain)"
          />

          <path
            d="M327 0h73v265c-14-1-26-4-38-9-14-5-26-2-39-8-14-6-25-12-35-23-8-9-11-18-8-29 4-13 16-20 18-33 2-13-5-25-2-38 3-14 13-25 16-39 3-15-1-28 4-43 5-14 14-24 17-39 3-15-1-28 5-44 4-11 10-20 9-30Z"
            fill="url(#land-gradient)"
          />
          <path
            d="M327 0h73v265c-14-1-26-4-38-9-14-5-26-2-39-8-14-6-25-12-35-23-8-9-11-18-8-29 4-13 16-20 18-33 2-13-5-25-2-38 3-14 13-25 16-39 3-15-1-28 4-43 5-14 14-24 17-39 3-15-1-28 5-44 4-11 10-20 9-30Z"
            fill="url(#land-grain)"
          />

          <path d="M224 291c23-2 43-6 61-5 20 1 37 3 55 0 19-3 39-11 60-15v49H213Z" fill="url(#land-gradient)" />
          <path d="M224 291c23-2 43-6 61-5 20 1 37 3 55 0 19-3 39-11 60-15v49H213Z" fill="url(#land-grain)" />

          <path d="M104 0c-1 18 2 35 8 52 7 18 4 33 12 49 8 17 5 32 12 49 7 16 4 31-4 47-8 17-8 32-16 49-9 18-12 37-21 55" fill="none" stroke="#f4f0d9" strokeWidth="2" opacity=".85" />
          <path d="M327 0c1 10-5 19-9 30-6 16-2 29-5 44-3 15-12 25-17 39-5 15-1 28-4 43-3 14-13 25-16 39-3 13 4 25 2 38-2 13-14 20-18 33-3 11 0 20 8 29 10 11 21 17 35 23 13 6 25 3 39 8 12 5 24 8 38 9" fill="none" stroke="#f4f0d9" strokeWidth="2" opacity=".85" />
          <path d="M224 291c23-2 43-6 61-5 20 1 37 3 55 0 19-3 39-11 60-15" fill="none" stroke="#f4f0d9" strokeWidth="1.5" opacity=".8" />

          <g className="map-country">
            <rect x="16" y="137" width="78" height="28" rx="14" />
            <text x="55" y="156">{text(language, 'sweden', 'RUOTSI')}</text>
            <rect x="310" y="112" width="75" height="28" rx="14" />
            <text x="347.5" y="131">{text(language, 'finland', 'SUOMI')}</text>
            <rect x="302" y="290" width="64" height="24" rx="12" />
            <text x="334" y="307">{text(language, 'estonia', 'VIRO')}</text>
          </g>

          <text x="202" y="17" className="map-north">{text(language, 'north', 'POHJOINEN')}</text>
          <path d="M202 24v19m0-19-5 7m5-7 5 7" className="map-north-arrow" />
          <text x="204" y="181" className="map-sea-label map-sea-label--main">{text(language, 'balticSea', 'ITÄMERI')}</text>
          <text x="249" y="253" className="map-sea-label map-sea-label--small">{text(language, 'gulfOfFinland', 'SUOMENLAHTI')}</text>
          <text x="204" y="94" className="map-sea-label map-sea-label--small">{text(language, 'bothnianBay', 'PERÄMERI')}</text>
        </svg>
        {regionList.map((region) => {
          const localized = localizedRegion(region, language)
          return (
          <button
            className={`map-pin${selectedRegionId === region.id ? ' map-pin--selected' : ''}`}
            key={region.id}
            type="button"
            style={{ left: `${region.mapPosition.x}%`, top: `${region.mapPosition.y}%` }}
            onClick={() => onSelect(region.id)}
            onKeyDown={(event) => onKeyDown(event, region.id)}
            aria-label={`${text(language, 'select', 'Valitse')} ${localized.name}`}
            aria-pressed={selectedRegionId === region.id}
          >
            <span />
          </button>
          )
        })}
      </div>
      <p className="map-caption">{text(language, 'mapCaption', 'Pohjoinen on ylhäällä. Pisteet merkitsevät alueiden sijaintia, eivät mittausasemia.')}</p>
    </div>
  )
}
