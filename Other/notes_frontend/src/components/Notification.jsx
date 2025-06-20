import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

Notification.displayName = 'Notification'

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification