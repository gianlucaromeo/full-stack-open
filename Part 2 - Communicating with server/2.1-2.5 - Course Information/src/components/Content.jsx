import PropTypes from 'prop-types'
import Part from './Part'

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

Content.propTypes = {
    parts: PropTypes.array.isRequired
}

export default Content