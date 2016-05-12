import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginButton from './login_button';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import './styles/main.scss';

const style = {
  height: 500,
  width: 750,
  maxWidth: '100%',
  margin: '2.5% auto 0',
  textAlign: 'center',
  display: 'block',
};

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
        <Paper style={style} zDepth={4}>
          <div className="login-title">
            <h1 className="title">Stormbraining</h1>
            <LoginButton
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              dispatch={dispatch}
            />
          </div>
          </Paper>
        </div>
      </MuiThemeProvider>
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
