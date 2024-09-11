import PropTypes from 'prop-types'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default Button