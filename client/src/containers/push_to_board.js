import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class PushToBoard extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    timedBoard: PropTypes.object.isRequired,
    pushTimedBoard: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onPush = this.onPush.bind(this);
  }

  onPush() {
    this.handleClose();
    this.props.pushTimedBoard(this.props.params.timed_board_id)
      .then(() => {
        browserHistory.push(`/boards/${this.props.timedBoard.boardId}`);
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        onTouchTap={this.onPush}
      />,
    ];

    return (
      <span>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Push to Board"
          onTouchTap={this.handleOpen}
          disabled={this.props.timedBoard.completed}
        />
        <Dialog
          title="Push Ideas Back to Original Board"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <br />
          This will end your session and push your selected ideas back to the original board.
          Are you sure?
          <br />
        </Dialog>
      </span>
    );
  }
}

export default PushToBoard;
