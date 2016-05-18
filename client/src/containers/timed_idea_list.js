import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortTimedIdeasByContent, sortTimedIdeasByTime, shuffleTimedIdeas } from '../actions/timed_board_actions';
import TimedIdea from './timed_idea';

import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlipMove from 'react-flip-move';

class TimedIdeaList extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    timedBoard: PropTypes.object.isRequired,
    sortTimedIdeasByVotes: PropTypes.func,
    sortTimedIdeasByContent: PropTypes.func,
    sortTimedIdeasByTime: PropTypes.func,
    shuffleTimedIdeas: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { sort: 'oldest' };
    this.renderIdea = this.renderIdea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onShuffle = this.onShuffle.bind(this);
  }

  onShuffle() {
    this.props.shuffleTimedIdeas();
  }

  handleChange(event, index, sort) {
    switch (sort) {
      case 'contentAsc':
        this.props.sortTimedIdeasByContent(2);
        break;

      case 'contentDsc':
        this.props.sortTimedIdeasByContent(1);
        break;

      case 'oldest':
        this.props.sortTimedIdeasByTime(0);
        break;

      case 'newest':
        this.props.sortTimedIdeasByTime(1);
        break;

      default:
        this.props.sortTimedIdeasByTime(0);

    }
    this.setState({ sort });
  }

  renderIdea(data) {
    return (
      <div style={{ padding: '10px' }} key={data.id}>
        <TimedIdea {...data} />
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
          {this.props.timedBoard.timedIdeas.map(this.renderIdea)}
        </FlipMove>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortTimedIdeasByContent, sortTimedIdeasByTime, shuffleTimedIdeas }, dispatch);
}

export default connect(null, mapDispatchToProps)(TimedIdeaList);
