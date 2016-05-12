import React, { Component, PropTypes } from 'react';
import ChatList from './chat_list';
import Users from './users';

import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';

const style = {
  float: 'left',
  position: 'relative',
  marginLeft: '1%',
};

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(value) {
    this.setState({ ...this.state, value });
  }

  handleToggle() {
    this.setState({ ...this.state, open: !this.state.open });
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          style={style}
          onTouchTap={this.handleToggle}
        >
        <ChatBubble />
        </FloatingActionButton>
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
