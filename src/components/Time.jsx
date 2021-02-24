import React from 'react';
import Timer from "react-compound-timer";

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.timerStartButton = React.createRef();
        this.timerStopButton = React.createRef();
        this.timerResetButton = React.createRef();
    }
    startTimer(start) {
        start();
    }
    stopTimer(stop, getTime) {
        stop();
        this.props.updateTotalTime(Math.floor(getTime() / 1000));
    }
    resetTimer(reset) {
        reset();
    }
    componentDidUpdate(prevProps) {
        // the only way for inner buttons is by using refs
        if (prevProps.start === false && this.props.start === true) {
            this.timerStartButton.current.click();
            this.props.updateParentState('start', false);
        }
        if (prevProps.stop === false && this.props.stop === true) {
            this.timerStopButton.current.click();
            this.props.updateParentState('stop', false);
        }
        if (prevProps.reset === false && this.props.reset === true) {
            this.timerResetButton.current.click();
            this.props.updateParentState('reset', false);
        }
    }

    render() {
        return (
            <div className='gameField'>
                <Timer
                    formatValue={value => `${value < 10 ? `0${value}` : value}`}
                    startImmediately={false}
                >
                    {({ start, stop, reset, getTime }) => (
                        <React.Fragment>
                            <div className='timer'> Time &nbsp;
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                            </div>
                            <br />
                            <div>
                                <button
                                    hidden
                                    ref={this.timerStartButton}
                                    onClick={() => this.startTimer(start)}
                                >
                                    Start
                                </button>
                                <button
                                    hidden
                                    ref={this.timerStopButton}
                                    onClick={() => this.stopTimer(stop, getTime)}
                                >
                                    Stop
                                </button>
                                <button
                                    hidden
                                    ref={this.timerResetButton}
                                    onClick={() => this.resetTimer(reset)}
                                >
                                    Reset
                                </button>
                            </div>
                        </React.Fragment>
                    )}
                </Timer>
            </div>
        )
    }
}

export default Time;