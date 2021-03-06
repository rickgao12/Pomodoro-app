import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import '../styles/Break.css';
import { withStyles } from '@material-ui/core';

momentDurationFormatSetup(moment);

const styles = {
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		borderRadius: 3,
		border: 1,
		color: 'white',
		height: 34,
		padding: '0 5px',
		margin: '0 5px',
		'@media (max-width: 780px)': {
			height: '26px',
			padding: '0 3px'
		},
		'@media (max-width: 600px)': {
			height: '20px',
			padding: '0 3px'
		},
		'@media (max-width: 400px)': {
			height: '16px',
			width: '1rem',
			padding: '0 2px'
		},
		'@media only screen and (max-width: 330px)': {
			height: '.9rem',
			width: '.9rem',
			padding: '0 2px'
		}
	}
};

const Break = ({ classes, breakLen, incrementBreak, decrementBreak }) => {
	const formattedTime = moment.duration(breakLen, 's').format('mm:ss');
	return (
		<div className="break-container">
			<p className="description">Break length</p>

			<div className="break-btns">
				<IconButton className={classes.root} aria-label="add" size="small" onClick={incrementBreak}>
					<AddIcon fontSize="inherit" />
				</IconButton>
				<Typography>
					<span className="time-label">{formattedTime}</span>
				</Typography>
				<IconButton className={classes.root} aria-label="delete" size="small" onClick={decrementBreak}>
					<RemoveIcon fontSize="inherit" />
				</IconButton>
			</div>
		</div>
	);
};

export default withStyles(styles)(Break);
