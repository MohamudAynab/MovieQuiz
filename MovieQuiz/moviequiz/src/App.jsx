import React from 'react'
import { useSelector } from 'react-redux'
import FinalScreen from './Components/FinalScreen'
import Question from './Components/Questions'
import Settings from './Components/Settings'

function App() {
  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)

  if (!questions.length) {
    return <Settings />
  }

  if (questionIndex >= questions.length) {
    return <FinalScreen />
  }

  return <Question />
}

export default App
