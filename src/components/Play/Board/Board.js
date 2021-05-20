import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell.js';
import Timer from '../../Timer/Timer.js'
import classes from './Board.module.css';

export default class Board extends React.Component {
  state = {
   boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
   gameStatus: "Play Minesweeper",
   mineCount:this.props.mines,
   clicked: false
 };

 getMines(data) {
  let mineArray = [];

  data.map(datarow => {
    datarow.map((dataitem) => {
      if (dataitem.isMine) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

//get the flagged cells
getFlags(data) {
  let mineArray = [];

  data.map(datarow => {
    datarow.map((dataitem) => {
      if (dataitem.isFlagged) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

// get the number of left hidden mine cells
getHidden(data) {
  let mineArray = [];

  data.map(datarow => {
    datarow.map((dataitem) => {
      if (!dataitem.isRevealed) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

//Board Creation
 initBoardData(height, width, mines) {
  let data = this.createEmptyArray(height, width);
  data = this.plantMines(data, height, width, mines);
  data = this.getNeighbours(data, height, width);
  return data;
}

createEmptyArray(height, width) {
  let data = [];

  for (let i = 0; i < height; i++) {
    data.push([]);
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false
      };
    }
  }
  return data;
};

plantMines(data, height, width, mines) {
  let randomx, randomy, minesPlanted = 0;

  while (minesPlanted < mines) {
    randomx = this.getRandomNumber(width);
    randomy = this.getRandomNumber(height);
    if (!(data[randomx][randomy].isMine)) {
      data[randomx][randomy].isMine = true;
      minesPlanted++;
    }
  }

  return (data);
};

getRandomNumber(dimension) {
  return Math.floor((Math.random() * 1000) + 1) % dimension;
}

getNeighbours(data, height, width) {
  let updatedData = data, index = 0;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {

      if (data[i][j].isMine !== true) {
        let mine = 0;
        const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);

        area.map(value => {
          if (value.isMine) {
            mine++;
          }
        });

        if (mine === 0) {
          updatedData[i][j].isEmpty = true;
        }
        updatedData[i][j].neighbour = mine;
      }
    }
  }

  return (updatedData);
};

traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < this.props.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < this.props.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < this.props.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < this.props.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }

// Show the whole board revealed, after the game is lost or won
  revealBoard() {
   let updatedData = this.state.boardData;
   updatedData.map((datarow) => {
     datarow.map((dataitem) => {
       dataitem.isRevealed = true;
     });
   });
   this.setState({
     boardData: updatedData
   })
 }

 clearBoard() {
  let updatedData = this.state.boardData;
  updatedData.map((datarow) => {
    datarow.map((dataitem) => {
      dataitem.isRevealed = false;
    });
  });
  this.setState({
    boardData: updatedData
  })
}

//Open on click the neighbour cell(s)
 revealEmpty(x, y, data) {
  let area = this.traverseBoard(x, y, data);
  area.map(value => {
    if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
      data[value.x][value.y].isRevealed = true;
      if (value.isEmpty) {
        this.revealEmpty(value.x, value.y, data);
      }
    }
  });
  return data;

}

//User interactions
handleCellClick(x, y) {

   if (this.state.clicked == false) {
      this.setState({
        clicked: true
      })
   }

    if (this.state.boardData[x][y].isRevealed || this.state.boardData[x][y].isFlagged) {
      return null;
    }

    if (this.state.boardData[x][y].isMine) {
      this.setState({
        gameStatus: "Oops... You Lost." ,
        clicked: false
      });
      this.revealBoard();
    }

    let updatedData = this.state.boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

//check if there are hidden mines left and if not finish the game with a win
    if (this.getHidden(updatedData).length === this.props.mines) {
      this.setState({ mineCount: 0, gameStatus: "You Win." });
      this.revealBoard();
    }

    this.setState({
      boardData: updatedData,
      mineCount: this.props.mines - this.getFlags(updatedData).length,
    });

  }


  handleContextMenu(e, x, y) {
  e.preventDefault();
  let updatedData = this.state.boardData;
  let mines = this.state.mineCount;

  // check if already revealed
  if (updatedData[x][y].isRevealed) return;

//aj click-i jamanak flagery hanel
  if (updatedData[x][y].isFlagged) {
    updatedData[x][y].isFlagged = false;
    mines++;
  } else {
    updatedData[x][y].isFlagged = true;
    mines--;
  }

  if (mines === 0) {
    const mineArray = this.getMines(updatedData);
    const flagArray = this.getFlags(updatedData);

// converts a JavaScript object or value to a JSON string
    if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
      this.setState({ mineCount: 0, gameStatus: "You Win." });
      this.revealBoard();
    }
  }

  this.setState({
    boardData: updatedData,
    mineCount: mines,
  });
}

 renderBoard(data) {
  return data.map((datarow) => {
    return datarow.map((dataitem) => {
      return (
        <div key={dataitem.x * datarow.length + dataitem.y} >
          <Cell
            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
            cMenu={(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
            value={dataitem}
          />
          {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
        </div>);
    })
  });
}

handleQuit = () => {
  this.setState({
    gameStatus: "You quitted the game",
    clicked: false
  })
  this.revealBoard();
}

handleRestart = () => {
  this.setState({
    clicked: false
  })
  this.clearBoard();
  this.renderBoard(this.state.boardData);
}

  render() {
    return (
      <div className="board">
        <div className={classes.gameInfo}>
          <span className={classes.info}>Mines remaining: {this.state.mineCount}</span>
          <h1 className={classes.info}>{this.state.gameStatus}</h1>
              { this.state.clicked ? <Timer /> : null}
              <button onClick={this.handleRestart}>Restart</button>
              <button onClick={this.handleQuit}>Quit</button>
        </div >

        <div className={classes.AllIn}>
          {
           this.renderBoard(this.state.boardData)
         }

         </div>

      </div>
    );
  }
}

Board.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  mines: PropTypes.number,
}
