import React, { useState } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import '../styles/Break.css';
import { withStyles } from '@material-ui/core';

momentDurationFormatSetup(moment);

const styles = {
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: 3,
		border: 1,
		color: 'white',
		height: 48,
		padding: '0 5px',
		margin: '0 5px'
	}
};

const Break = ({ classes, breakLen, incrementBreak, decrementBreak }) => {
	const formattedTime = moment.duration(breakLen, 's').format('mm:ss');
	return (
		<div className="break-container">
			<IconButton className={classes.root} aria-label="delete" size="small" onClick={incrementBreak}>
				<ArrowUpwardIcon fontSize="inherit" />
			</IconButton>
			<p>{formattedTime}</p>
			<IconButton aria-label="delete" size="small" onClick={decrementBreak}>
				<ArrowDownwardIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(Break);
