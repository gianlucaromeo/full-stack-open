import PropTypes from 'prop-types'

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div className="success">{message}</div>
}

SuccessNotification.propTypes = {
    message: PropTypes.string
}

export default SuccessNotification