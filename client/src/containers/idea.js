import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upVote, unVote, getOneBoard, deleteIdea, branchIdeaToBoard } from '../actions/index';
import { browserHistory } from 'react-router';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Input from 'material-ui/svg-icons/action/input';
import IconButton from 'material-ui/IconButton';
import { cyan500, pink500 } from 'material-ui/styles/colors';

import IdeaEditInput from '../containers/idea_edit_input';
import Comments from './comments';

class Idea extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    upvotes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    boardId: PropTypes.string.isRequired,
    getOneBoard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    unVote: PropTypes.func.isRequired,
    deleteIdea: PropTypes.func.isRequired,
    joined: PropTypes.bool.isRequired,
    branchIdeaToBoard: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderVote = this.renderVote.bind(this);
    this.renderDeleteIdea = this.renderDeleteIdea.bind(this);
    this.branch = this.branch.bind(this);
  }

  voteButton() {
    if (this.props.joined) {
      const upvotedColor = (this.props.upvotes.indexOf(this.props.userId) !== -1) ? cyan500 : '';
      return (
        <IconButton
          onClick={this.renderVote}
          touch
          tooltipPosition="bottom-center"
        >
          <ThumbsUp color={upvotedColor} hoverColor={cyan500} />
        </IconButton>
      );
    }
  }

  deleteButton() {
    if (this.props.userId === this.props.authorId && this.props.joined) {
      return (
        <IconButton
          onClick={this.renderDeleteIdea}
          style={{ float: 'left' }}
          tooltip="delete idea"
          touch
          tooltipPosition="bottom-center"
        >
          <DeleteForever hoverColor={pink500} />
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

  branch() {
    this.props.branchIdeaToBoard(this.props.content)
      .then((action) => {
        browserHistory.push('/boards');
        browserHistory.push(`/boards/${action.payload.data.board.id}`);
      });
  }

  render() {
    const userId = this.props.userId;
    const userName = this.props.userName;
    const joined = this.props.joined;
    const grayIfNotJoined = joined ? {} : { color: '#9E9E9E' };
    return (
      <Card style={grayIfNotJoined}>
        <CardHeader
          actAsExpander showExpandableButton
          style={{ paddingBottom: '0px' }}
        />
        <CardHeader style={{ paddingTop: '0px', paddingBottom: '40px' }}>
          <IdeaEditInput {...this.props} />
          {this.deleteButton()}
          <div style={{ float: 'right' }}>
            <IconButton
              onClick={this.branch}
              hoverColor={cyan500}
              tooltip="steal this idea"
              touch
              tooltipPosition="bottom-center"
            >
              <Input />
            </IconButton>
            <span style={{ position: 'relative', top: '-5px' }}>{this.props.comments.length} comments </span>
            {this.voteButton()}
            <span style={{ position: 'relative', top: '-5px' }}>{this.props.upvotes.length}</span>
          </div>
        </CardHeader>
        <CardText expandable>
          <Comments {...this.props} userId={userId} joined={joined} userName={userName} />
        </CardText>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upVote, unVote, getOneBoard, deleteIdea, branchIdeaToBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Idea);
