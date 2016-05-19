import React, { Component, PropTypes } from 'react';
import ChatList from './chat_list';
import Users from './users';
import io from 'socket.io-client';
import { addMessage } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlipMove from 'react-flip-move';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';

const buttonBefore = {
  marginLeft: '30px',
  marginTop: '5px',
  position: 'absolute',
};

const buttonAfter = {
  marginLeft: '355px',
  marginTop: '5px',
  position: 'absolute',
  zIndex: 9999,
};

export default class Chat extends Component {

  static propTypes = {
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    addMessage: PropTypes.func,
    chat: PropTypes.array,
    current: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: 'b',
      open: false,
      messageCount: 0,
      badgeDisplay: 'none',
      term: '',
      current: buttonBefore,
      users: [],
    };

    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', this.props.params.board_id);
      this.socket.on('message', () => {
        if (!this.state.open) {
          this.setState({ messageCount: this.state.messageCount += 1 });
          this.setState({ badgeDisplay: this.state.badgeDisplay = 'inline' });
        }
      });
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
      this.setState({ term: this.state.term = '' });
    }
  }

  handleChange(value) {
    this.setState({ ...this.state, value });
  }

  handleToggle() {
    this.setState({ badgeDisplay: this.state.badgeDisplay = 'none' });
    this.setState({ messageCount: this.state.messageCount = 0 });
    this.setState({ ...this.state, open: !this.state.open });
    if (this.state.current === buttonBefore) {
      this.setState({ current: this.state.current = buttonAfter });
    } else {
      this.setState({ current: this.state.current = buttonBefore });
    }
  }

  render() {
    return (
      <div>
        <FlipMove easing="linear" duration={150} staggerDurationBy={10}>
        <Badge
          style={this.state.current}
          badgeStyle={{
            backgroundColor: '#FFC107',
            marginTop: '15%',
            marginRight: '15%',
            width: '35%',
            height: '35%',
            display: this.state.badgeDisplay,
          }}
          badgeContent={<span style={{ fontSize: '2.2em' }}>{this.state.messageCount}</span>}
        >
        <FloatingActionButton
          secondary
          onTouchTap={this.handleToggle}
        >
          <ChatBubble />
        </FloatingActionButton>
      </Badge>
      </FlipMove>

        <Drawer
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ ...this.state, open })}
          children={
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label={`Users (${this.state.users.length})`} value="a" >
                <div>
                  <Users {...this.props} />
                </div>
              </Tab>
              <Tab label="Chat" value="b">
                <ChatList {...this.props} />
                <div
                  style={{
                    position: 'fixed',
                    bottom: '0px',
                    backgroundColor: '#90A4AE',
                    width: '400px',
                    paddingLeft: '25px',
                    paddingBottom: '0px',
                    marginTop: '50px',
                    height: '120px',
                  }}
                >
                  <form onSubmit={this.onChatSubmit}>
                    <TextField
                      style={{ paddingTop: '35px' }}
                      inputStyle={{ color: '#fff' }}
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
              </Tab>
            </Tabs>
          }
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(Chat);
