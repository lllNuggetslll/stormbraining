import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMessages, addMessage } from '../actions/index';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui';

export default class Chat extends Component {

  static propTypes = { // this seems to be the preferred set-up
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    addMessage: PropTypes.func,
    chat: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = { open: false, term: '' };
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

  onInputChange(event) {
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

  handleToggle = () => this.setState({ open: !this.state.open });

  renderChats(data) {
    return (
      <TableRow key={data.id}>
        <TableRowColumn>{data.userName}</TableRowColumn>
        <TableRowColumn>{data.message}</TableRowColumn>
        <TableRowColumn>{data.createdAt}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Chat"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {this.props.chat.map(this.renderChats)}
            </TableBody>
          </Table>
          <form onSubmit={this.onChatSubmit}>
            <TextField
              hintText="Chat me up, baby!"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <RaisedButton
              type="submit"
              label="Send"
              className="board-button"
            />
          </form>
        </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
