import { useEffect, useState } from 'react'
import { QUESTIONS_PER_ROUND, ROUND_COUNT, regionList } from './data/regions.js'
import { applyProtectionActions, getRegionTasks, updateMetrics } from './game/gameLogic.js'
import { localizedAction, localizedRegion, localizedTask, text } from './data/localization.js'
import FinalChallenge from './components/FinalChallenge.jsx'
import Header from './components/Header.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import RegionSelector from './components/RegionSelector.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import RoundIntroModal from './components/RoundIntroModal.jsx'
import SourcesModal from './components/SourcesModal.jsx'
import SpeciesRound from './components/SpeciesRound.jsx'
import './App.css'

const BEST_SCORE_KEY = 'itameri-ekosysteemin-palauttajat-records'
const LANGUAGE_KEY = 'itameri-tasapainoon-language'

function readLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'fi'
  } catch (error) {
    console.error('Kieliasetuksen lukeminen epäonnistui.', error)
    return 'fi'
  }
}

function readRecords() {
  try {
    const stored = window.localStorage.getItem(BEST_SCORE_KEY)
    if (!stored) return {}
    const parsed = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed).filter(([regionId, value]) => (
        regionList.some((region) => region.id === regionId) && Number.isFinite(value)
      )),
    )
  } catch (error) {
    console.error('Aluekohtaisten ennätysten lukeminen epäonnistui.', error)
    return {}
  }
}

