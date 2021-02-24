import React from 'react';

class CountClick extends React.Component{

    render() {
        return (
            <div className='countClick'>Click count&nbsp;
                {this.props.countClick}
            </div>
        )
    }
}

export default CountClick;