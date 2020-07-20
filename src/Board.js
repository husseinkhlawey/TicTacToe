import React from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends React.Component {
	
	constructor(props) {
		super(props);
		this.id = 0;
	}

	render() {

		//renders twice
		//console.log("render score " + this.state.score)
		
		//<div className='BoardWrapper'>

		this.id = 0;
		return(
			<div className="Board" >
				<Cell id={this.id++} value={this.props.board[0][0]} />
				<Cell id={this.id++} value={this.props.board[0][1]} />
				<Cell id={this.id++} value={this.props.board[0][2]} />
				<Cell id={this.id++} value={this.props.board[1][0]} />
				<Cell id={this.id++} value={this.props.board[1][1]} />
				<Cell id={this.id++} value={this.props.board[1][2]} />
				<Cell id={this.id++} value={this.props.board[2][0]} />
				<Cell id={this.id++} value={this.props.board[2][1]} />
				<Cell id={this.id++} value={this.props.board[2][2]} />
			</div>
		);
	}
}

export default Board;