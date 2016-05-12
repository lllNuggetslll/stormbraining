import React, { Component, PropTypes } from 'react';
import ChatList from './chat_list';
import Users from './users';

import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

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
      value: 'a',
      open: false,
    };
  }

  handleChange = (value) => {
    this.setState({ ...this.state, value });
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <RaisedButton
          label="Chat"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
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
