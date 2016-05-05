import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getBoards, refreshAllBoards, deleteBoard } from '../actions/index';
import io from 'socket.io-client';

class BoardList extends Component {

  static propTypes = {
    allBoards: PropTypes.array.isRequired,
    getBoards: PropTypes.func.isRequired,
    refreshAllBoards: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getBoards();
    this.socket = io();
    this.socket.on('board', (boardDoc) => {
      this.props.refreshAllBoards(boardDoc);
    });
  }

  renderDeleteBoard(data) {
    this.props.deleteBoard(data.id);
  }

  renderBoardListing(data) { // renders a single row of the list table
    return (
      <tr {...this.props} key={data.id}>
        <td>
        {data.title}
          <Link to={`boards/${data.id}` } className="btn btn-secondary">
            View
          </Link>
        </td>
        <td>
          <button
            onClick={this.renderDeleteBoard.bind(this, data)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  render() { // renders an entire table of boards
    return (
      <table className="table table-hover">
        <tbody clasName="col-xs-12">
          {this.props.allBoards.map(this.renderBoardListing.bind(this))}
        </tbody>
      </table>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBoards, refreshAllBoards, deleteBoard }, dispatch);
}

function mapStateToProps({ allBoards }) {
  return { allBoards };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
