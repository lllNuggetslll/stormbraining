import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getOneBoard, refreshBoardView, clearBoardView } from '../actions/index';
import io from 'socket.io-client';

import IdeaInput from '../containers/idea_input';
import IdeaList from '../containers/idea_list';

class Ideas extends Component {

  static propTypes = { // this seems to be the preferred set-up
    params: PropTypes.object,
    getOneBoard: PropTypes.func,
    refreshBoardView: PropTypes.func,
    clearBoardView: PropTypes.func,
    board: PropTypes.object,
  }

  componentWillMount() {
    this.props.getOneBoard(this.props.params.board_id)
      .then(() => {
        this.socket = io();
        this.socket.on('connect', () => {
          this.socket.emit('subscribe', this.props.board.id);
        });
        this.socket.on('idea', (ideaDoc) => {
          this.props.refreshBoardView(ideaDoc);
        });
      });
  }

  componentWillUnmount() {
    this.socket.emit('unsubscribe', this.props.board.id);
    this.props.clearBoardView();
  }

  render() {
    if (!this.props.board) {
      return <div>Thinking...</div>;
    }
    return (
      <div>
        <h2>Topic: {this.props.board.title}</h2>
        <IdeaInput {...this.props} />
        <IdeaList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps({ board, auth }) {
  return { board, userId: auth.profile.user_id };
}

export default connect(mapStateToProps, { getOneBoard, refreshBoardView, clearBoardView })(Ideas);
