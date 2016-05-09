import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginButton from './login_button';


class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div>
        <h1>Stormbraining</h1>
        <LoginButton
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps)(Login);
