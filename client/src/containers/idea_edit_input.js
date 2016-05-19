import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateIdea } from '../actions/index';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class IdeaEditInput extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    updateIdea: PropTypes.func.isRequired,
    joined: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
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
    if (this.props.userId === this.props.authorId && this.props.joined) {
      this.setState({ input: this.props.content, showEditInput: true });
    }
  }

  onHideEdit() {
    this.setState({ input: '', showEditInput: false });
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.input.length && this.props.userId === this.props.authorId) {
      this.props.updateIdea(this.state.input, this.props.boardId, this.props.id);
    }
    this.onHideEdit();
  }

  render() {
    if (this.state.showEditInput && this.props.joined) {
      return (
        <form onSubmit={this.onFormSubmit}>
          <TextField
            id={this.props.id}
            value={this.state.input}
            onChange={this.onInputChange}
            fullWidth
            multiLine
            underlineFocusStyle={{ borderColor: this.context.muiTheme.palette.accent1Color }}
            floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
            style={{ lineHeight: 1.4 }}
          />
          <FlatButton
            type="submit"
            label="Save"
          />
          <FlatButton
            type="button"
            onClick={this.onHideEdit}
            label="Cancel"
          />
        </form>
      );
    }
    return (
      <div style={{ paddingTop: '16px', lineHeight: 1.4 }} onClick={this.onShowEdit}>
        {this.props.content}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaEditInput);
