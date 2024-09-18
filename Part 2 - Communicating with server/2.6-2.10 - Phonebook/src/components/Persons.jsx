import PropTypes from 'prop-types';

const Persons = (props) => {
    return (
        <div>
            {props.persons.map(person => 
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            )}
        </div>
    )
}

Persons.propTypes = {
    persons: PropTypes.array.isRequired
}

export default Persons