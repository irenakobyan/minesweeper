import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Board from '../Board/Board.js';
import { makeStyles } from '@material-ui/core/styles';

class PlayMode extends React.Component {
  state = {
    height: 4,
    width: 4,
    mines: 2
  };

  easyHandler = () => {
    this.setState({
      height: 9,
      width: 9,
      mines: 10
    })
  }

  mediumHandler = () => {
    this.setState({
      height: 16,
      width: 16,
      mines: 40
    })
  }

  hardHandler = () => {
    this.setState({
      height: 30,
      width: 16,
      mines: 99
    })
  }

  render() {
      return (
        <div>
          <ButtonGroup style={{
             textAlign: 'center',
              margin: 'auto',
              width: '50%',
              display: 'block'}}
              size="large"
              color="primary"
              aria-label="large outlined primary button group">
              <Button onClick={this.easyHandler}>Easy</Button>
              <Button onClick={this.mediumHandler}>Medium</Button>
              <Button onClick={this.hardHandler}>Hard</Button>
          </ButtonGroup>
          <Board height={this.state.height} width={this.state.width} mines={this.state.mines} />
        </div>
      );
  }
}

export default PlayMode;
