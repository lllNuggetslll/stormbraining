import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newTimedIdea, pushTimedBoard } from '../actions/timed_board_actions';

import PushToBoard from './push_to_board';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class TimedIdeaInput extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    newTimedIdea: PropTypes.func.isRequired,
    pushTimedBoard: PropTypes.func.isRequired,
    timedBoard: PropTypes.object.isRequired,
    timeRemaining: PropTypes.number,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { term: '', open: false };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ ...this.state, term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term.length) {
      this.props.newTimedIdea(this.state.term, this.props.params.timed_board_id);
    }
    this.setState({ term: '', open: true });
  }

  handleRequestClose = () => {
    this.setState({ ...this.state, open: false });
  }

  render() {
    const isLoaded = this.props.timeRemaining !== null;
    const timeEnded = isLoaded && !this.props.timeRemaining;
    return (
      <div className="idea-input-container">
        <div style= {{ color: timeEnded ? this.context.muiTheme.palette.accent1Color : '' }}>
          Time Remaining: {isLoaded && moment(this.props.timeRemaining).format('mm:ss')}
          {
            timeEnded &&
            <p>Time is up! Select your favorite ideas and push them back to the board.</p>
          }
        </div>
        <form onSubmit={this.onFormSubmit}>
          <TextField
            hintText="Submit an idea"
            floatingLabelText="Great ideas start here..."
            value={this.state.term}
            onChange={this.onInputChange}
            disabled={this.props.timedBoard.completed || isLoaded && !this.props.timeRemaining}
            underlineFocusStyle={{ borderColor: this.context.muiTheme.palette.accent1Color }}
            floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
          />
          <RaisedButton
            type="submit"
            className="idea-button"
            label="Submit"
            disabled={this.props.timedBoard.completed || isLoaded && !this.props.timeRemaining}
          />
          <Snackbar
            open={this.state.open}
            message="Idea added"
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
            bodyStyle={{ backgroundColor: this.context.muiTheme.palette.primary3Color }}
          />
          <PushToBoard {...this.props} />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newTimedIdea, pushTimedBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(TimedIdeaInput);
