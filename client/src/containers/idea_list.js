import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneBoard, sortIdeasByVotes, sortIdeasByContent } from '../actions/index';
import Idea from './idea';

import ArrowDown from 'material-ui/svg-icons/navigation/expand-more';
import ArrowUp from 'material-ui/svg-icons/navigation/expand-less';
import Reorder from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';
import FlipMove from 'react-flip-move';


const styles = {
  smallIcon: {
    width: 20,
    height: 20,
  },
};

const Arrows = [
  <Reorder style={styles.smallIcon} />,
  <ArrowDown style={styles.smallIcon} />,
  <ArrowUp style={styles.smallIcon} />,
];

class IdeaList extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getOneBoard: PropTypes.func,
    board: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    sortIdeasByVotes: PropTypes.func,
    sortIdeasByContent: PropTypes.func,
    joined: PropTypes.bool.isRequired,
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
    const userName = this.props.userName;
    const joined = this.props.joined;
    return (
      <div style={{ padding: '10px' }} key={data.id}>
        <Idea {...data} userId={userId} joined={joined} userName={userName} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <FlatButton style={{ paddingRight: '10px' }} onClick={this.onSortIdeasByContent}>
          Sort by Idea {Arrows[this.state.sorting.byContent]}
        </FlatButton>
        <FlatButton style={{ paddingLeft: '10px' }} onClick={this.onSortIdeasByVotes}>
          Sort by Votes {Arrows[this.state.sorting.byVotes]}
        </FlatButton>
        <FlipMove enterAnimation="fade" leaveAnimation="fade" duration={300} staggerDurationBy={100}>
          {this.props.board.ideas.map(this.renderIdea)}
        </FlipMove>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOneBoard, sortIdeasByVotes, sortIdeasByContent }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaList);
