import PropTypes from 'prop-types'

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

Part.propTypes = {
    part: PropTypes.object.isRequired
}

export default Part