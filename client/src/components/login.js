import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/auth_actions';

export default class Login extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loginUser: PropTypes.func,
    children: PropTypes.object,
    router: PropTypes.object,
    auth: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {

    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim(),
    };

    this.props.loginUser(creds)
      .then(() => {
        if (this.props.auth.isAuthenticated === true) {
          this.context.router.push('/home');
        }
      }
    );
  }

  render() {

    const { isAuthenticated } = this.props;

    return (
      <div>
        <div>
          <h1>Stormbraining</h1>
        </div>
        <div>
          <form onSubmit={this.onSubmit} className="input-group">
            <input
              type="text"
              ref="username"
              className="form-control"
              placeholder="Username"
            />
            <input
              type="password"
              ref="password"
              className="form-control"
              placeholder="Password"
            />
            {!isAuthenticated &&
              <button type="submit" className="btn btn-primary">
                  Login
              </button>
            }
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
