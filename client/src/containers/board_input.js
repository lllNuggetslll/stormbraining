import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newBoard } from '../actions/index';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class BoardInput extends Component {

  static propTypes = {
    newBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { board: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ board: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.newBoard(this.state.board, this.props.userId);
    this.setState({ board: '' });
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
        />
        <RaisedButton
          type="submit"
          className="board-button"
        >
          Submit
        </RaisedButton>
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
