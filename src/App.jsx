import React, { useState, useRef, useEffect } from 'react';
import Pomodoro from './components/Pomodoro';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Break from './components/Break';
import Time from './components/Time';
import Button from '@material-ui/core/Button';
import './styles/App.css';

momentDurationFormatSetup(moment);
function App() {
	const audioSound = useRef(null);
	const [ pomodoroLen, setPomodoroLen ] = useState(1500);
	const [ breakLen, setBreakLen ] = useState(300);
	const [ intervalStarted, setIntervalStarted ] = useState(null);
	const [ remainingTime, setRemainingTime ] = useState(pomodoroLen);
	const [ sessionType, setSessionType ] = useState('Pomodoro');

	useEffect(
		() => {
			setRemainingTime(pomodoroLen);
		},
		[ pomodoroLen ]
	);

	useEffect(
		() => {
			if (remainingTime === 0) {
				audioSound.current.play();
				if (sessionType === 'Pomodoro') {
					setSessionType('Break');
					setRemainingTime(breakLen);
				} else if (sessionType === 'Break') {
					setSessionType('Pomodoro');
					setRemainingTime(pomodoroLen);
				}
			}
		},
		[ breakLen, pomodoroLen, sessionType, remainingTime ]
	);

	const decrementPomodoroLen = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = pomodoroLen - 60;
		if (newLen < 60) {
			setPomodoroLen(60);
		} else {
			setPomodoroLen(newLen);
		}
	};

	const incrementPomodoroLen = () => {
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		const newLen = pomodoroLen + 60;
		if (newLen <= 3600) {
			setPomodoroLen(newLen);
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
			}, 1000);
			setIntervalStarted(startInterval);
		}
	};

	const handleReset = () => {
		audioSound.current.load();
		clearInterval(intervalStarted);
		setIntervalStarted(null);
		if (sessionType === 'Pomodoro') {
			setRemainingTime(pomodoroLen);
		} else {
			setRemainingTime(breakLen);
		}
	};

	return (
		<div className="container">
			<div className="pomodoro-container">
				<Pomodoro
					incrementPomodoroLen={incrementPomodoroLen}
					decrementPomodoroLen={decrementPomodoroLen}
					pomodoroLen={pomodoroLen}
				/>
			</div>
			<div className="time-container">
				<Time
					handleTimeChange={handleTimeChange}
					intervalStarted={intervalStarted}
					remainingTime={remainingTime}
					sessionType={sessionType}
				/>
			</div>
			<div className="break-container">
				<Break incrementBreak={incrementBreak} decrementBreak={decrementBreak} breakLen={breakLen} />
			</div>
			<div>
				<Button variant="contained" onClick={handleReset}>
					Reset
				</Button>
			</div>

			<audio id="beep" ref={audioSound}>
				<source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
			</audio>
		</div>
	);
}

export default App;
