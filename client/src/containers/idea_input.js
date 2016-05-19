import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newIdea, joinBoard, leaveBoard } from '../actions/index';
import { newTimedBoard } from '../actions/timed_board_actions';
import Invite from './invite';
import StartSession from './start_session';

import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class IdeaInput extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    newIdea: PropTypes.func.isRequired,
    joinBoard: PropTypes.func.isRequired,
    leaveBoard: PropTypes.func.isRequired,
    newTimedBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    board: PropTypes.object.isRequired,
    joined: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { term: '', open: false };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onJoinBoard = this.onJoinBoard.bind(this);
    this.onLeaveBoard = this.onLeaveBoard.bind(this);
  }

  onInputChange(event) {
    this.setState({ ...this.state, term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term.length) {
      this.props.newIdea(this.state.term, this.props.params.board_id);
    }

    this.setState({ term: '', open: true });
  }

  onJoinBoard() {
    this.props.joinBoard(this.props.board.id);
  }

  onLeaveBoard() {
    this.props.leaveBoard(this.props.board.id);
  }

  handleRequestClose() {
    this.setState({ ...this.state, open: false });
  }

  renderInviteOrLeave() {
    if (this.props.board.authorId === JSON.parse(localStorage.profile).user_id) {
      return <Invite {...this.props} />;
    }
    return (
      <RaisedButton
        type="button"
        className="idea-button"
        label="Leave Board"
        onTouchTap={this.onLeaveBoard}
      />
    );
  }

  render() {
    if (this.props.joined) {
      return (
        <div className="idea-input-container">
          <form onSubmit={this.onFormSubmit}>
            <TextField
              hintText="Submit an idea"
              floatingLabelText="Great ideas start here..."
              value={this.state.term}
              onChange={this.onInputChange}
              underlineFocusStyle={{ borderColor: this.context.muiTheme.palette.accent1Color }}
              floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
              fullWidth
              style={{ width: '50%' }}
            />
            <RaisedButton
              type="submit"
              className="idea-button"
              label="Submit"
            />
            <Snackbar
              open={this.state.open}
              message="Idea added"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
              bodyStyle={{ backgroundColor: this.context.muiTheme.palette.primary3Color }}
            />
            {this.renderInviteOrLeave()}
            <StartSession {...this.props} />
          </form>
        </div>
      );
    }
    return (
      <div className="idea-input-container">
        <span>You have not joined this board. Would you like to join?</span>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Join Board"
          onTouchTap={this.onJoinBoard}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newIdea, joinBoard, leaveBoard, newTimedBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaInput);
