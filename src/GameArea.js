import React from 'react';
import Board from './Board';
//import './GameArea.css';

class GameArea extends React.Component {

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

	render() {
		return (
			<div classname="GameArea">
				<Board />
			</div>
		);
	}
}

export default GameArea;