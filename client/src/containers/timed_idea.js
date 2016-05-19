import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTimedIdea, toggleTimedIdea } from '../actions/timed_board_actions';

import { Card, CardHeader } from 'material-ui/Card';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import IconButton from 'material-ui/IconButton';

class TimedIdea extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    timedBoardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    deleteTimedIdea: PropTypes.func.isRequired,
    toggleTimedIdea: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderDeleteTimedIdea = this.renderDeleteTimedIdea.bind(this);
    this.renderToggleTimedIdea = this.renderToggleTimedIdea.bind(this);
  }

  selectButton() {
    const icon = this.props.selected ?
      <CheckBox color={this.context.muiTheme.palette.accent1Color} hoverColor={this.context.muiTheme.palette.accent1Color}/> :
      <CheckBoxOutlineBlank hoverColor={this.context.muiTheme.palette.accent1Color} />;
    return (
      <IconButton
        onClick={this.renderToggleTimedIdea}
        tooltip= "select this idea"
        touch
        tooltipPosition="bottom-center"
      >
        {icon}
      </IconButton>
    );
  }

  deleteButton() {
    return (
      <IconButton
        onClick={this.renderDeleteTimedIdea}
        tooltip="delete"
        touch
        tooltipPosition="bottom-center"
      >
        <DeleteForever hoverColor={this.context.muiTheme.palette.accent1Color} />
      </IconButton>
    );
  }

  renderToggleTimedIdea() {
    this.props.toggleTimedIdea(this.props.timedBoardId, this.props.id);
  }

  renderDeleteTimedIdea() {
    this.props.deleteTimedIdea(this.props.timedBoardId, this.props.id);
  }

  render() {
    return (
      <div className="cardHolder" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          display: 'inline-block',
          paddingRight: '4px',
          paddingTop: '6px',
          boxSizing: 'border-box',
          right: '0px',
          zIndex: '999'}}
        >
          <span>
            {this.deleteButton()}
            {this.selectButton()}
          </span>
        </div>
        <Card style={{ textAlign: 'left', padding: '4px' }} zDepth={2}>
          <CardHeader
            title={this.props.content}
          />
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteTimedIdea, toggleTimedIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(TimedIdea);
