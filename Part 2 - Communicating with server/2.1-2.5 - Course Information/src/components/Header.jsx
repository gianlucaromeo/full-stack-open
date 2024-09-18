import PropTypes from 'prop-types'

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

Header.propTypes = {
    course: PropTypes.object.isRequired
}

export default Header