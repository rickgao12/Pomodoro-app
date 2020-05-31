import React, { useState, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Button from '@material-ui/core/Button';
import '../styles/Time.css';

momentDurationFormatSetup(moment);

const Time = ({ handleTimeChange, intervalStarted, remainingTime, sessionType }) => {
	const formattedTime = moment.duration(remainingTime, 's').format('mm:ss');
	return (
		<div className="time-container">
			<p>Currently in: {sessionType}</p>
			<p>Time: {formattedTime}</p>
			<Button variant="contained" color={intervalStarted ? 'secondary' : 'primary'} onClick={handleTimeChange}>
				{intervalStarted ? 'Stop' : 'Start'}
			</Button>
		</div>
	);
};

export default Time;
