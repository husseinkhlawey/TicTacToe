import React from 'react';
import Board from './Board';
import Score from './Score';
import GameOver from './GameOver';
import './GameArea.css';

class GameArea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pscore: 0,
			cscore: 0,
			board: [[0,0,0],
  					[0,0,0],
					[0,0,0]
				   ],
		    boxes: 0,
		    winner: ''
		}
		
		//constructor binding
		this.handleClick = this.handleClick.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	handleClick(e) {

		//calc indicies
		var i = 0;
		var j = 0;

		if (e.target.id > 5) {
			i = 2;
			j = e.target.id - 6;
		}
		else if (e.target.id > 2) {
			i = 1;
			j = e.target.id - 3;
		}
		else {
			i = 0;
			j = e.target.id;
		}

		if (this.state.board[i][j] === 0 && this.state.winner === '') {

			var b = this.state.board;
			b[i][j] = 1;

			var bxs = this.state.boxes + 1;
			
			var ps  = this.state.pscore;
			var cs = this.state.cscore;
			var w = this.state.winner;

			//can simple check if winner == ''
			w = this.checkWin(1, b, bxs);
			if (w === 'player') {
				ps++;
			}

			//cpu moves if can
			if (this.state.boxes < 8 && w === '') {
				b = this.cpuTurn(2, b);
				bxs++;

				w = this.checkWin(2, b, bxs);
				if (w === 'cpu') {
					cs++;
				}
			}

			if (bxs >= 9 && w === '') {
				w = 'draw';
			}

			this.setState(state => ({
    			board: b,
    			boxes: bxs,
    			pscore: ps,
    			cscore: cs,
    			winner: w
  			}));
		}
	}

	resetGame() {
		if (this.state.winner !== '' || this.state.boxes >= 9) {
			console.log('game over');
			//reset baord
			this.setState(state => ({
				board: [[0,0,0],
					    [0,0,0],
					    [0,0,0]
		   			   ],
				boxes: 0,
				winner: ''
			}));
		}
	}

	//consolidate to 1 function
	checkWin(x, b, bxs) {
		console.log(bxs);
		if (bxs >= 5) {
			console.log('checking');
			
			//rows, cols, then diag
			if ((b[0][0]===x && b[0][1]===x && b[0][2]) === x ||
				(b[1][0]===x && b[1][1]===x && b[1][2]) === x ||
				(b[2][0]===x && b[2][1]===x && b[2][2]) === x ||

				(b[0][0]===x && b[1][0]===x && b[2][0]) === x ||
				(b[0][1]===x && b[1][1]===x && b[2][1]) === x ||
				(b[0][2]===x && b[1][2]===x && b[2][2]) === x ||

				(b[0][0]===x && b[1][1]===x && b[2][2]) === x ||
				(b[0][2]===x && b[1][1]===x && b[2][0]) === x) {
			
					var winner = 'player';
					if (x === 2) {
						winner = 'cpu';
					}
					console.log('player ' + x + ' wins');
					return winner;
			}
		}
		return '';
	}

	//take win if can, else rand
	cpuTurn(x, b) {

		//rows
		for(var i = 0; i < 3; i++) {
			var s = 0;
			var empty = false;
			var ei, ej = 0;
			for(var j = 0; j < 3; j++) {
				if (b[i][j] === x)
					s++;
				else if (b[i][j] === 0) {
					empty = true;
					ei = i;
					ej = j;
				}
			}
			if (s === 2 && empty) {
				console.log("cpu win row")
				b[ei][ej] = x;
				return b;
			}
		}
		
		//cols
		for(i = 0; i < 3; i++) {
			s = 0;
			empty = false;
			ei = 0;
			ej = 0;
			for(j = 0; j < 3; j++) {
				if (b[j][i] === x)
					s++;
				else if (b[j][i] === 0) {
					empty = true;
					ei = i;
					ej = j;
				}
			}
			if (s === 2 && empty) {
				console.log("cpu win col")
				b[ej][ei] = x;
				return b;
			}
		}

		//diagonal
		s = 0;
		empty = false;
		ei = 0;
		ej = 0;
		
		if (b[0][0] === x)
			s++;
		else if (b[0][0] === 0) {
			empty = true;
			ei = 0;
			ej = 0;
		}

		if (b[1][1] === x)
			s++;
		else if (b[1][1] === 0) {
			empty = true;
			ei = 1;
			ej = 1;
		}
		
		if (b[2][2] === x)
			s++
		else if (b[2][2] === 0) {
			empty = true;
			ei = 2;
			ej = 2;
		}
		
		if (s === 2 && empty) {
			console.log("cpu win diag left")
			b[ei][ej] = x;
			return b;
		}

		s = 0;
		empty = false;
		ei = 0;
		ej = 0;
		
		if (b[2][0] === x)
			s++;
		else if (b[2][0] === 0) {
			empty = true;
			ei = 2;
			ej = 0;
		}

		if (b[1][1] === x)
			s++;
		else if (b[1][1] === 0) {
			empty = true;
			ei = 1;
			ej = 1;
		}
		
		if (b[0][2] === x)
			s++
		else if (b[0][2] === 0) {
			empty = true;
			ei = 0;
			ej = 2;
		}
		
		if (s === 2 && empty) {
			console.log("cpu win diag right")
			b[ei][ej] = x;
			return b;
		}

		//rand
		while (1) {
			i = Math.floor(Math.random() * 3);
			j = Math.floor(Math.random() * 3);
			if (b[i][j] === 0) {
				b[i][j] = 2;
				return b;
			}
		}
	}

	render() {

		return (
			<div className="GameArea" onClick={(e)=>{this.handleClick(e)}} >
				<Score
					pscore={this.state.pscore}
					cscore={this.state.cscore}
				/>				

				<Board
					board={this.state.board}
				/>

				<div onClick={this.resetGame} style={{margin: 'auto'}} >
					<GameOver
						winner={this.state.winner}
					/>
				</div>
			</div>
		);
	}
}

export default GameArea;