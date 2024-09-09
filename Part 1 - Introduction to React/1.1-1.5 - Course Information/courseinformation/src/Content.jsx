import Part from './Part';

import PropTypes from 'prop-types';

const Content = (props) => {
    // assert that props.parts is an array of 3 objects
    if (props.parts.length !== 3) {
        throw new Error('Content component requires exactly 3 parts');
    }

    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

Content.propTypes = {
    parts: PropTypes.array.isRequired
};

export default Content;
