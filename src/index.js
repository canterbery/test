import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import calculateWinner from "./calculateWinner";

function Square(props) {
  return (
    <button
      className={"square " + (props.result == "true" ? "winner" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
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

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      gameOver: { winner: null, winningLine: null, isDraw: null },
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.gameOver.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      gameOver: calculateWinner(squares),
    });
  }
  jumpTo(step) {
    const test = calculateWinner(this.state.history[step].squares);

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      gameOver: calculateWinner(this.state.history[step].squares),
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
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
        <div className="game-board">
          <Board
            squares={current.squares}
            result={result}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
