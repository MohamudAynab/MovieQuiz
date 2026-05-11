import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FetchButton from './FetchButton';

const CATEGORIES_URL = 'https://opentdb.com/api_category.php'
const MAX_QUESTION_AMOUNT = 50

function Settings() {
  const [options, setOptions] = useState(null)

  const loading = useSelector((state) => state.options.loading)

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

  const dispatch = useDispatch()

  useEffect(() => {
    let active = true

    const handleLoadingChange = (value) => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value,
      })
    }

    handleLoadingChange(true)

    fetch(CATEGORIES_URL, { credentials: 'omit' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Trivia categories API returned ${res.status}`)
        }

        return res.json()
      })
      .then((response) => {
        if (!active) {
          return
        }

        handleLoadingChange(false)
        setOptions(
          Array.isArray(response.trivia_categories)
            ? response.trivia_categories
            : []
        )
      })
      .catch(() => {
        if (!active) {
          return
        }

        handleLoadingChange(false)
        setOptions([])
      })

    return () => {
      active = false
    }
  }, [setOptions, dispatch])

  const handleCategoryChange = (event) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      question_category: event.target.value,
    })
  }

  const handleDifficultyChange = (event) => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      question_difficulty: event.target.value,
    })
  }

  const handleTypeChange = (event) => {
    dispatch({
      type: 'CHANGE_TYPE',
      question_type: event.target.value,
    })
  }

  const handleAmountChange = (event) => {
    const { value } = event.target
    const amount = Number.parseInt(value, 10)

    dispatch({
      type: 'CHANGE_AMOUNT',
      amount_of_questions:
        value === '' || !Number.isInteger(amount)
          ? ''
          : Math.min(Math.max(amount, 1), MAX_QUESTION_AMOUNT),
    })
  }

  if (!loading) {
    return (
      <div>
        <h1>Quiz App</h1>
        <div>
          <h2>Select Category:</h2>
          <select value={questionCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            {options &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <h2>Select Difficulty:</h2>
          <select value={questionDifficulty} onChange={handleDifficultyChange}>
            <option value="" key="difficulty-0">
              All
            </option>
            <option value="easy" key="difficulty-1">
              Easy
            </option>
            <option value="medium" key="difficulty-2">
              Medium
            </option>
            <option value="hard" key="difficulty-3">
              Hard
            </option>
          </select>
        </div>

        <div>
          <h2>Select Question Type:</h2>
          <select value={questionType} onChange={handleTypeChange}>
            <option value="" key="type-0">
              All
            </option>
            <option value="multiple" key="type-1">
              Multiple Choice
            </option>
            <option value="boolean" key="type-2">
              True/False
            </option>
          </select>
        </div>

        <div>
          <h2>Amount of Questions:</h2>
          <input
            type="number"
            min="1"
            max={MAX_QUESTION_AMOUNT}
            value={questionAmount}
            onChange={handleAmountChange}
          />
        </div>

        <FetchButton text="Get started!" />
      </div>
    )
  }

  return <p>LOADING...</p>
}
export default Settings