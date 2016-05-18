import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../actions/index';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';

class Email extends Component {

  static propTypes = {
    params: PropTypes.object,
    board: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = { open: false, term: '' };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }


  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    sendEmail(this.state.term,
      this.props.board.title,
      JSON.parse(localStorage.profile).name,
      `https://storm-braining.herokuapp.com/boards/${this.props.params.board_id}`);
    this.setState({ term: '', open: false });
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <span>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Email"
        />
        <Popover
          style={{ padding: '5px', width: '25%' }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              style={{ padding: '10px', height: '100px' }}
              floatingLabelText="e.g., johndoe@gmail.com, user@user.com - separate with commas"
              hintText="Insert emails"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <RaisedButton
              style={{ margin: '10px' }}
              type="submit"
              label="Submit"
            />
          </form>
        </Popover>
      </span>
    );
  }
}

export default connect(null, { sendEmail })(Email);
