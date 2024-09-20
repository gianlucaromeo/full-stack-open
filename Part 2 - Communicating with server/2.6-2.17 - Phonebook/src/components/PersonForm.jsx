import PropTypes from 'prop-types'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    newName: PropTypes.string.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    newNumber: PropTypes.string.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
    addPerson: PropTypes.func.isRequired
}

export default PersonForm