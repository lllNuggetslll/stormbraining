import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import X from 'material-ui/svg-icons/content/clear';

import { addComment, deleteComment } from '../actions/index';

class Comments extends Component {

  static propTypes = {
    addComment: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    comments: PropTypes.array,
    userId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
    authorId: PropTypes.string,
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
    this.props.addComment(this.state.input, this.props.id, this.props.boardId);
    this.setState({ input: '' });
  }

  deleteComment(data) {
    // commentId, ideaId, boardId
    this.props.deleteComment(data.id, this.props.ideaId, this.props.boardId);
  }

  renderComments(data) {
    // TODO: Refactor delete button to avoid bind
    if (this.props.userId === data.authorId) {
      return (
        <p key={this.props.id + data.id}>
          <span>{data.content}</span>
          <IconButton onClick={this.deleteComment.bind(this, data)} >
            <X />
          </IconButton>
        </p>
      );
    }
    return (
      <p key={this.props.id + data.id}>
        <span>{data.content}</span>
      </p>
    );
  }

  render() {
    // if (this.state.showComments) {
    return (
      <tr>
        <td colSpan="5">
          <span>
            {this.props.comments.map(this.renderComments)}
          </span>
          <form onSubmit={this.onFormSubmit} className="input-group">
            <input
              className="form-control"
              value={this.state.input}
              onChange={this.onInputChange}
            />
            <span className="input-group-btn">
              <button
                type="submit"
                className="btn btn-primary"
              >
              Save
              </button>
              <button
                type="button"
                onClick={this.onHideEdit}
                className="btn btn-primary"
              >
              Hide
              </button>
            </span>
          </form>
        </td>
      </tr>
    );
    // }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, deleteComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);
