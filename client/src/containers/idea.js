import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upVote, unVote, getOneBoard, deleteIdea } from '../actions/index';

import { CardHeader } from 'material-ui/Card';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';

import IdeaEditInput from '../containers/idea_edit_input';

class Idea extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    upvotes: PropTypes.array.isRequired,
    boardId: PropTypes.string.isRequired,
    getOneBoard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    unVote: PropTypes.func.isRequired,
    deleteIdea: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderVote = this.renderVote.bind(this);
    // this.showCommentForm = this.showCommentForm.bind(this);
    this.renderDeleteIdea = this.renderDeleteIdea.bind(this);
  }

  voteButton() {
    if (this.props.upvotes.indexOf(this.props.userId) !== -1) {
      return (
        <IconButton
          onClick={this.renderVote}
        >
          <ThumbsUp color={'#8BC34A'} />
        </IconButton>
      );
    }
    return (
      <IconButton
        onClick={this.renderVote}
      >
        <ThumbsUp hoverColor={'#8BC34A'} />
      </IconButton>
    );
  }

  deleteButton() {
    if (this.props.userId === this.props.authorId) {
      return (
        <IconButton
          onClick={this.renderDeleteIdea}
          style={{ float: 'left' }}
        >
          <DeleteForever />
        </IconButton>
      );
    }
  }

  renderDeleteIdea() {
    if (this.props.userId === this.props.authorId) {
      this.props.deleteIdea(this.props.boardId, this.props.id);
    }
  }

  renderVote() {
    if (this.props.upvotes.indexOf(this.props.userId) !== -1) {
      this.props.unVote(this.props.boardId, this.props.id);
    } else {
      this.props.upVote(this.props.boardId, this.props.id);
    }
  }

  render() {
    return (
      <CardHeader
        actAsExpander={true}
        showExpandableButton={true}
      >
        <IdeaEditInput {...this.props} />
        {this.deleteButton()}
        <span style={{ float: 'right' }}>
          {this.props.upvotes.length} upvotes
          {this.voteButton()}
        </span>
      </CardHeader>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upVote, unVote, getOneBoard, deleteIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(Idea);
