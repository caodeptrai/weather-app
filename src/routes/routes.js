import React from 'react';
import config from '../config/index';
// Pages
const Today = React.lazy(()=>import('../pages/Today/Today'));
const Week = React.lazy(()=>import('../pages/Week/Week'));
const Hour = React.lazy(()=>import('../pages/Hour/Hour'));

// Public routes
const publicRoutes = [
    { path: config.routes.today, component: Today },
    { path: config.routes.week, component: Week },
    { path: config.routes.hour, component: Hour },
    
];

export { publicRoutes};