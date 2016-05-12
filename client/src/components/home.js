import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, deleteBoard } from '../actions/index';

import BoardInput from '../containers/board_input';
import { Table, TableHeader, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderBoardListing = this.renderBoardListing.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
  }

  componentWillUnmount() {
  }

  deleteButton(data) {
    if (this.props.user.id === data.authorId) {
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

  renderBoardListing(data) {
    return (
      <TableRow {...this.props} key={data.id}>
        <TableRowColumn>{data.title}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            label="View"
            linkButton
            href={`boards/${data.id}`}
            primary
          />
        </TableRowColumn>
        <TableRowColumn>{this.deleteButton(data)}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.props.user.name}!</h1>
        <BoardInput />
        <div>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableRowColumn><h3>Your Boards</h3></TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.user.authoredBoards.map(this.renderBoardListing)}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableRowColumn><h3>Boards You Have Joined</h3></TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.user.boards.map(this.renderBoardListing)}
            </TableBody>
          </Table>
        </div>
      </div>
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

