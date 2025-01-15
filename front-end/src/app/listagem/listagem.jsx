'use client'
import React, { useEffect, useState } from 'react';

export default function Listagem({ order, refresh }) {
    const [atualizar, setAtualizar] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({ nome: '', descricao: '', valor: '', disponivel: 'Sim' });

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/produtos');
                const data = await response.json();
                console.log('Dados recebidos:', data);
                let sortedProdutos;
                if (order === 'crescente') {
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
    }, [order, refresh]);

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

    const handleUpdate = async (id) => {
        if (formData.nome === '' || formData.descricao === '' || formData.valor === '') {
            alert('Preencha todos os campos');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Produto atualizado com sucesso');
                setAtualizar((prevState) => !prevState)
            } else {
                console.error('Erro ao atualizar produto');
            }
        }
        catch (error) {
            console.log('Erro ao enviar dados:', error);
        }
    }

    const AtualizarTrue = () => {
        setAtualizar((prevState) => !prevState)
    }

    const updateItem = (e, id, field, newValue) => {
        setProdutos((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, [field]: newValue } // Atualiza a propriedade dinamicamente
                    : item
            )
        );
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="overflow-y-auto sm:h-[250px] h-[300px] w-[600px] px-2">
            <ul>
                {produtos.map((produto) => (
                    <li className='flex justify-between bg-gray-100 py-5 px-2 border-2 rounded-md my-2 border-grey-500' key={produto.id}>
                        {atualizar ? (
                            <>
                                <input className='font-bold w-20' type='text' name='nome' value={produto.nome} onChange={(e) =>
                                    updateItem(e, produto.id, "nome", e.target.value)} />
                                <input className='font-bold w-20' type='text' name='descricao' value={produto.descricao} onChange={(e) =>
                                    updateItem(e, produto.id, "descricao", e.target.value)} />
                                <input className='font-bold w-20' type='number' name='valor' value={produto.valor} onChange={(e) =>
                                    updateItem(e, produto.id, "valor", e.target.value)} />
                                <select name='disponivel' value={produto.disponivel} >
                                    <option value='Sim'>Sim</option>
                                    <option value='Nao'>Nao</option>
                                </select>
                                <button className='bg-gray-100 text-white px-3 py-1 rounded' onClick={AtualizarTrue}>
                                    <img className='h-5 bg-red-400 p-1 rounded-md' src="/close.svg" alt="" />
                                </button>
                                <button className='bg-gray-100 text-white px-3 py-1 rounded' onClick={() => handleUpdate(produto.id)}>
                                    <img className='h-5 bg-gray-100' src="/edit.svg" alt="" />
                                </button>

                            </>
                        ) : (
                            <>
                                <p className='font-bold w-10'>{produto.nome}</p>
                                <p className='font-bold w-10'>{produto.descricao}</p>
                                <p className='font-bold w-10'>R${produto.valor}</p>
                                <p className='font-bold w-10'>{produto.disponivel ? 'Sim' : 'Nao'}</p>
                                <div className='flex w-28 gap-2'>
                                    <button className='bg-gray-100 text-white px-3 py-1 rounded' onClick={AtualizarTrue}>
                                        <img className='h-5 bg-gray-100' src="/edit.svg" alt="" />
                                    </button>
                                    <button className='bg-gray-100 text-white px-3 py-1 rounded' onClick={() => handleDelete(produto.id)}>
                                        <img className='h-5 bg-gray-100' src="/icon-dump.svg" alt="" />
                                    </button>
                                </div>
                            </>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    );
}