import React from 'react';
import Popup from 'reactjs-popup';

class FinishModal extends React.Component {

    secondsToHms = (d) => {
        d = Number(d);

        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    };

    render() {
        return (
            <Popup
                open={this.props.open}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <div className="modalHeader"> Win! </div>
                        <div className="content">
                            <p>Your game time: {this.secondsToHms(this.props.totalTime)}</p>
                            <p>Your total count click: {this.props.countClick}</p>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    close();
                                    this.props.restartGame();
                                }}
                            >
                                New game
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        )
    }
};

export default FinishModal;
