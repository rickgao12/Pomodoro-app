import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Button from '@material-ui/core/Button';
import '../styles/Time.css';

momentDurationFormatSetup(moment);

const Time = ({ totalLen, handleTimeChange, intervalStarted, remainingTime, sessionType }) => {
	const formattedTime = moment.duration(remainingTime, 's').format('mm:ss', { trim: false });
	const formattedTotalTime = moment.duration(totalLen, 's').format('hh:mm:ss', { trim: false });
	return (
		<div className="time">
			<div className="current-time">
				<h1 className="current-time-header">Currently in: {sessionType}</h1>
				<div className="current-time-label">{formattedTime}</div>
				<Button
					className="start-btn"
					variant="contained"
					color={intervalStarted ? 'secondary' : 'primary'}
					onClick={handleTimeChange}
				>
					{intervalStarted ? 'Stop' : 'Start'}
				</Button>
			</div>

			<div className="total-time">
				<h2>Total time: </h2>
				<div className="total-time-label">{formattedTotalTime} </div>
			</div>
		</div>
	);
};

export default Time;
