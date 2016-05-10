import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneBoard, sortIdeasByVotes, sortIdeasByContent } from '../actions/index';
import Idea from './idea';

class IdeaList extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getOneBoard: PropTypes.func,
    board: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    sortIdeasByVotes: PropTypes.func,
    sortIdeasByContent: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { sorting: { byContent: 0, byVotes: 0 } };
    this.renderIdea = this.renderIdea.bind(this);
    this.onSortIdeasByVotes = this.onSortIdeasByVotes.bind(this);
    this.onSortIdeasByContent = this.onSortIdeasByContent.bind(this);
  }

  onSortIdeasByVotes() {
    // order: 1 is descending, 2 is ascending, 0 is not sorted
    let order = this.state.sorting.byVotes + 1;
    order = order > 2 ? 0 : order;
    this.props.sortIdeasByVotes(order);
    this.setState({ sorting: { byContent: 0, byVotes: order } });
  }

  onSortIdeasByContent() {
    // order: 1 is descending, 2 is ascending, 0 is not sorted
    let order = this.state.sorting.byContent + 1;
    order = order > 2 ? 0 : order;
    this.props.sortIdeasByContent(order);
    this.setState({ sorting: { byContent: order, byVotes: 0 } });
  }

  renderIdea(data) {
    const userId = this.props.userId;
    return (
      <Idea {...data} userId={userId} key={data.id}/>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th onClick={this.onSortIdeasByContent}>
              Idea {this.state.sorting.byContent}
            </th>
            <th onClick={this.onSortIdeasByVotes}>
              Votes {this.state.sorting.byVotes}
            </th>
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
  return bindActionCreators({ getOneBoard, sortIdeasByVotes, sortIdeasByContent }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaList);
