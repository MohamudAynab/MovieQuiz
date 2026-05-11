import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const API_URL = 'https://opentdb.com/api.php'
const DEFAULT_QUESTION_AMOUNT = 10
const MAX_QUESTION_AMOUNT = 50
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard'])
const VALID_TYPES = new Set(['multiple', 'boolean'])

const getSafeQuestionAmount = (value) => {
  const amount = Number.parseInt(value, 10)

  if (!Number.isInteger(amount)) {
    return DEFAULT_QUESTION_AMOUNT
  }

  return Math.min(Math.max(amount, 1), MAX_QUESTION_AMOUNT)
}

const getSafeCategory = (value) => {
  const category = Number.parseInt(value, 10)

  return Number.isInteger(category) && category > 0 ? String(category) : null
}

function FetchButton(props) {
  const questionCategory = useSelector(
    (state) => state.options.question_category
  )
  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  )
  const questionType = useSelector((state) => state.options.question_type)
  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  )
  const questionIndex = useSelector((state) => state.index)

  const dispatch = useDispatch()

  const setLoading = (value) => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value,
    })
  }

  const setQuestions = (value) => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value,
    })
  }

  const handleQuery = async () => {
    const params = new URLSearchParams({
      amount: String(getSafeQuestionAmount(questionAmount)),
    })
    const safeCategory = getSafeCategory(questionCategory)

    if (safeCategory) {
      params.set('category', safeCategory)
    }

    if (VALID_DIFFICULTIES.has(questionDifficulty)) {
      params.set('difficulty', questionDifficulty)
    }

    if (VALID_TYPES.has(questionType)) {
      params.set('type', questionType)
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}?${params.toString()}`, {
        credentials: 'omit',
      })

      if (!response.ok) {
        throw new Error(`Trivia API returned ${response.status}`)
      }

      const data = await response.json()
      setQuestions(Array.isArray(data.results) ? data.results : [])
    } catch (error) {
      setQuestions([])
    } finally {
      setLoading(false)
    }

    if (questionIndex > 0) {
      dispatch({
        type: 'SET_INDEX',
        index: 0,
      })

      dispatch({
        type: 'SET_SCORE',
        score: 0,
      })
    }
  }

  return <button onClick={handleQuery}>{props.text}</button>
}
export default FetchButton