import PropTypes from 'prop-types';

function UserGreeting(props) {
  return props.logIn ? <h1>Hello {props.userName}</h1> : <h1>Please login</h1>;
}

UserGreeting.propTypes = {
  logIn: PropTypes.bool,
  userName: PropTypes.string,
};

UserGreeting.defaultProps = {
  userName: "Guest",
  logIn: false,
};

export default UserGreeting;
