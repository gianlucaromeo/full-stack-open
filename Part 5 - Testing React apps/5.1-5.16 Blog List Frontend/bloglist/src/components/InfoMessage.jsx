import PropTypes from 'prop-types'

const InfoMessage = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

InfoMessage.displayName = 'InfoMessage'

InfoMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default InfoMessage  