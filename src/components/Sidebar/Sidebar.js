import React from 'react';
import City from '../City/City';
import Search from '../Search/Search';

import './Sidebar.scss';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <Search />
            <City />
        </div>
    );
};

export default Sidebar;
