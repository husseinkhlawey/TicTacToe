import React from 'react';
import Cell from './Cell';
import GameOver from './GameOver'
import './Board.css';

//reset the game

//click on button, and whole thing rerenders
/*[1,1,1],
  [1,1,1],
  [1,1,1]*/

/*s = props.style
return(div style=a:s /div)*/

class Board extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pscore: 0,
			cscore: 0,
			turn: 0,
			board: [[0,0,0],
					[0,0,0],
					[0,0,0]
				   ],
		    difficulty: "easy",
		    gameState: "play",
		    mode: 'dark',
		    boxes: 0,
		    winner: 'player'
		}
		this.id = 0;
		this.i = 0;
		this.j = 0;
		
		//constructor binding
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {

		//calc indicies
		if (e.target.id > 5) {
			this.i = 2;
			this.j = e.target.id - 6;
		}
		else if (e.target.id > 2) {
			this.i = 1;
			this.j = e.target.id - 3;
		}
		else {
			this.i = 0;
			this.j = e.target.id;
		}

		if (this.state.board[this.i][this.j] === 0) {
			var b = this.state.board;
			b[this.i][this.j] = 1;

			var bxs = this.state.boxes + 1;
			
			var go = false;
			var ps  = this.state.pscore;
			var cs = this.state.cscore;
			var gs = this.state.gameState;
			var winner = this.state.winner;

			//did we win yet
			go = this.checkWin(1, b,bxs);
			if (go) {
				ps++;
				gs = 'over';
				winner = 'player';
			}

			//cpu moves
			if (this.state.boxes < 8 && !go) {
				b = this.cpuTurn(2, b);
				bxs++;
				go = this.checkWin(2, b,bxs);
				if (go) {
					cs++;
					gs = 'over';
					winner = 'cpu';
				}
			}

			//not sure when to put this
			this.setState(state => ({
    			board: b,
    			boxes: bxs,
    			pscore: ps,
    			cscore: cs
  			}));

  			if (go || bxs >= 9) {
  				console.log('game over');
  				//reset baord
  				this.setState(state => ({
    				board: [[0,0,0],
						    [0,0,0],
						    [0,0,0]
			   			   ],
    				boxes: 0,
    				gameState: gs,
    				winner: winner
  				}));
  				//reset gs
  				//drop down winner banner
  			}
		}
	}

	checkWin(x, b, bxs) {
		console.log(bxs);
		if (bxs >= 5) {
			console.log('checking')
			return this.checkWinHelper(b,x);
		}
	}

	checkWinHelper(b,x) {
		//rows, cols, diag
		if ((b[0][0]===x && b[0][1]===x && b[0][2]) === x ||
			(b[1][0]===x && b[1][1]===x && b[1][2]) === x ||
			(b[2][0]===x && b[2][1]===x && b[2][2]) === x ||

			(b[0][0]===x && b[1][0]===x && b[2][0]) === x ||
			(b[0][1]===x && b[1][1]===x && b[2][1]) === x ||
			(b[0][2]===x && b[1][2]===x && b[2][2]) === x ||

			(b[0][0]===x && b[1][1]===x && b[2][2]) === x ||
			(b[0][2]===x && b[1][1]===x && b[2][0]) === x) {
			
			console.log('player ' + x + " wins");
			return true;
		}
		else
			return false;
	}

	//take win if can, else rand
	cpuTurn(x,b) {

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
			//console.log("ci " + i);
			//console.log("cj " + j);
			if (b[i][j] === 0) {
				b[i][j] = 2;
				return b;
			}
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {

		//renders twice
		//console.log("render score " + this.state.score)
		
		//map here is not defined cuz it only works on arrays
		/*const items = this.state.board.map(
			(row) => map(
				(ele) => <Cell id={this.id++} value={this.state.board[2][2]} />
			)
		);*/

		this.id = 0;
		return(
			<div>
				<GameOver result={this.state.winner} />
				
				<div className='Score' style={{color: 'black'}}>
					<p>Player {this.state.pscore}</p>
					<p>CPU {this.state.cscore}</p>
				</div>

				<div className="Board" onClick={(e)=>{this.handleClick(e)}} >
					<Cell id={this.id++} value={this.state.board[0][0]} />
					<Cell id={this.id++} value={this.state.board[0][1]} />
					<Cell id={this.id++} value={this.state.board[0][2]} />
					<Cell id={this.id++} value={this.state.board[1][0]} />
					<Cell id={this.id++} value={this.state.board[1][1]} />
					<Cell id={this.id++} value={this.state.board[1][2]} />
					<Cell id={this.id++} value={this.state.board[2][0]} />
					<Cell id={this.id++} value={this.state.board[2][1]} />
					<Cell id={this.id++} value={this.state.board[2][2]} />
				</div>

			</div>
		);

		//want the game to pause after displaying victory screen
		if (this.state.gameState === 'over') {
			//sleep 2 sec before clearing screen
			this.timerID = setInterval(() => this.update(), 300);
			setTimeout(2000);
			console.log('timed');
		}
	}

	/*myfunc() {
		var r = $.Deferred();

		console.log("test timeout func")

		setTimeout(function () {
	    	// and call `resolve` on the deferred object, once you're done
	    	r.resolve();
	  	}, 2500);

	  	// return the deferred object
  		return r;
	}

	// define FunctionTwo as needed
	functionTwo = function () {
	  console.log('FunctionTwo');
	};

	// call FunctionOne and use the `done` method
	// with `FunctionTwo` as it's parameter
	myfunc().done(FunctionTwo);*/


}

export default Board;

/*
<div id={this.id++} className="grid-item">0</div>
<div id={this.id++} className="grid-item">1</div>
<div id={this.id++} className="grid-item">2</div>
<div id={this.id++} className="grid-item">3</div>
<div id={this.id++} className="grid-item">4</div>
<div id={this.id++} className="grid-item">5</div>
<div id={this.id++} className="grid-item">{this.state.board[0][0]}</div>
<div id={this.id++} className="grid-item">{this.state.score}</div>

i="0" j="0"
i={0} j={1}
i={0} j={2}
i={1} j={0}
i={1} j={1}
i={1} j={2}
i={2} j={0}
i={2} j={1}
i={2} j={2}

<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">0</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">1</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">2</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">3</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">4</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">5</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">{this.state.board[this.i  % 3][this.j  % 3]}</div>
<div id={this.i++} i={this.i++ % 3} j={this.j++ % 3} className="grid-item">{this.state.score}</div>
<Cell id={this.i++} i={this.i++ % 3} j={this.j++ % 3} value={this.state.board[2][2]} />
*/
