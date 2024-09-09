import PropTypes from 'prop-types';

const Content = (props) => {
    return (
        props.parts.map(part => <p key={part}>{part.part} {part.exercises}</p>)
    )
}

Content.propTypes = {
    parts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Content;
