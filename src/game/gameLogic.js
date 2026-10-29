import { protectionActions } from '../data/actions.js'
import { QUESTIONS_PER_ROUND } from '../data/regions.js'
import { speciesById } from '../data/species.js'

export function getRegionTasks(region) {
  return ['plants', 'fish', 'life'].map((round) => {
    const ids = region.speciesByRound[round]
    if (ids.length !== QUESTIONS_PER_ROUND) {
      throw new Error(`${region.name}: kierroksella ${round} pitää olla ${QUESTIONS_PER_ROUND} tehtävää.`)
    }
    return ids.map((id) => {
      const card = speciesById[id]
      if (!card || !card.regions.includes(region.id)) {
        throw new Error(`${region.name}: lajikortti ${id} ei kuulu valittuun alueeseen.`)
      }
      return card
    })
  })
}

function clamp(value) {
  return Math.max(0, Math.min(100, value))
}

export function updateMetrics(metrics, task, correct) {
  const updated = { ...metrics }
  if (!correct) {
    updated.biodiversity = clamp(updated.biodiversity - 1)
    return updated
  }

  updated.biodiversity = clamp(updated.biodiversity + (task.round === 'plants' ? 1 : 2))
  if (task.round === 'plants') {
    updated.habitat = clamp(updated.habitat + 2)
    updated.pressure = clamp(updated.pressure - 1)
  } else if (task.round === 'fish') {
    updated.oxygen = clamp(updated.oxygen + 1)
  }
  return updated
}

export function ecosystemIndex(metrics) {
  return Math.round((100 - metrics.pressure + metrics.habitat + metrics.biodiversity + metrics.oxygen) / 4)
}

export function applyProtectionActions(region, actionIds, startingMetrics) {
  const actionById = Object.fromEntries(protectionActions.map((action) => [action.id, action]))
  const selected = actionIds.map((id) => {
    const action = actionById[id]
    if (!action) throw new Error(`Tuntematon suojelutoimi: ${id}`)
    return action
  })
  if (selected.length !== 2 || new Set(actionIds).size !== 2) {
    throw new Error('Loppuhaasteessa tulee valita kaksi eri suojelutoimea.')
  }
  const totalCost = selected.reduce((total, action) => total + action.cost, 0)
  if (totalCost > 40) throw new Error('Suojelutoimien budjetti ylittyy.')

  const result = { ...startingMetrics }
  selected.forEach((action) => {
    const effects = region.actionEffects[action.id]
    Object.keys(effects).forEach((key) => {
      result[key] = clamp(result[key] + effects[key])
    })
  })
  return {
    actions: selected,
    before: startingMetrics,
    after: result,
    beforeIndex: ecosystemIndex(startingMetrics),
    afterIndex: ecosystemIndex(result),
  }
}
