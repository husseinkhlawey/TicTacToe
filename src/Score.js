import React from 'react';
import './Score.css';

class Score extends React.Component {

	render() {
		return(
			<div className='Score'>
				<div className='PlayerScore'>Player {this.props.pscore}</div>
				<br/>
				<div className='CpuScore'>CPU {this.props.cscore}</div>
			</div>
		);
	}
}

export default Score;