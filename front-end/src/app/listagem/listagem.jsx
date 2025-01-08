'use client'
import React, { useEffect, useState } from 'react';

export default function Listagem() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/produtos');
                const data = await response.json();
                console.log('Dados recebidos:', data);
                const sortedProdutos = data.sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));
                console.log('Dados ordenados:', sortedProdutos);
                setProdutos(sortedProdutos);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/produtos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProdutos(produtos.filter(produto => produto.id !== id));
                console.log('Produto deletado com sucesso');
            } else {
                console.error('Erro ao deletar produto');
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    return (
        <div>
            <ul>
                {produtos.map((produto) => (
                    <li className='flex justify-between py-5 px-2 border-2 rounded-md my-2 border-grey-500' key={produto.id}>
                        <p className='font-bold'>{produto.nome}</p>
                        <p className='text-left font-bold '>{produto.descricao}</p>
                        <p className='font-bold '>R${produto.valor}</p>
                        <p className='font-bold '>{produto.disponivel ? 'Sim' : 'Nao'}</p>
                        <button className='bg-white text-white px-3 py-1 rounded' onClick={() => handleDelete(produto.id)}>
                           <img className='h-5 bg-white' src="/icon-dump.svg" alt="" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}