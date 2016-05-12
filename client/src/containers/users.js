import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addActiveUser, getActiveUsers, deleteActiveUser } from '../actions/index';

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
    addActiveUser: PropTypes.func,
    getActiveUsers: PropTypes.func,
    deleteActiveUser: PropTypes.func,
    board: PropTypes.object,
    activeuser: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.renderUsers = this.renderUsers.bind(this);
  }

  componentWillMount() {
    this.props.getActiveUsers(this.props.params.board_id);
    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', this.props.board.id);
      this.props.addActiveUser(this.props.board.id, JSON.parse(localStorage.profile).name);
    });
    this.socket.on('user', () => {
      this.props.getActiveUsers(this.props.board.id);
    });
  }

  componentWillUnmount() {
    this.props.deleteActiveUser(this.props.board.id);
    this.socket.emit('unsubscribe', this.props.params.board_id);
  }

  renderUsers(data) {
    return (
        <ListItem key={data.id}
          primaryText={data.name}
          disabled={true}
          rightIcon={<Paper style={paper} zDepth={2} circle />}
        />
    );
  }

  render() {
    return (
      <List>
        <Subheader>Active Users</Subheader>
        <div>
          {this.props.activeuser.map(this.renderUsers)}
        </div>
      </List>
    );
  }
}


function mapStateToProps({ board, activeuser }) {
  return { board, activeuser };
}

export default connect(mapStateToProps, { addActiveUser, getActiveUsers, deleteActiveUser })(Users);
