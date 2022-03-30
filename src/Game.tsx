import React from "react";
import "./index.css";
import getGameState from "./gameLogic/getGameState";
import {Board} from "./gameComponents/Board";
import { Navbar, Footer } from "./UI";


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
      gameOver: { winner: '', winningLine: [], isDraw: false },
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
  jumpTo(step:number) {
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

export default Game
