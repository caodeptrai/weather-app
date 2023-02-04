import React, { useState } from 'react';
import Avatar from '../../assets/image/avatar.jpg';
import { NavLink } from 'react-router-dom';
import config from '../../config/index';
import './Tabs.scss';
const Tabs = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="tabs">
            <ul className="tabs-list">
                <NavLink
                    className={toggleState === 1 ? 'tab-item active-tabs' : 'tab-item'}
                    to={config.routes.today}
                    onClick={() => toggleTab(1)}
                >
                    Today
                </NavLink>
                <NavLink
                    className={toggleState === 2 ? 'tab-item active-tabs' : 'tab-item'}
                    to={config.routes.week}
                    onClick={() => toggleTab(2)}
                >
                    Week
                </NavLink>
                <NavLink
                    className={toggleState === 3 ? 'tab-item active-tabs' : 'tab-item'}
                    to={config.routes.hour}
                    onClick={() => toggleTab(3)}
                >
                    Hour
                </NavLink>
            </ul>
            <div className="avatar">
                <img className="avatar-img" src={Avatar} alt="" />
            </div>
        </div>
    );
};

export default Tabs;
