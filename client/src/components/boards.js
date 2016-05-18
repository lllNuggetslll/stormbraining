import React from 'react';
import BoardInput from '../containers/board_input';
import BoardList from '../containers/board_list';
import Paper from 'material-ui/Paper';
import { paper } from './app.js';

const Boards = () => (
  <Paper style={paper} zDepth={0}>
    <BoardInput />
    <BoardList />
  </Paper>
);

export default Boards;
