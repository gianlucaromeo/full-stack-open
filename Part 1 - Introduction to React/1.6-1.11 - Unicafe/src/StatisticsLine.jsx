import PropTypes from 'prop-types'

// Deprecated: This component is no longer in use, after adding a table 
// to display the statistics.
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