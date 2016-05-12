import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import X from 'material-ui/svg-icons/content/clear';
import { CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { addComment, deleteComment } from '../actions/index';

class Comments extends Component {

  static propTypes = {
    addComment: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    comments: PropTypes.array,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
    authorId: PropTypes.string,
    joined: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { input: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.input, this.props.userName, this.props.id, this.props.boardId);
    this.setState({ input: '' });
  }

  deleteComment(data) {
    // commentId, ideaId, boardId
    this.props.deleteComment(data.id, data.ideaId, this.props.boardId);
  }

  renderComments(data) {
    // TODO: Refactor delete button to avoid bind
    if (this.props.userId === data.authorId && this.props.joined) {
      return (
        <div key={data.id}>
          <span style={{ position: 'relative', top: '-5px' }}>
            <span style={{ color: '#BDBDBD', paddingRight: '15px' }}>{data.authorName} </span>
            {data.content}
          </span>
          <IconButton onClick={this.deleteComment.bind(this, data)} >
            <X />
          </IconButton>
        </div>
      );
    }
    return (
      <p key={data.id}>
        <span style={{ position: 'relative', top: '-5px' }}>
          <span style={{ color: '#BDBDBD', paddingRight: '15px' }}>{data.authorName} </span>
          {data.content}
        </span>
      </p>
    );
  }

  render() {
    if (this.props.joined) {
      return (
        <CardText expandable>
          {this.props.comments.map(this.renderComments)}
          <form onSubmit={this.onFormSubmit}>
            <span style={{
              width: '75%',
              display: 'inline-block' }}
            >
              <TextField
                fullWidth
                hintText={'Type your comment here'}
                floatingLabelText="Add a comment"
                value={this.state.input}
                onChange={this.onInputChange}
              />
            </span>
            <span>
              <RaisedButton
                type="submit"
              >
              Submit
              </RaisedButton>
            </span>
          </form>
        </CardText>
      );
    }
    return (
      <CardText expandable>
        {this.props.comments.map(this.renderComments)}
      </CardText>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, deleteComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);
