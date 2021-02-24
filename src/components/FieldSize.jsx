import React from 'react';

class FieldSize extends React.Component {
    clickSizeButton(number) {
        this.props.updatePropsCount(number)
    };

    render() {
        return (
            <div className='fieldSize'>
                <div>Please choose the size of play field</div>
                <button onClick={() => this.clickSizeButton(2)}>2x2</button>
                <button onClick={() => this.clickSizeButton(4)}>2x4</button>
                <button onClick={() => this.clickSizeButton(6)}>3x4</button>
                <button onClick={() => this.clickSizeButton(8)}>4x4</button>
            </div>
        )
    }
}

export default FieldSize;