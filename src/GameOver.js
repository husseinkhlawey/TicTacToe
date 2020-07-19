import React from 'react';
import './GameOver.css';

class GameOver extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		if (this.props.result === '')
			return(<></>);

		else if (this.props.result === 'player')
			return(<div className='GameOver'>{'player wins!'}</div>);

		else if (this.props.result === 'cpu')
			return(<div className='GameOver'><p>{'cpu wins!'}</p></div>);

		else
			return(<div className='GameOver'><p>{'wut its over?'}</p></div>);

	}
}

export default GameOver;