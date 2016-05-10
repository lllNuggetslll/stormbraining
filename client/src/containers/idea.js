import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upVote, unVote, getOneBoard, deleteIdea } from '../actions/index';

import IdeaEditInput from '../containers/idea_edit_input';

class Idea extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    upvotes: PropTypes.array.isRequired,
    boardId: PropTypes.string.isRequired,
    getOneBoard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    unVote: PropTypes.func.isRequired,
    deleteIdea: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderVote = this.renderVote.bind(this);
    this.renderDeleteIdea = this.renderDeleteIdea.bind(this);
  }

  voteButton() {
    if (this.props.upvotes.indexOf(this.props.userId) !== -1) {
      return (
        <button
          onClick={this.renderVote}
          className="btn btn-warning"
        >
          Un-vote
        </button>
      );
    }
    return (
      <button
        onClick={this.renderVote}
        className="btn btn-success"
      >
        Upvote
      </button>
    );
  }

  renderDeleteIdea() {
    this.props.deleteIdea(this.props.boardId, this.props.id);
  }

  renderVote() {
    if (this.props.upvotes.indexOf(this.props.userId) !== -1) {
      this.props.unVote(this.props.boardId, this.props.id, this.props.userId);
    } else {
      this.props.upVote(this.props.boardId, this.props.id, this.props.userId);
    }
  }

  render() {
    return (
      <tr>
        <IdeaEditInput {...this.props} />
        <td>
          {this.props.upvotes.length}
        </td>
        <td>
          {this.voteButton()}
        </td>
        <td>
          <button
            onClick={this.renderDeleteIdea}
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
  return bindActionCreators({ upVote, unVote, getOneBoard, deleteIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(Idea);
