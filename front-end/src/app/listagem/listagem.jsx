'use client'
import React, { useEffect, useState } from 'react';

export default function Listagem() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://seu-backend-endpoint/api/produtos');
                const data = await response.json();
                const sortedProdutos = data.sort((a, b) => a.valor - b.valor);
                setProdutos(sortedProdutos);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        {produto.nome} - R${produto.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
}