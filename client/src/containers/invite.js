import React, { Component, PropTypes } from 'react';
import Email from './email';
import CopyToClipBoard from 'react-copy-to-clipboard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import './styles/main.scss';


class Invite extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    board: PropTypes.object.isRequired,
    joined: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { term: '',
      snackbar: false,
      open: false,
      value: `https://storm-braining.herokuapp.com/boards/${this.props.params.board_id}` };

    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
  }

  onCopyToClipboard() {
    this.setState({ snackbar: true });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleRequestClose = () => {
    this.setState({ snackbar: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <Email {...this.props} />,
      <CopyToClipBoard
        text={this.state.value}
        onCopy={this.onCopyToClipboard}
      >
      <FlatButton
        label="Copy to clipboard"
      />
      </CopyToClipBoard>,
    ];
    return (
      <span>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Invite"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Invite to board"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <br />
          {this.state.value}
          <br />
        </Dialog>
        <Snackbar
          open={this.state.snackbar}
          message="Copied to clipboard"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: this.context.muiTheme.palette.primary3Color }}
        />
      </span>
    );
  }
}

export default Invite;
