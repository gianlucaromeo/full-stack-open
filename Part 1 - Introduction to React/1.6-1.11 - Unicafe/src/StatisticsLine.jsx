import PropTypes from 'prop-types'

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

StatisticsLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default StatisticsLine