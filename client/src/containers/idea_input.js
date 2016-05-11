import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newIdea, shuffleIdeas } from '../actions/index';
import ChatList from './chat_list';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class IdeaInput extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    newIdea: PropTypes.func.isRequired,
    shuffleIdeas: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onShuffle = this.onShuffle.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term.length) {
      this.props.newIdea(this.state.term, this.props.params.board_id);
    }

    this.setState({ term: '' });
  }

  onShuffle() {
    this.props.shuffleIdeas();
  }

  render() {
    return (
      <div className="idea-input-container">
        <form onSubmit={this.onFormSubmit}>
          <TextField
            hintText="Submit an idea"
            floatingLabelText="Great ideas start here..."
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <RaisedButton
            type="submit"
            className="idea-button"
            label="Submit"
          />
          <RaisedButton
            type="button"
            className="idea-button"
            label="Shuffle Ideas"
            onTouchTap={this.onShuffle}
          />
        </form>
        <ChatList {...this.props} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newIdea, shuffleIdeas }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaInput);
