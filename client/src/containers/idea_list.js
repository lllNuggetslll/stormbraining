import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneBoard, sortIdeasByVotes, sortIdeasByContent, sortIdeasByTime, shuffleIdeas } from '../actions/index';
import Idea from './idea';

import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlipMove from 'react-flip-move';

class IdeaList extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getOneBoard: PropTypes.func,
    board: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    sortIdeasByVotes: PropTypes.func,
    sortIdeasByContent: PropTypes.func,
    sortIdeasByTime: PropTypes.func,
    shuffleIdeas: PropTypes.func.isRequired,
    joined: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { sort: 'oldest' };
    this.renderIdea = this.renderIdea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onShuffle = this.onShuffle.bind(this);
  }

  onShuffle() {
    this.props.shuffleIdeas();
  }

  handleChange(event, index, sort) {
    // order: 1 is descending, 2 is ascending, 0 is not sorted
    switch (sort) {
      case 'contentAsc':
        this.props.sortIdeasByContent(2);
        break;

      case 'contentDsc':
        this.props.sortIdeasByContent(1);
        break;

      case 'votesAsc':
        this.props.sortIdeasByVotes(2);
        break;

      case 'votesDsc':
        this.props.sortIdeasByVotes(1);
        break;

      case 'oldest':
        this.props.sortIdeasByTime(0);
        break;

      case 'newest':
        this.props.sortIdeasByTime(1);
        break;

      default:
        this.props.sortIdeasByContent(0);

    }
    this.setState({ sort });
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
        Sort Ideas:
        <DropDownMenu value={this.state.sort} onChange={this.handleChange}>
          <MenuItem value={'contentDsc'} primaryText="Content, A-Z" />
          <MenuItem value={'contentAsc'} primaryText="Content, Z-A" />
          <MenuItem value={'votesDsc'} primaryText="Most Votes" />
          <MenuItem value={'votesAsc'} primaryText="Fewest Votes" />
          <MenuItem value={'oldest'} primaryText="Oldest First" />
          <MenuItem value={'newest'} primaryText="Newest First" />
        </DropDownMenu>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Shuffle Ideas"
          onTouchTap={this.onShuffle}
        />
        <FlipMove enterAnimation="fade" leaveAnimation="fade" duration={300} staggerDurationBy={100}>
          {this.props.board.ideas.map(this.renderIdea)}
        </FlipMove>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOneBoard, sortIdeasByVotes, sortIdeasByContent, sortIdeasByTime, shuffleIdeas }, dispatch);
}

export default connect(null, mapDispatchToProps)(IdeaList);
