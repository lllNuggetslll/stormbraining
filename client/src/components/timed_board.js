import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTimedBoard, clearTimedBoardView } from '../actions/timed_board_actions';
import AppBar from 'material-ui/AppBar';

import Paper from 'material-ui/Paper';
import { paper } from './app.js';
import TimedIdeaInput from '../containers/timed_idea_input';
import TimedIdeaList from '../containers/timed_idea_list';
import CircularProgress from 'material-ui/CircularProgress';

class TimedBoard extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getTimedBoard: PropTypes.func.isRequired,
    clearTimedBoardView: PropTypes.func.isRequired,
    timedBoard: PropTypes.object.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const timeRemaining = this.props.timedBoard.completed ? 0 : this.props.timedBoard.timerLength;
    this.state = { timeRemaining };
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this.props.getTimedBoard(this.props.params.timed_board_id);
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    this.props.clearTimedBoardView();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  tick() {
    if (this.props.timedBoard.completed) {
      clearInterval(this.interval);
      this.setState({ timeRemaining: 0 });
    } else {
      const timeEnd = Date.parse(this.props.timedBoard.createdAt) + this.props.timedBoard.timerLength + 1500;
      const timeNow = new Date().getTime();
      const timeRemaining = timeEnd > timeNow ? timeEnd - timeNow : 0;
      this.setState({ timeRemaining });
    }
  }

  renderLoadingOrComplete() {
    if (this.props.timedBoard.isLoading) {
      return (
        <CircularProgress
          style={{ ...paper, marginTop: '150px' }}
          color={this.context.muiTheme.palette.accent1Color}
          size={3}
        />
      );
    }
    return (
      <Paper style={paper} zDepth={0}>
        <TimedIdeaInput {...this.props} timeRemaining={this.state.timeRemaining}/>
        <TimedIdeaList {...this.props} />
      </Paper>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title={
            <span style={{ color: this.context.muiTheme.palette.textColor }}>
              {this.props.timedBoard.title}
            </span>
          }
          iconElementLeft={<div />}
          zDepth={3}
          style={{ backgroundColor: this.context.muiTheme.palette.primary3Color, textAlign: 'center' }}
        />
        {this.renderLoadingOrComplete()}
      </div>
    );
  }
}

function mapStateToProps({ timedBoard }) {
  return { timedBoard };
}

export default connect(mapStateToProps, { getTimedBoard, clearTimedBoardView })(TimedBoard);
