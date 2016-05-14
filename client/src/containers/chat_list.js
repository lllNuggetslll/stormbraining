import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMessages, addMessage } from '../actions/index';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';

import { grey400, darkBlack, bold } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
// import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui';

class ChatList extends Component {

  static propTypes = {
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    addMessage: PropTypes.func,
    chat: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.renderChats = this.renderChats.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    this.props.getMessages(this.props.params.board_id)
      .then(() => {
        this.socket = io();
        this.socket.on('connect', () => {
          this.socket.emit('subscribe', this.props.board.id);
        });
        this.socket.on('message', () => {
          this.props.getMessages(this.props.board.id);
        });
      });
  }

  componentWillUnmount() {
    this.socket.emit('unsubscribe', this.props.board.id);
  }

  // componentDidUpdate() {
  //   const node = this.getDOMNode();
  //   node.scrollTop = node.scrollHeight;
  // }

  onInputChange(event) {
    event.stopPropagation();
    this.setState({ term: event.target.value });
  }

  onChatSubmit(event) {
    event.preventDefault();
    const userName = JSON.parse(localStorage.profile).name;
    const message = this.state.term;
    if (message) {
      this.props.addMessage(this.props.board.id, message, userName);
      this.setState({ term: '' });
    }
  }

  renderChats(data) {
    return (
      <div>
        <ListItem key={data.id}
          primaryText={
            <p>
              <span style={{ color: darkBlack }}>{data.userName}</span>
              <span style={{ color: grey400 }}>  {moment(data.createdAt).startOf('hour').fromNow().toString()}</span>
              <br />
              <br />
              {data.message}
            </p>
          }
          disabled={true}
        />
      <Divider />
    </div>
    );
  }
  // <ListItem key={1}
  //   primaryText={data.message}
  // />

  render() {
    return (
      <div>
        <List>
          <Subheader>Active Users</Subheader>
          <div>
            {this.props.chat.map(this.renderChats)}
          </div>
        </List>
      <div>
        <Subheader>ESC to exit</Subheader>
        <form onSubmit={this.onChatSubmit}>
          <TextField
            hintText="Your message here..."
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <RaisedButton
            type="submit"
            label="Send"
            className="board-button"
          />
        </form>
      </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMessages, addMessage }, dispatch);
}

function mapStateToProps({ board, chat }) {
  return { board, chat };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
