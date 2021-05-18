import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Board from '../Board/Board.js';
import { makeStyles } from '@material-ui/core/styles';

class PlayMode extends React.Component {
  state = {
    height: 16,
    width: 16,
    mines: 40
  };


  shouldComponentUpdate (nextProps) {
       if (nextProps.value !== this.props.value) {
         return true;
       } else {
         return false;
       }
     }

  easyHandler = () => {
    this.setState({
      height: 9,
      width: 9,
      mines: 10
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
              <Button >Medium</Button>
              <Button >Hard</Button>
          </ButtonGroup>
          <Board height={this.state.height} width={this.state.width} mines={this.state.mines} />
        </div>
      );
  }
}

export default PlayMode;
