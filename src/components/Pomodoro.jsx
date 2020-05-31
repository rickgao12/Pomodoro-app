import React, { useState } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import '../styles/Pomodoro.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
momentDurationFormatSetup(moment);

const Pomodoro = ({ pomodoroLen, incrementPomodoroLen, decrementPomodoroLen }) => {
	const formattedTime = moment.duration(pomodoroLen, 's').format('mm:ss');
	return (
		<div className="pomodoro-container">
			<IconButton aria-label="delete" size="small" onClick={incrementPomodoroLen}>
				<ArrowUpwardIcon fontSize="inherit" />
			</IconButton>
			<p>{formattedTime}</p>
			<IconButton aria-label="delete" size="small" onClick={decrementPomodoroLen}>
				<ArrowDownwardIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
};

export default Pomodoro;
