import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { receiveLogout } from '../actions/auth_actions';
import { browserHistory, Link } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import Paper from 'material-ui/Paper';

const styles = {
  title: {
    cursor: 'pointer',
    float: 'left',
  },
};

const paper = {
  minHeight: '620px',
  minWidth: '100%',
  marginTop: '.4%',
  width: 750,
  textAlign: 'center',
  display: 'inline-block',
};

const iconStyles = {
  height: 25,
  width: 25,
  margin: 10,
  display: 'inline-block',
  color: 'cyan50',
};

function handleTouchTap() {
  browserHistory.push('/');
}

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object,
    receiveLogout: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.props.receiveLogout();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Paper style={paper} zDepth={4}>
            <AppBar
              title={<span style={styles.title}>Stormbraining</span>}
              onTitleTouchTap={handleTouchTap}
              iconElementLeft={
                <Paper style={iconStyles} zDepth={1} circle />
              }
              iconElementRight={
                <IconMenu
                  iconButtonElement={
                    <IconButton><ContentFilter /></IconButton>
                  }
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem
                    primaryText="Boards"
                    linkButton
                    containerElement={<Link to="/boards" />}
                  />
                  <MenuItem
                    primaryText="Logout"
                    onTouchTap={this.onLogout}
                    linkButton
                    containerElement={<Link to="/login" />}
                  />
                </IconMenu>
              }
            />
            {this.props.children}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default connect(null, { receiveLogout })(App);
