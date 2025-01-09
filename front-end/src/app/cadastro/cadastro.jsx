'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        valor: '',
        disponivel: 'Sim'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.nome === '' || formData.descricao === '' || formData.valor === ''){
            alert('Preencha todos os campos');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Produto cadastrado com sucesso');
            } else {
                console.error('Erro ao cadastrar produto');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-[510px] sm:h-[450px] h-[600px] rounded-xl flex flex-col items-center py-8 ">
                <h1 className="text-2xl font-bold">CADASTRO</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome do produto"
                                className="border-2 border-gray-500 rounded-lg w-[200px] h-10 px-5 mr-10 my-5"
                                value={formData.nome}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="descricao"
                                placeholder="Descrição do produto"
                                className="border-2 border-gray-500 rounded-lg w-[200px] h-10 px-5"
                                value={formData.descricao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex gap-10"> 
                            <input
                                type="number"
                                name="valor"
                                placeholder="Valor do produto"
                                className="border-2 border-gray-500 rounded-lg w-[200px] h-10 px-5 "
                                value={formData.valor}
                                onChange={handleChange}
                            />
                            <label htmlFor="disponivel" className="text-lg">
                                Disponível:
                            </label>
                            <select
                                id="disponivel"
                                name="disponivel"
                                className="border border-gray-300 rounded-lg p-2"
                                value={formData.disponivel}
                                onChange={handleChange}
                            >
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                        </div>
                        <button type="submit" onClick={() => router.push('/lista')} className="w-16 bg-green-400 mt-10 h-10 rounded-lg flex items-center justify-center px-2">
                           +
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}