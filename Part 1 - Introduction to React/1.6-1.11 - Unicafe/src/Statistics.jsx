import StatisticsLine from './StatisticsLine'

import PropTypes from 'prop-types'


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
            <table>
              <tbody>
                <StatisticsLine text="good" value={good} />
                <StatisticsLine text="neutral" value={neutral} />
                <StatisticsLine text="bad" value={bad} />
                <StatisticsLine text="all" value={total} />
                <StatisticsLine text="average" value={average} />
                <StatisticsLine text="positive" value={positive + " %"} />
              </tbody>
            </table>
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

export default Statistics