function App() {
  const [language, setLanguage] = useState(readLanguage)
  const [screen, setScreen] = useState('home')
  const [region, setRegion] = useState(null)
  const [tasks, setTasks] = useState([])
  const [round, setRound] = useState(0)
  const [showRoundIntro, setShowRoundIntro] = useState(false)
  const [taskIndex, setTaskIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [metrics, setMetrics] = useState(null)
  const [answered, setAnswered] = useState(null)
  const [roundResults, setRoundResults] = useState([])
  const [roundCorrect, setRoundCorrect] = useState(0)
  const [discoveries, setDiscoveries] = useState([])
  const [challenge, setChallenge] = useState(null)
  const [records, setRecords] = useState(readRecords)
  const [showSources, setShowSources] = useState(false)

  const currentTask = tasks[round]?.[taskIndex]
  const previousBest = region ? records[region.id] ?? 0 : 0
  const recordValues = Object.values(records).filter(Number.isFinite)
  const bestScore = recordValues.length > 0 ? Math.max(...recordValues) : null
  const localizedCurrentTask = currentTask ? localizedTask(currentTask, language) : null
  const localizedCurrentRegion = region ? localizedRegion(region, language) : null

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'en' ? 'Baltic Sea in Balance' : 'Itämeri tasapainoon'
    try {
      window.localStorage.setItem(LANGUAGE_KEY, language)
    } catch (error) {
      console.error('Kieliasetuksen tallentaminen epäonnistui.', error)
    }
  }, [language])

  function startRegion(selectedRegion) {
    const nextTasks = getRegionTasks(selectedRegion)
    setRegion(selectedRegion)
    setTasks(nextTasks)
    setRound(0)
    setShowRoundIntro(true)
    setTaskIndex(0)
    setScore(0)
    setCorrectCount(0)
    setMetrics({ ...selectedRegion.initialMetrics })
    setAnswered(null)
    setRoundResults([])
    setRoundCorrect(0)
    setDiscoveries([])
    setChallenge(null)
    setScreen('game')
  }

  function answerTask(choice) {
    if (answered !== null || !currentTask || !metrics) return
    const isCorrect = currentTask.choices[choice] === currentTask.correctAnswer
    setAnswered(choice)
    setMetrics((current) => updateMetrics(current, currentTask, isCorrect))
    if (isCorrect) {
      setScore((value) => value + 10)
      setCorrectCount((value) => value + 1)
      setRoundCorrect((value) => value + 1)
      setDiscoveries((items) => [...items, currentTask])
    } else {
      setScore((value) => Math.max(0, value - 2))
    }
  }

  function nextTask() {
    if (answered === null || !currentTask) return
    if (taskIndex < QUESTIONS_PER_ROUND - 1) {
      setTaskIndex((value) => value + 1)
      setAnswered(null)
      return
    }

    setRoundResults((items) => [...items, { round, correct: roundCorrect }])
    if (round < ROUND_COUNT - 1) {
      setRound((value) => value + 1)
      setTaskIndex(0)
      setRoundCorrect(0)
      setAnswered(null)
      setShowRoundIntro(true)
      return
    }

    setScreen('challenge')
  }

  function resolveChallenge(actionIds) {
    if (!region || !metrics) return
    const result = applyProtectionActions(region, actionIds, metrics)
    const strategyScore = Math.max(0, result.afterIndex - result.beforeIndex) * 2
    const finalScore = score + strategyScore
    const nextRecords = { ...records, [region.id]: Math.max(previousBest, finalScore) }
    try {
      window.localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(nextRecords))
      setRecords(nextRecords)
    } catch (error) {
      console.error('Aluekohtaisen ennätyksen tallentaminen epäonnistui.', error)
    }
    setChallenge({ ...result, strategyScore, finalScore })
    setScreen('results')
  }

  function replay() {
    setRegion(null)
    setScreen('regions')
  }

  return (
    <div className={`app-shell app-shell--${screen}${region ? ` app-shell--region-${region.theme}` : ''}`}>
      <Header
        language={language}
        onLanguageChange={(nextLanguage) => setLanguage(nextLanguage)}
        bestScore={bestScore}
        onSources={() => setShowSources(true)}
      />
      {screen === 'home' && (
        <IntroScreen
          bestScore={bestScore || null}
          language={language}
          onStart={() => setScreen('regions')}
          onSources={() => setShowSources(true)}
        />
      )}
      {screen === 'regions' && (
        <RegionSelector language={language} onChoose={startRegion} onBack={() => setScreen('home')} />
      )}
      {screen === 'game' && currentTask && region && metrics && (
        <SpeciesRound
          language={language}
          region={localizedCurrentRegion}
          round={round}
          taskIndex={taskIndex}
          task={localizedCurrentTask}
          score={score}
          metrics={metrics}
          discoveries={discoveries}
          answered={answered}
          correctInRound={roundCorrect}
          onAnswer={answerTask}
          onNext={nextTask}
          onSources={() => setShowSources(true)}
        />
      )}
      {screen === 'game' && showRoundIntro && (
        <RoundIntroModal language={language} round={round} onContinue={() => setShowRoundIntro(false)} />
      )}
      {screen === 'challenge' && region && metrics && (
        <FinalChallenge
          language={language}
          region={localizedCurrentRegion}
          metrics={metrics}
          discoveries={discoveries}
          score={score}
          onResolve={resolveChallenge}
          onSources={() => setShowSources(true)}
        />
      )}
      {screen === 'results' && challenge && region && (
        <ResultsScreen
          language={language}
          region={localizedCurrentRegion}
          score={score}
          strategyScore={challenge.strategyScore}
          finalScore={challenge.finalScore}
          correctCount={correctCount}
          roundResults={roundResults}
          discoveries={discoveries}
          challenge={{
            ...challenge,
            actions: challenge.actions.map((action) => localizedAction(action, language)),
          }}
          bestScore={records[region.id] ?? challenge.finalScore}
          onReplay={replay}
          onHome={() => setScreen('home')}
          onSources={() => setShowSources(true)}
        />
      )}
      <footer className="site-footer"><span>{text(language, 'tagline', 'TUTKI · TUNNISTA · PALAUTA')}</span><span>{text(language, 'footerShared', 'Itämeri on yhteinen.')}</span><span>© SININEN RETKI</span></footer>
      {showSources && <SourcesModal language={language} onClose={() => setShowSources(false)} />}
    </div>
  )
}

export default App
