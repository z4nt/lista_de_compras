'use client'
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [produto, setProdutos] = useState([]);

    const fetchProdutos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/produtos');
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleRefresh = () => {
        fetchProdutos();
    };
    
    return (
        <AppContext.Provider value={{ refresh, handleRefresh, produto, setProdutos }}>
            {children}
        </AppContext.Provider>
    );
};