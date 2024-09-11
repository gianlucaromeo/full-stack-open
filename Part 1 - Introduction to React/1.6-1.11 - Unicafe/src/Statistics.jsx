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
                <tr>
                  <td>good</td>
                  <td>{good}</td>
                </tr>
                <tr>
                  <td>neutral</td>
                  <td>{neutral}</td>
                </tr>
                <tr>
                  <td>bad</td>
                  <td>{bad}</td>
                </tr>
                <tr>
                  <td>all</td>
                  <td>{total}</td>
                </tr>
                <tr>
                  <td>average</td>
                  <td>{average}</td>
                </tr>
                <tr>
                  <td>positive</td>
                  <td>{positive} %</td>
                </tr>
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