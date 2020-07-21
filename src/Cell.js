import React from 'react';
import './Cell.css';

class Cell extends React.Component {

	render() {

		//conditional rendering
		if (this.props.value === 0) {
			return(
				<div id={this.props.id} className='Cell'>
				</div>
			);
		}
		else if (this.props.value === 1) {
			return(
				<div id={this.props.id} className='Cell'>
					<svg xmlns="http://www.w3.org/2000/svg" width="186" height="186">
						<line className='line' x1="15" y1="20" x2="170" y2="170" style={{stroke:'#4f74d1', strokeWidth:5}} />
						<line className='line' x1="170" y1="20" x2="15" y2="170" style={{stroke:'#4f74d1', strokeWidth:5}} />
					</svg>
				</div>
			);
		}
		else if (this.props.value === 2) {
			return(
				<div id={this.props.id} className='Cell'>
					<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
						<circle className="circle" cx="95" cy="95" r="80" fill="none" style={{stroke:"#c96767", strokeWidth:"5"}} />
					</svg>
				</div>
			);
		}
		else {
			return(
				<div id={this.props.id}>Cell Error</div>
			);
		}
	}
}

export default Cell;