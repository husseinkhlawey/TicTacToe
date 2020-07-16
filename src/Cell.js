import React from 'react';
import './Cell.css';

class Cell extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { value: "" };
		
		/*this.print = "";
		if (this.value == 1)
			this.print = "X";
		else if (this.value == 2)
			this.print = "O";*/
	}

	componentDidMount() {
		
	}

	render() {
		//console.log("cell state "+this.state.value);

		//conditional rendering
		if (this.props.value === 0)
			return(<div id={this.props.id}></div>);
		else if (this.props.value === 1)
			return(<div id={this.props.id}>{"X"}</div>);
		else if (this.props.value === 2)
			return(<div id={this.props.id}>{"O"}</div>);
		else
			return(<div id={this.props.id}>{"lol idk"}</div>);
	}
}

export default Cell;