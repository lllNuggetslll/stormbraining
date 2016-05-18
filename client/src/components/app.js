import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { receiveLogout } from '../actions/auth_actions';
import { Link } from 'react-router';

import { grey100, grey300, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import '../containers/styles/main.scss';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#607D8B',
    primary2Color: '#455A64',
    primary3Color: '#90A4AE',
    accent1Color: '#F50057',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#607D8B',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});


const styles = {
  title: {
    float: 'left',
  },
};

export const paper = {
  minHeight: '620px',
  maxWidth: '100%',
  width: 1000,
  textAlign: 'center',
  display: 'block',
  margin: '0 auto',
  paddingBottom: '20px',
};

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object,
    receiveLogout: PropTypes.func,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(muiTheme) };
  }

  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.props.receiveLogout();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            style={{ margin: '0px', paddingTop: '10px', paddingBottom: '5px' }}
            title={<span style={styles.title}>Stormbraining</span>}
            zDepth={3}
            iconElementLeft={<img src="../brainstorm.gif" style={{ width: '40px', margin: '0px 10px' }} /> }
            iconElementRight={
              <Tabs>
                <Tab
                  className="tabs-boards"
                  label="Home"
                  containerElement={<Link to="/" />}
                />
                <Tab
                  className="tabs-logout"
                  label="Logout"
                  onClick={this.onLogout}
                  containerElement={<Link to="/login" />}
                />
              </Tabs>
            }
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}


export default connect(null, { receiveLogout })(App);
