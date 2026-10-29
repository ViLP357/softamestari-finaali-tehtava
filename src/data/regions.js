export const QUESTIONS_PER_ROUND = 6
export const ROUND_COUNT = 3
export const TOTAL_QUESTIONS = QUESTIONS_PER_ROUND * ROUND_COUNT

export const regionList = [
  {
    id: 'saaristomeri',
    name: 'Saaristomeri',
    shortName: 'SAARISTO',
    location: 'Lounaisrannikko · Turun saaristo',
    mapPosition: { x: 65, y: 68 },
    theme: 'archipelago',
    description: 'Saarien, matalien lahtien ja vaihtelevien rannikkovesien mosaiikki.',
    focus: 'Rehevöitymispaine · rannikon elinympäristöt',
    intro: 'Lukuisat saaret suojaavat matalia lahtia. Selvitä, miten kasvillisuus, ravinnekuormitus ja monimuotoisuus kietoutuvat täällä yhteen.',
    initialMetrics: { pressure: 67, habitat: 49, biodiversity: 53, oxygen: 62 },
    speciesByRound: {
      plants: ['bladderwrack', 'eelgrass', 'cladophora', 'charophytes', 'pondweed', 'red-algae'],
      fish: ['herring', 'perch', 'pike', 'three-spined-stickleback', 'zander', 'round-goby'],
      life: ['grey-seal', 'white-tailed-eagle', 'blue-mussel', 'zooplankton', 'amphipod', 'baltic-clam'],
    },
    actionEffects: {
      runoff: { pressure: -16, habitat: 5, biodiversity: 3, oxygen: 8 },
      habitats: { pressure: -3, habitat: 17, biodiversity: 14, oxygen: 2 },
      wastewater: { pressure: -13, habitat: 4, biodiversity: 3, oxygen: 10 },
      invasive: { pressure: 0, habitat: 3, biodiversity: 11, oxygen: 0 },
    },
  },
  {
    id: 'suomenlahti',
    name: 'Suomenlahti',
    shortName: 'SUOMENLAHTI',
    location: 'Etelärannikko · itäinen Suomenlahti',
    mapPosition: { x: 67, y: 81 },
    theme: 'gulf',
    description: 'Jokisuut, vilkas rannikko ja avomereen syvenevä Suomenlahden allas.',
    focus: 'Ravinnekuormitus · veden happitilanne',
    intro: 'Jokien valuma-alueet ja vilkas merialue vaikuttavat Suomenlahteen. Etsi merkkejä ravinnekuormituksesta, happitilanteesta ja muuttuvasta lajistosta.',
    initialMetrics: { pressure: 78, habitat: 55, biodiversity: 50, oxygen: 43 },
    speciesByRound: {
      plants: ['bladderwrack', 'eelgrass', 'cladophora', 'charophytes', 'pondweed', 'phytoplankton'],
      fish: ['herring', 'perch', 'pike', 'three-spined-stickleback', 'zander', 'round-goby'],
      life: ['grey-seal', 'ringed-seal', 'white-tailed-eagle', 'blue-mussel', 'zooplankton', 'amphipod'],
    },
    actionEffects: {
      runoff: { pressure: -19, habitat: 4, biodiversity: 3, oxygen: 12 },
      habitats: { pressure: -2, habitat: 14, biodiversity: 12, oxygen: 2 },
      wastewater: { pressure: -16, habitat: 3, biodiversity: 2, oxygen: 14 },
      invasive: { pressure: 0, habitat: 2, biodiversity: 12, oxygen: 0 },
    },
  },
  {
    id: 'perameri',
    name: 'Perämeri',
    shortName: 'PERÄMERI',
    location: 'Pohjoinen rannikko · Perämeren matalat vedet',
    mapPosition: { x: 57, y: 34 },
    theme: 'bothnian',
    description: 'Pohjoinen, matala murtovesialue, johon jokivedet ja vuodenaikojen vaihtelu vaikuttavat.',
    focus: 'Murtovesi · jokisuistot · elinympäristöjen vaihtelu',
    intro: 'Perämeren vähäsuolaisissa ja matalissa vesissä lajisto sopeutuu pohjoisiin oloihin. Tutki rannikon elinympäristöjä ja murtoveden erityispiirteitä.',
    initialMetrics: { pressure: 48, habitat: 66, biodiversity: 61, oxygen: 79 },
    speciesByRound: {
      plants: ['cladophora', 'charophytes', 'pondweed', 'fucus-radicans', 'reed', 'northern-charophyte'],
      fish: ['herring', 'perch', 'pike', 'three-spined-stickleback', 'whitefish', 'vendace'],
      life: ['ringed-seal', 'grey-seal', 'white-tailed-eagle', 'zooplankton', 'amphipod', 'baltic-clam'],
    },
    actionEffects: {
      runoff: { pressure: -13, habitat: 8, biodiversity: 5, oxygen: 4 },
      habitats: { pressure: -2, habitat: 18, biodiversity: 13, oxygen: 1 },
      wastewater: { pressure: -11, habitat: 5, biodiversity: 4, oxygen: 7 },
      invasive: { pressure: 0, habitat: 5, biodiversity: 10, oxygen: 0 },
    },
  },
]

export const regionById = Object.fromEntries(regionList.map((region) => [region.id, region]))
