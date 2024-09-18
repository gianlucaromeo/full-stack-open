import PropTypes from 'prop-types'

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.filter} onChange={props.handleFilterChange} />
        </div>
    )
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired
}

export default Filter
