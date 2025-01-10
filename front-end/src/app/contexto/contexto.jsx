import React, { createContext, useState } from 'react';

// Cria o contexto
export const AppContext = createContext();

// Define o provedor do contexto
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