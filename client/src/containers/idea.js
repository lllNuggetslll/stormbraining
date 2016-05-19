import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upVote, unVote, getOneBoard, deleteIdea, branchIdeaToBoard } from '../actions/index';
import { browserHistory } from 'react-router';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Branch from 'material-ui/svg-icons/communication/call-split';
import IconButton from 'material-ui/IconButton';

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

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderVote = this.renderVote.bind(this);
    this.renderDeleteIdea = this.renderDeleteIdea.bind(this);
    this.branch = this.branch.bind(this);
  }

  voteButton() {
    if (this.props.joined) {
      const upvotedColor = (this.props.upvotes.indexOf(this.props.userId) !== -1) ? this.context.muiTheme.palette.accent1Color : '';
      return (
        <IconButton
          onClick={this.renderVote}
          touch
          tooltipPosition="bottom-center"
        >
          <ThumbsUp color={upvotedColor} hoverColor={this.context.muiTheme.palette.accent1Color} />
        </IconButton>
      );
    }
  }

  deleteButton() {
    if (this.props.userId === this.props.authorId && this.props.joined) {
      return (
        <IconButton
          onClick={this.renderDeleteIdea}
          tooltip="delete idea"
          touch
          tooltipPosition="bottom-center"
        >
          <DeleteForever hoverColor={this.context.muiTheme.palette.accent1Color} />
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
    const grayIfNotJoined = joined ? {} : { color: this.context.muiTheme.palette.disabledColor };
    return (
      <div className="cardHolder" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          paddingLeft: '16px',
          paddingTop: '4px',
          boxSizing: 'border-box',
          zIndex: '999' }}
        >
          <span >
          <IdeaEditInput {...this.props} />
          {this.deleteButton()}
          </span>
          </div>
          <div style={{
            position: 'absolute',
            display: 'inline-block',
            paddingRight: '16px',
            paddingTop: '4px',
            boxSizing: 'border-box',
            right: '0px',
            zIndex: '999' }}
          >
          <span>
          <IconButton
            onClick={this.branch}
            tooltip="make a board from this idea"
            tooltipPosition="bottom-center"
          >
          <Branch hoverColor={this.context.muiTheme.palette.accent1Color}/>
          </IconButton>
          {this.voteButton()}
          <span style={{ position: 'relative', top: '-5px' }}>{this.props.upvotes.length}</span>
          </span>
        </div>
        <Card style={{ ...grayIfNotJoined, textAlign: 'left', paddingTop: '10px' }} zDepth={2}>
          <CardHeader
            title={<span>&nbsp;</span>}
            subtitle={
              <span>{this.props.comments.length} comments </span>
            }
            actAsExpander
          />
          <CardText
            expandable
            style={{ textAlign: 'center' }}
          >
            <Comments {...this.props} userId={userId} joined={joined} userName={userName} />
          </CardText>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upVote, unVote, getOneBoard, deleteIdea, branchIdeaToBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(Idea);
