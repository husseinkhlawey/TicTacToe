import React from 'react';
import './GameOver.css';

import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GameOver extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		if (this.props.winner === '') {
			return(<></>);
		}

		else if (this.props.winner === 'player') {
			return(
				<div className='GameOver'>
					<div>You win!</div>
					<button className="button" >
						<FontAwesomeIcon icon={faRedoAlt}/>
					</button>
				</div>
			);
		}

		else if (this.props.winner === 'cpu') {
			return(
				<div className='GameOver'>
					<div>CPU wins!</div>
					<button className="button" style={{background:'#c94d4d'}} >
						<FontAwesomeIcon icon={faRedoAlt}/>
					</button>
				</div>
			);
		}

		else if (this.props.winner === 'draw') {
			return(
				<div className='GameOver'>
					<div>Draw!</div>
					<button className="button" style={{background:'#918e8e'}} >
						<FontAwesomeIcon icon={faRedoAlt}/>
					</button>
				</div>
			);
		}

		else {
			return(
				<div className='GameOver'>
					<div>Error</div>
					<div>Play again?</div>
					<FontAwesomeIcon icon={faRedoAlt} />
				</div>
			);
		}
	}
}

export default GameOver;