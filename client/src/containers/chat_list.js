import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../actions/index';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';

import { grey400, darkBlack, bold } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import './styles/main.scss';

class ChatList extends Component {

  static propTypes = {
    params: PropTypes.object,
    getMessages: PropTypes.func,
    board: PropTypes.object,
    chat: PropTypes.array,
    messageCount: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.renderChats = this.renderChats.bind(this);
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

  renderChats(data) {
    let color = '#F2F2F2';
    let textColor = 'grey400';
    const timeCreated = moment(data.createdAt).startOf('hh').fromNow().toString();
    if (JSON.parse(localStorage.profile).name === data.userName) {
      color = '#F8BBD0';
      textColor = '#f176a0';
    }

    return (
        <ListItem key={data.id}
          className={'bubble'}
          style={{
            margin: '5px 5px 1px 5px',
            padding: '8px 10px 5px 10px',
            backgroundColor: color,
          }}
          primaryText={
            <p>
              <span style={{ color: darkBlack, text: bold }}><strong>{data.userName}</strong></span>
              <span style={{ color: textColor }}> {timeCreated}</span>
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
        <List>
          <div>
            {this.props.chat.map(this.renderChats)}
          </div>
        </List>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMessages }, dispatch);
}

function mapStateToProps({ board, chat }) {
  return { board, chat };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
