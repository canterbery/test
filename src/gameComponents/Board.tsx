import React from "react";
import Square from './Square'


type boardProps ={
    squares:string[],
    result:{ winner: string, winningLine:number [], isDraw: boolean },
    onClick:(id:number)=>void,
  }
  
  export class Board extends React.Component <boardProps>{
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
      const cols :JSX.Element[]=[];
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