import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, deleteBoard } from '../actions/index';
import { deleteTimedBoard } from '../actions/timed_board_actions';

import BoardInput from '../containers/board_input';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { paper } from './app.js';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

const container = {
  display: 'block',
  margin: '20px auto',
};

class Home extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    deleteTimedBoard: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { timeRemaining: [] };
    this.tick = this.tick.bind(this);
    this.renderBoardListing = this.renderBoardListing.bind(this);
    this.renderTimedSessions = this.renderTimedSessions.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const timeRemaining = this.props.user.timedBoards.map(board => {
      const end = board.createdAt + board.timerLength + 1500;
      const now = new Date().getTime();
      const remaining = end > now ? end - now : 0;
      return remaining;
    });
    this.setState({ timeRemaining });
  }

  onViewBoard(data, isTimed) {
    const rootUrl = isTimed ? 'timed' : 'boards';
    browserHistory.push(`${rootUrl}/${data.id}`);
  }

  deleteButton(data) {
    if (this.props.user.id === data.authorId) {
      return (
        <IconButton
          onTouchTap={this.renderDeleteBoard.bind(this, data)}
          tooltip="Delete board"
          touch
          tooltipPosition="bottom-center"
          label="Delete"
        >
          <DeleteForever hoverColor={this.context.muiTheme.palette.accent1Color} />
        </IconButton>
      );
    }
  }

  renderDeleteBoard(data) {
    if (data.timerLength > 0) {
      this.props.deleteTimedBoard(data.id);
    } else {
      this.props.deleteBoard(data.id);
    }
  }

  renderBoardListing(data, i) {
    const isTimed = data.timerLength > 0;
    const isLoaded = !!this.state.timeRemaining.length;
    const timeEnded = data.createdAt + data.timerLength < Date.now();
    const timeDisplay = isLoaded ? moment(this.state.timeRemaining[i]).format('mm:ss') : '';
    const timedStatus = timeEnded ? 'Not Pushed' : `Time Remaining: ${timeDisplay}`;
    return (
      <ListItem {...this.props}
        key={data.id}
        primaryText={data.title}
        secondaryText={isTimed ? timedStatus : ''}
        onTouchTap={this.onViewBoard.bind(this, data, isTimed)}
        rightIconButton={this.deleteButton(data)}
      />
    );
  }

  renderTimedSessions() {
    if (this.props.user.timedBoards.length) {
      return (
        <Paper style={container} zDepth={2}>
        <List
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <Subheader style={{ color: this.context.muiTheme.palette.accent1Color }}>Your Timed Sessions</Subheader>
          {this.props.user.timedBoards.map(this.renderBoardListing)}
        </List>
        </Paper>
      );
    }
  }

  render() {
    if (this.props.user.isLoading) {
      return (
        <CircularProgress
          size={3}
          style={{ ...paper, marginTop: '200px' }}
          color={this.context.muiTheme.palette.accent1Color}
        />
      );
    }
    return (
      <Paper style={paper} zDepth={0}>
        <Paper zDepth={0}>
          <h1>Welcome, {this.props.user.name || this.props.user.nickname}!</h1>
          <BoardInput />
        </Paper>
        <Paper style={container} zDepth={2}>
        <List
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <Subheader style={{ color: this.context.muiTheme.palette.accent1Color }}>Your Boards</Subheader>
          {this.props.user.authoredBoards.map(this.renderBoardListing)}
        </List>
        </Paper>
        <Paper style={container} zDepth={2}>
        <List
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <Subheader style={{ color: this.context.muiTheme.palette.accent1Color }}>Boards You Have Joined</Subheader>
          {this.props.user.boards.map(this.renderBoardListing)}
        </List>
        </Paper>
        {this.renderTimedSessions()}
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, deleteBoard, deleteTimedBoard }, dispatch);
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
