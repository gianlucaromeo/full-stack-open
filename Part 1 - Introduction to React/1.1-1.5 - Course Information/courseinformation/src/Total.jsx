import PropTypes from 'prop-types';

const Total = (props) => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}

Total.propTypes = {
    total: PropTypes.number.isRequired
};

export default Total;