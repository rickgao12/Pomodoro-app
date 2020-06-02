import React, { useState, useRef, useEffect } from 'react';
import Session from './Session';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import '../styles/Pomodoro.css';
import Break from './Break';
import Time from './Time';
import Button from '@material-ui/core/Button';

momentDurationFormatSetup(moment);
function Pomodoro() {
	const audioSound = useRef(null);
	const [ sessionLen, setSessionLen ] = useState(1500);
	const [ breakLen, setBreakLen ] = useState(300);
	const [ totalLen, setTotalLen ] = useState(0);
	const [ intervalStarted, setIntervalStarted ] = useState(null);
	const [ remainingTime, setRemainingTime ] = useState(sessionLen);
	const [ sessionType, setSessionType ] = useState('Session');

	useEffect(
		() => {
			setRemainingTime(sessionLen);
		},
		[ sessionLen ]
	);

	useEffect(
		() => {
			if (remainingTime === 0) {
				audioSound.current.play();
				if (sessionType === 'Session') {
					setSessionType('Break');
					setRemainingTime(breakLen);
				} else if (sessionType === 'Break') {
					setSessionType('Session');
					setRemainingTime(sessionLen);
				}
			}
		},
		[ breakLen, sessionLen, sessionType, remainingTime ]
	);

	const decrementSessionLen = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = sessionLen - 60;
		if (newLen < 60) {
			setSessionLen(60);
		} else {
			setSessionLen(newLen);
		}
	};

	const incrementSessionLen = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = sessionLen + 60;
		if (newLen <= 3600) {
			setSessionLen(newLen);
		}
	};

	const decrementBreak = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = breakLen - 60;
		if (newLen < 60) {
			setBreakLen(60);
		} else {
			setBreakLen(newLen);
		}
	};

	const incrementBreak = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = breakLen + 60;

		if (newLen <= 3600) {
			setBreakLen(newLen);
		}
	};

	const timeStarted = intervalStarted !== null;

	const handleTimeChange = () => {
		if (timeStarted) {
			clearInterval(intervalStarted);
			setIntervalStarted(null);
		} else {
			const startInterval = setInterval(() => {
				setRemainingTime((prevTime) => {
					const newTime = prevTime - 1;
					if (newTime >= 0) {
						return newTime;
					}

					return prevTime;
				});
				setTotalLen((currTime) => {
					return currTime + 1;
				});
			}, 1000);
			setIntervalStarted(startInterval);
		}
	};

	const handleReset = () => {
		audioSound.current.load();
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		setTotalLen(0);
		if (sessionType === 'Session') {
			setRemainingTime(sessionLen);
		} else {
			setRemainingTime(breakLen);
		}
	};

	return (
		<div className="container">
			<div className="sidebar">
				<div className="btn-container">
					<Session
						incrementSessionLen={incrementSessionLen}
						decrementSessionLen={decrementSessionLen}
						sessionLen={sessionLen}
					/>
					<Break incrementBreak={incrementBreak} decrementBreak={decrementBreak} breakLen={breakLen} />
				</div>

				<div className="reset-container">
					<Button className="reset-btn" variant="contained" color="secondary" onClick={handleReset}>
						Reset
					</Button>
				</div>
			</div>
			<div className="time-container">
				<Time
					handleTimeChange={handleTimeChange}
					intervalStarted={intervalStarted}
					remainingTime={remainingTime}
					sessionType={sessionType}
					totalLen={totalLen}
				/>
			</div>

			<audio id="beep" ref={audioSound}>
				<source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
			</audio>
		</div>
	);
}

export default Pomodoro;
