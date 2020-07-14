import React from 'react';
import './Board.css';

class Board extends React.Component {
	
	render() {
		return(
			<div className="Board" >
				<div className="grid-item">0</div>
				<div className="grid-item">1</div>
				<div className="grid-item">2</div>
				<div className="grid-item">3</div>
				<div className="grid-item">4</div>
				<div className="grid-item">5</div>
				<div className="grid-item">6</div>
				<div className="grid-item">7</div>
				<div className="grid-item">8</div>
			</div>
		);
	}
}

export default Board;