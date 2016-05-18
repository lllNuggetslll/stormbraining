import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lockSuccess, lockError } from '../actions/auth_actions';
import { saveOrFetchUser } from '../actions/index';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

export default class LoginButton extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    router: PropTypes.object,
    auth: PropTypes.object,
    lockSuccess: PropTypes.func,
    lockError: PropTypes.func,
    saveOrFetchUser: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.onLogin = this.onLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.lock = new Auth0Lock('Wxg5EhfSanTioiIfdLOdlCwdKoK7twjn', 'app50347872.auth0.com');
  }

  onLogin() {
    this.lock.show({ gravatar: false }, (err, profile, token) => {
      // If we receive an error, we dispatch the lockError action
      if (err) {
        this.props.lockError(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      const user = {
        name: profile.name,
        nickname: profile.nickname,
        email: profile.email,
        id: profile.user_id,
      };
      this.props.saveOrFetchUser(user)
        .then(() => {
          this.props.lockSuccess(profile, token);
          if (this.props.isAuthenticated) {
            this.redirect();
          }
        });
    });
  }

  redirect() {
    browserHistory.push('/');
  }

  render() {
    const { isAuthenticated, errorMessage } = this.props;

    if (!isAuthenticated) {
      return (
        <RaisedButton
          errorMessage={errorMessage}
          onClick={this.onLogin}
          // className="login-button"
          backgroundColor="#F50057"
          label="Log in / Sign up"
        />
      );
    } else {
      setTimeout(this.redirect, 1000);
      return (
        <p>
          Already logged in, redirecting...
        </p>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ lockSuccess, lockError, saveOrFetchUser }, dispatch);
}

function mapStateToProps({ auth }) {
  return auth;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
