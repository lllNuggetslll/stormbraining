import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upVote, getOneBoard, deleteIdea } from '../actions/index';

class Idea extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    boardId: PropTypes.string.isRequired,
    getOneBoard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    deleteIdea: PropTypes.func.isRequired,
  }

  renderUpvote() {
    this.props.upVote(this.props.boardId, this.props.id);
  }

  renderDeleteIdea() {
    this.props.deleteIdea(this.props.boardId, this.props.id);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.content}
        </td>
        <td>
          {this.props.upvotes}
        </td>
        <td>
          <button
            onClick={this.renderUpvote.bind(this)}
            className="btn btn-success"
          >
            Upvote
          </button>
        </td>
        <td>
          <button
            onClick={this.renderDeleteIdea.bind(this)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upVote, getOneBoard, deleteIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(Idea);
