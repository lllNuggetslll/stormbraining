import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import X from 'material-ui/svg-icons/content/clear';
import { CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


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

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
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
    if (this.state.input) {
      this.props.addComment(this.state.input, this.props.userName, this.props.id, this.props.boardId);
    }
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
          <IconButton 
            onClick={this.deleteComment.bind(this, data)}
            style={{ left: '-8px', top: '-14px', width: '40px', height: '20px', verticalAlign: 'top' }}
          >
            <X hoverColor={this.context.muiTheme.palette.accent1Color}/>
          </IconButton>
          <div style={{ display: 'inline-block', position: 'relative', lineHeight: 1.3, width: '90%' }}>
            <span style={{ color: this.context.muiTheme.palette.accent1Color, paddingRight: '20px' }}>{data.authorName}</span>
            {data.content}
          </div>
        </div>
      );
    }
    return (
      <div key={data.id}>
        <div style={{ position: 'relative', lineHeight: 1.3, padding: '10px', paddingLeft: '40px' }}>
          <span style={{ color: this.context.muiTheme.palette.primary1Color, paddingRight: '20px' }}>
            {data.authorName}
          </span>
          {data.content}
        </div>
      </div>
    );
  }

  render() {
    if (this.props.joined) {
      return (
        <div style={{ paddingTop: '0px' }}>
          {this.props.comments.map(this.renderComments)}
          <form onSubmit={this.onFormSubmit} style={{ textAlign: 'center' }}>
            <TextField
              hintText={'Type your comment here'}
              floatingLabelText="Add a comment"
              value={this.state.input}
              onChange={this.onInputChange}
              fullWidth
              style={{ width: '82%' }}
              underlineFocusStyle={{ borderColor: this.context.muiTheme.palette.accent1Color }}
              floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
            />
            <FlatButton
              type="submit"
              label="Submit"
            />
          </form>
        </div>
      );
    }
    return (
      <div style={{ paddingTop: '0px' }}>
        {this.props.comments.map(this.renderComments)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, deleteComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);
