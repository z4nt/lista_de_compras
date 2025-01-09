'use client'
import React, { useEffect, useState } from 'react';

export default function Listagem({ order }) {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/produtos');
                const data = await response.json();
                console.log('Dados recebidos:', data);
                let sortedProdutos;
                if(order === 'crescente'){
                    sortedProdutos = [...data].sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));
                } else {
                    sortedProdutos = [...data].sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));
                }
                setProdutos(sortedProdutos);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, [order]);

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
        <div className="overflow-y-auto sm:h-[250px] h-[300px] w-full px-2">  
            <ul>
                {produtos.map((produto) => (
                    <li className='flex justify-between bg-gray-100 py-5 px-2 border-2 rounded-md my-2 border-grey-500' key={produto.id}>
                        <p className='font-bold w-10'>{produto.nome}</p>
                        <p className='font-bold w-10'>{produto.descricao}</p>
                        <p className='font-bold w-10'>R${produto.valor}</p>
                        <p className='font-bold w-10'>{produto.disponivel ? 'Sim' : 'Nao'}</p>
                        <button className='bg-gray-100 text-white px-3 py-1 rounded' onClick={() => handleDelete(produto.id)}>
                           <img className='h-5 bg-gray-100' src="/icon-dump.svg" alt="" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}