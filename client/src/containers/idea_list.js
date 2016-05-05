import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneBoard, upVote, deleteIdea } from '../actions/index';
import Idea from './idea';

class IdeaList extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getOneBoard: PropTypes.func,
    board: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    deleteIdea: PropTypes.func.isRequired,
  }

  renderIdea(data) {
    return (
      <Idea {...data} key={data.id}/>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Idea</th>
            <th>Votes</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.board.ideas.map(this.renderIdea)}
        </tbody>
      </table>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOneBoard, upVote, deleteIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaList);
