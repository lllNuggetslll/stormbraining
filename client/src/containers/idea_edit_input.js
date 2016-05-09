import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateIdea } from '../actions/index';

class IdeaEditInput extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    updateIdea: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { input: '', showEditInput: false };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onHideEdit = this.onHideEdit.bind(this);
  }

  onShowEdit() {
    this.setState({ input: this.props.content, showEditInput: true });
  }

  onHideEdit() {
    this.setState({ input: '', showEditInput: false });
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.input.length > 2) {
      this.props.updateIdea(this.state.input, this.props.boardId, this.props.id);
    }
    this.onHideEdit();
  }

  renderContentOrEditInput() {
    if (this.state.showEditInput) {
      return (
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
              Cancel
            </button>
          </span>
        </form>
      );
    } else {
      return (
        <div onClick={this.onShowEdit}>
          {this.props.content}
        </div>
      );
    }
  }

  render() {
    return (
      <td>
        {this.renderContentOrEditInput()}
      </td>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaEditInput);
