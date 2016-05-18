import React, { Component, PropTypes } from 'react';
import Email from './email';
import CopyToClipBoard from 'react-copy-to-clipboard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';


class Invite extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    board: PropTypes.object.isRequired,
    joined: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { term: '', open: false, value: `https://storm-braining.herokuapp.com/boards/${this.props.params.board_id}` };

    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
  }

  onCopyToClipboard(e) {
    console.log('COPIED', e);
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
          label="Invite Collaborators"
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
      </span>
    );
  }
}

export default Invite;
