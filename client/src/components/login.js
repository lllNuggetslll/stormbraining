import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logoutUser } from '../actions/auth_actions';

export default class Login extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func,
    logoutUser: PropTypes.func,
    children: PropTypes.object,
    router: PropTypes.object,
    auth: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
  //   // event.preventDefault();
  //   // const username = this.refs.username;
  //   // const password = this.refs.password;
  //   // const creds = {
  //   //   username: username.value.trim(),
  //   //   password: password.value.trim(),
  //   // };
    this.props.dispatch(login());
    // if (this.props.auth.isAuthenticated === true) {
    //   this.context.router.push('/home');
    // }
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    
    return (
      <div>
        <div>
          <h1>Stormbraining</h1>
        </div>
        <div>
          {!isAuthenticated &&
            <button
              errorMessage={errorMessage}
              onClick={this.onLogin}
              className="btn btn-primary"
            >
              Login
            </button>
          }

          {isAuthenticated &&
            <button
              onClick={creds => this.onLogin}
              className="btn btn-primary"
            >
              Logout
            </button>
          }

        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, logoutUser }, dispatch);
}

function mapStateToProps({ auth }) {
  return auth;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// <Login
//   errorMessage={errorMessage}
//   onLoginClick={() => dispatch(login()) }
//   />
// <form onSubmit={this.onSubmit} className="input-group">
//   <input
//     type="text"
//     ref="username"
//     className="form-control"
//     placeholder="Username"
//   />
//   <input
//     type="password"
//     ref="password"
//     className="form-control"
//     placeholder="Password"
//   />
//   {!isAuthenticated &&
//     <button type="submit" className="btn btn-primary">
//         Login
//     </button>
//   }
// </form>
