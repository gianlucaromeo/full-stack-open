import PropTypes from 'prop-types';

const Total = (props) => {
    const total = props.parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
        <p>Number of exercises {total}</p>
    )
}

Total.propTypes = {
    parts: PropTypes.array.isRequired
};

export default Total;