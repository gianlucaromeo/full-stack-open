import PropTypes from 'prop-types'

const StatisticsLine = (props) => (
  <p>
    {props.text} {props.value}
  </p>
)

StatisticsLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default StatisticsLine