import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import getGameState from "./getGameState";
import Square from "./gameComponents/Square";
import { Navbar, Footer } from "./UI";

type boardProps ={
  squares:string[],
  result:{ winner: string, winningLine:number [], isDraw: boolean },
  onClick:(id:number)=>void,
}

class Board extends React.Component <boardProps>{
  renderSquare(i:number) {
    const result = this.props.result;
    let winner = "false";
    if (result.winner) {
      if (result.winningLine.includes(i)) {
        winner = "true";
      }
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        result={winner}
      />
    );
  }
  createCols(from:number, to:number) {
    const cols = [];
    for (let x = from; x <= to; x++) {
      cols.push(this.renderSquare(x));
    }
    return cols;
  }

  render() {
    return (
      <div>
        <div className="board-row">{this.createCols(0, 2)}</div>
        <div className="board-row">{this.createCols(3, 5)}</div>
        <div className="board-row">{this.createCols(6, 8)}</div>
      </div>
    );
  }
}
type gameState ={
  history:{squares:string[]}[]
  stepNumber:number,
  xIsNext:boolean,
  gameOver:{ winner: string, winningLine:number[], isDraw: boolean }
}

class Game extends React.Component<{},gameState> {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      gameOver: { winner: null, winningLine: null, isDraw: null },
    };
  }
  handleClick(i:number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.gameOver.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    const newHistory =[...history];
    newHistory.push({
      squares: squares,
    });
    this.setState({
      history: newHistory,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      gameOver: getGameState(squares),
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      gameOver: getGameState(this.state.history[step].squares),
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = this.state.gameOver;
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to the game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? "currentMove" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (result.winner) {
      status = "Выиграл " + result.winner;
    } else if (result.isDraw) {
      status = "It's a Draw";
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <Navbar />
        <div className="game-board">
          <Board
            squares={current.squares}
            result={result}
            onClick={(i:number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <Footer />
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
