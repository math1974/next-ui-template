"use client"

import React from 'react';
import ProtectedRoute from '../../hoc/ProtectedRoute';

function Finance() {
    return (
        <div>
            <h1>Finance</h1>
        </div>
    )
}

export default ProtectedRoute(Finance);