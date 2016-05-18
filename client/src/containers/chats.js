import React, { Component, PropTypes } from 'react';
import ChatList from './chat_list';
import Users from './users';
import io from 'socket.io-client';

import Badge from 'material-ui/Badge';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';

export default class Chat extends Component {

  static propTypes = {
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    addMessage: PropTypes.func,
    chat: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'b',
      open: false,
      messageCount: 0,
      badgeDisplay: 'none',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
  }

  componentWillUnmount() {
    this.socket.emit('unsubscribe', this.props.params.board_id);
    this.socket.disconnect();
  }

  handleChange(value) {
    this.setState({ ...this.state, value });
  }

  handleToggle() {
    this.setState({ badgeDisplay: this.state.badgeDisplay = 'none' });
    this.setState({ messageCount: this.state.messageCount = 0 });
    this.setState({ ...this.state, open: !this.state.open });
  }

  render() {
    return (
      <div>
        <Badge
          style={{
            marginLeft: '3%',
            marginTop: '1.5%',
            position: 'absolute',
          }}
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
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ ...this.state, open })}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Users" value="a" >
              <div>
                <Users {...this.props} />
              </div>
            </Tab>
            <Tab label="Chat" value="b">
              <div>
                <ChatList {...this.props} />
              </div>
            </Tab>
          </Tabs>
        </Drawer>
      </div>
    );
  }
}
