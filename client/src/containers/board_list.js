import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getBoards, refreshAllBoards, deleteBoard } from '../actions/index';
import io from 'socket.io-client';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class BoardList extends Component {

  static propTypes = {
    allBoards: PropTypes.array.isRequired,
    getBoards: PropTypes.func.isRequired,
    refreshAllBoards: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

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

  deleteButton(data) {
    if (this.props.userId === data.authorId) {
      return (
        <RaisedButton
          onTouchTap={this.renderDeleteBoard.bind(this, data)}
          label="Delete"
        />
      );
    }
  }

  renderDeleteBoard(data) {
    this.props.deleteBoard(data.id);
  }

  renderBoardListing(data) { // renders a single row of the list table
    return (
        <TableRow {...this.props} key={data.id}>
          <TableRowColumn />
          <TableRowColumn>
            {data.title}
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton
              label="View"
              linkButton
              href={`boards/${data.id}`}
              primary
            />
          </TableRowColumn>
          <TableRowColumn>
            {this.deleteButton(data)}
          </TableRowColumn>
          <TableRowColumn />
        </TableRow>
    );
  }

  render() { // renders an entire table of boards
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
          {this.props.allBoards.map(this.renderBoardListing)}
        </TableBody>
      </Table>
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
