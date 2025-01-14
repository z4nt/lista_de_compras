'use client'
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleVisible = (value) => {
        setVisible(value);
    };

    return (
        <AppContext.Provider value={{ visible, handleVisible, refresh, handleRefresh }}>
            {children}
        </AppContext.Provider>
    );
};