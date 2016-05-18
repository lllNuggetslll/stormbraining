import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, deleteBoard } from '../actions/index';

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
    user: PropTypes.object.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderBoardListing = this.renderBoardListing.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
  }

  onViewBoard(data) {
    browserHistory.push(`boards/${data.id}`);
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
    this.props.deleteBoard(data.id);
  }

  renderBoardListing(data) {
    return (
      <ListItem {...this.props}
        key={data.id}
        primaryText={data.title}
        onTouchTap={this.onViewBoard.bind(this, data)}
        rightIconButton={this.deleteButton(data)}
      />
    );
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
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, deleteBoard }, dispatch);
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
