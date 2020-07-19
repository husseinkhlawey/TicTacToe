import React from 'react';
import './Cell.css';

class Cell extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}

	componentDidMount() {
	}

	render() {

		//conditional rendering
		if (this.props.value === 0) {
			return(<div id={this.props.id}></div>);
		}

		else if (this.props.value === 1) {
			return(<div id={this.props.id} className='Cell'>
						<svg xmlns="http://www.w3.org/2000/svg" height="200" width="200" style={{backgroundColor:"lightgrey"}}>
							<line className='line' x1="0" y1="0" x2="200" y2="200" style={{stroke:'blue', strokeWidth:3}} />
							<line className='line' x1="200" y1="0" x2="0" y2="200" style={{stroke:'blue', strokeWidth:3}} />
						</svg>
					</div>);
		}

		else if (this.props.value === 2) {
			return(<div id={this.props.id} className='Cell'>
						<svg xmlns="http://www.w3.org/2000/svg" height="200" width="200" style={{backgroundColor:"lightgrey"}}>
							<circle className="circle" cx="100" cy="100" r="95" stroke="red" strokeWidth="3" fill="none" />
						</svg>
					</div>);
		}
		else
			return(<div id={this.props.id}>{"lol idk"}</div>);
	}
}

export default Cell;