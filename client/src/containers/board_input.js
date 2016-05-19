import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newBoard } from '../actions/index';

import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class BoardInput extends Component {

  static propTypes = {
    newBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { board: '', open: false };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ ...this.state, board: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.newBoard(this.state.board);
    this.setState({ board: '', open: true });
  }

  handleRequestClose = () => {
    this.setState({ ...this.state, open: false });
  }

  render() {
    return (
      <div className="board-input-container">
      <form onSubmit={this.onFormSubmit}>
        <TextField
          hintText="Name your brainstorm"
          floatingLabelText="Create a new brainstorm"
          value={this.state.board}
          onChange={this.onInputChange}
          className="board-input"
          underlineFocusStyle={{ borderColor: this.context.muiTheme.palette.accent1Color }}
          floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
        />
        <Snackbar
          open={this.state.open}
          message="Brainstorm created"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: this.context.muiTheme.palette.primary3Color }}
        />
        <RaisedButton
          type="submit"
          className="board-button"
          label="Submit"
        />
      </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newBoard }, dispatch);
}

function mapStateToProps({ auth }) {
  return { userId: auth.profile.user_id };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardInput);
