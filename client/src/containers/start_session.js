import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './styles/main.scss';

class StartSession extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    newTimedBoard: PropTypes.func.isRequired,
    board: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { timerLength: 15, open: false };
    this.onStart = this.onStart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onStart() {
    this.handleClose();
    const title = `${this.props.board.title} > ${this.state.timerLength} min`;
    this.props.newTimedBoard(title, this.state.timerLength * 60000, Date.now(), this.props.params.board_id)
      .then((action) => {
        browserHistory.push(`/timed/${action.payload.data.board.id}`);
      });
  }

  handleChange(event, index, timerLength) {
    this.setState({ ...this.state, timerLength });
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  }

  handleClose = () => {
    this.setState({ timerLength: 15, open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        onTouchTap={this.onStart}
      />,
    ];

    return (
      <span>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Timer"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Start a Timed Session"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Length of Session (Minutes):
          <DropDownMenu value={this.state.timerLength} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={15} primaryText="15" />
            <MenuItem value={20} primaryText="20" />
            <MenuItem value={30} primaryText="30" />
            <MenuItem value={45} primaryText="45" />
            <MenuItem value={60} primaryText="60" />
          </DropDownMenu>
          <br />
          Brain hard in the time limit and push your favorite ideas back to this board!
        </Dialog>
      </span>
    );
  }
}

export default StartSession;
