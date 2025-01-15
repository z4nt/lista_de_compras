'use client'
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
        };

  

    return (
        <AppContext.Provider value={{ refresh, handleRefresh }}>
            {children}
        </AppContext.Provider>
    );
};