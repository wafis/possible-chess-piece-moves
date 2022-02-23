import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css'],
})
export class ChessboardComponent implements OnInit {
  @Input() columns = 0;
  @Input() rows = 0;
  @Input() translations = [];
  @Input() initialKnightPos = [];

  chessboard: number[][] = [];

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.columns; i++) {
      if (this.chessboard[i] == undefined) {
        this.chessboard.push([]);
      }
      for (let j = 0; j < this.rows; j++) {
        this.chessboard[i].push(0);
      }
    }
    this.chessboard[this.initialKnightPos[0]][this.initialKnightPos[1]] = 1;

    this.calculatePossibleMoves(
      this.initialKnightPos,
      this.translations
    ).forEach((pair) => {
      if (
        pair[0] >= 0 &&
        pair[0] < this.columns - 1 &&
        pair[1] >= 0 &&
        pair[1] < this.rows - 1
      ) {
        this.chessboard[pair[0]][pair[1]] = 2;
      }
    });
  }

  calculatePossibleMoves(knightCoords, translations): number[][] {
    const xPos = knightCoords[0];
    const yPos = knightCoords[1];

    const possibleKnightMoves = translations.map((trans) => [
      xPos + trans[0],
      yPos + trans[1],
    ]);

    return possibleKnightMoves;
  }

  colorTiles(cellValue): any {
    if (cellValue === 1) {
      return {
        'background-color': '#ccc',
      };
    }
    if (cellValue === 2) {
      return {
        'background-color': '#ddd',
      };
    }
  }
}

// +2 +1
// +2 -1
// -2 -1
// -2 +1
// +1 +1
// +1 -2
// -1 +2
// -1 -2
