"use client"

import React from 'react';
import ProtectedRoute from '../../hoc/ProtectedRoute';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default ProtectedRoute(Dashboard);