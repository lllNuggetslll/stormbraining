import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBoards, refreshAllBoards, deleteBoard } from '../actions/index';
import io from 'socket.io-client';

import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { browserHistory } from 'react-router';

const container = {
  display: 'block',
  margin: '20px auto',
};

class BoardList extends Component {

  static propTypes = {
    allBoards: PropTypes.array.isRequired,
    getBoards: PropTypes.func.isRequired,
    refreshAllBoards: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderBoardListing = this.renderBoardListing.bind(this);
  }

  componentWillMount() {
    this.props.getBoards();
    this.socket = io();
    this.socket.on('board', (boardDoc) => {
      this.props.refreshAllBoards(boardDoc);
    });
  }

  onViewBoard(data) {
    browserHistory.push(`boards/${data.id}`);
  }

  deleteButton(data) {
    if (this.props.userId === data.authorId) {
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

  renderBoardListing(data) { // renders a single row of the list table
    return (
      <ListItem {...this.props}
        key={data.id}
        primaryText={data.title}
        onTouchTap={this.onViewBoard.bind(this, data)}
        rightIconButton={this.deleteButton(data)}
      />
    );
  }

  render() { // renders an entire table of boards
    return (
      <Paper style={container} zDepth={2}>
        <List
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          {this.props.allBoards.map(this.renderBoardListing)}
        </List>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBoards, refreshAllBoards, deleteBoard }, dispatch);
}

function mapStateToProps({ allBoards, auth }) {
  return { allBoards, userId: auth.profile.user_id };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
