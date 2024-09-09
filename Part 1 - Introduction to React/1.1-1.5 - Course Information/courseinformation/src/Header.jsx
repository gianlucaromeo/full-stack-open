import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

Header.propTypes = {
    course: PropTypes.string.isRequired
};

export default Header;