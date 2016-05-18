import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { green500 } from 'material-ui/styles/colors';

const paper = {
  backgroundColor: green500,
};

class Users extends Component {

  static propTypes = {
    params: PropTypes.object,
    board: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = { users: [] };
    this.renderUsers = this.renderUsers.bind(this);

    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', { board: this.props.params.board_id, check: 1, user: JSON.parse(localStorage.profile).name, email: JSON.parse(localStorage.profile).email });
    });
    this.socket.on('user', (data) => {
      if (data[this.props.params.board_id]) {
        this.setState({ users: data[this.props.params.board_id] });
      }
    });
    this.socket.on('left', (data) => {
      if (data[this.props.params.board_id]) {
        this.setState({ users: data[this.props.params.board_id] });
      }
    });
  }


  componentWillUnmount() {
    this.socket.emit('unsubscribe', { board: this.props.params.board_id, check: 2, user: JSON.parse(localStorage.profile).name, email: JSON.parse(localStorage.profile).email });
    this.socket.disconnect();
  }

  renderUsers(data) {
    return (
        <ListItem key={data[0]}
          primaryText={data[1]}
          disabled={true}
          rightIcon={<Paper style={paper} zDepth={1} circle />}
        />
    );
  }

  render() {
    return (
      <List>
        <div>
          {this.state.users.map(this.renderUsers)}
        </div>
      </List>
    );
  }
}


function mapStateToProps({ board }) {
  return { board };
}

export default connect(mapStateToProps)(Users);
