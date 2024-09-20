import PropTypes from 'prop-types';

const Persons = (props) => {

    const showConfirmation = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            props.onDeletePerson(person.id)
        }
    }

    return (
        <div>
            {props.persons.map(person =>
                <div key={person.name}>
                    <span>
                        {person.name} {person.number}
                    </span>
                    <button onClick={() => showConfirmation(person)}>
                        delete
                    </button>
                </div>
            )}

        </div>
    )
}

Persons.propTypes = {
    persons: PropTypes.array.isRequired,
    onDeletePerson: PropTypes.func.isRequired
}

export default Persons