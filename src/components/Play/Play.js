import React, { Component } from 'react';
import PlayMode from './PlayMode/PlayMode.js';
import Board from './Board/Board.js';
import StopWatch from './../StopWatch/StopWatch.js';

class Play extends React.Component {

  render() {
    return (
      <div>
      <PlayMode />

      </div>
    );
  }
}

export default Play;
