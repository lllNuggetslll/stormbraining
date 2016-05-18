import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMessages, addMessage } from '../actions/index';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';

import { grey400, darkBlack, bold } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import './styles/main.scss';

class ChatList extends Component {

  static propTypes = {
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    addMessage: PropTypes.func,
    chat: PropTypes.array,
    messageCount: PropTypes.number,
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
          this.socket.emit('subscribe', this.props.params.board_id);
          this.socket.on('message', () => {
            this.props.getMessages(this.props.params.board_id);
          });
        });
      });
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  componentWillUnmount() {
    this.socket.emit('unsubscribe', this.props.params.board_id);
    this.socket.disconnect();
  }

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
        <ListItem key={data.id}
          style={{
            margin: '5px 5px 1px 5px',
            padding: '8px 10px 5px 10px',
          }}
          className={'bubble'}
          primaryText={
            <p>
              <span style={{ color: darkBlack, text: bold }}><strong>{data.userName}</strong></span>
              <span style={{ color: grey400 }}>  {moment(data.createdAt).startOf('hour').fromNow().toString()}</span>
              <br />
              <br />
              {data.message}
            </p>
          }
          disabled={true}
        />
    );
  }

  render() {
    return (
      <div style={{ overflowY: 'scroll', maxHeight: '850px' }}>
        <div>
          <List>
            <Subheader>Active Users</Subheader>
            <div>
              {this.props.chat.map(this.renderChats)}
            </div>
          </List>
      </div>
      <div style={{ position: 'fixed', bottom: '0' }}>
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
