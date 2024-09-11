import { useState } from 'react'
import PropTypes from 'prop-types'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

const StatisticsLine = (props) => (
  <p>
    {props.text} {props.value}
  </p>
)

StatisticsLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number,
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <>
      <h1>statistics</h1>
      {
        total === 0
          ? <p>No feedback given</p>
          : <>
              <StatisticsLine text="good" value={good} />
              <StatisticsLine text="neutral" value={neutral} />
              <StatisticsLine text="bad" value={bad} />
              <StatisticsLine text="all" value={total} />
              <StatisticsLine text="average" value={average || 0} />
              <StatisticsLine text="positive" value={positive || 0} />
            </>
      }
    </>
  )
}

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App