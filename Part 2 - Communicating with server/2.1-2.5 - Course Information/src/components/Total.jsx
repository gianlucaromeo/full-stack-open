import PropTypes from 'prop-types'

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

Total.propTypes = {
    parts: PropTypes.array.isRequired
}

export default Total