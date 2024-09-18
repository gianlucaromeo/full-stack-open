import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

Course.propTypes = {
    course: PropTypes.object.isRequired
}

export default Course