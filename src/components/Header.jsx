import React from 'react';
import DarkModeToggle from './DarkModeToggle';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            setIsDarkMode: false,
        };
    }

    render() {
        return (
            <div className="header">
                <div className='logo'>Game memory Check yourself</div>
                <DarkModeToggle />
            </div>
        );
    }
}

export default Header;