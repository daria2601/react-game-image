import React from 'react';
import FieldSize from "./FieldSize";
import GameField from "./GameField";
import Time from "./Time";
import CountClick from "./CountClick";
import FinishModal from "./FinishModal";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countFields: 0,
            countClick: 0,
            start: false,
            stop: false,
            reset: false,
            totalTime: null,
            isFinished: false,
        };
    }

    updateState = (stateName, value) => {
        switch (stateName) {
            case 'start':
                this.setState({start: value});
                break;
            case 'stop':
                this.setState({stop: value});
                break;
            case 'reset':
                this.setState({reset: value});
                break;
        }
    };

    updateCountClick = () => {
        this.setState({
            countClick: this.state.countClick + 1,
            start: true
        });
    };

    updateCountFields = (count) => {
        if (this.state.countFields !== count) {
            this.setState({
                countFields: count,
                countClick: 0,
                stop: true,
                reset: true,
                isFinished: false,
            });
        }
    };
    restartGame = () => {
        this.setState({
            countFields: 0,
            countClick: 0,
            stop: true,
            reset: true,
            isFinished: false,
            totalTime: null,
        });
    };

    updateTotalTime = (time) => {
        this.setState({
            totalTime: time
        })
    };

    finishGame = () => {
        this.setState({
            stop: true,
            isFinished: true,
        });
    };

    render() {
        return (
            <div>
                <FieldSize updatePropsCount={this.updateCountFields}/>
                <Time
                    start={this.state.start}
                    stop={this.state.stop}
                    reset={this.state.reset}
                    updateParentState={this.updateState}
                    updateTotalTime={this.updateTotalTime}
                />
                <CountClick countClick={this.state.countClick}/>
                <GameField
                    countFields={this.state.countFields}
                    updatePropsClick={this.updateCountClick}
                    finishGame={this.finishGame}
                />
                <FinishModal
                    open={this.state.isFinished}
                    totalTime={this.state.totalTime}
                    countClick={this.state.countClick}
                    restartGame={this.restartGame}
                />
            </div>
        )
    }
}

export default Game;