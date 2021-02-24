import React from 'react';

import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <div className="darkModeToggle">
            <div className='sunMoon'>☀/☾</div>
            <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
        </div>
    );
};

export default DarkModeToggle;
