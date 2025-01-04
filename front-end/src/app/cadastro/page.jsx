'use client'
import React, { useState } from 'react';

export default function Cadastro() {

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
        try {
            const response = await fetch('http://seu-backend-endpoint/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Produto cadastrado com sucesso');
                window.location.href = '/formulario';
            } else {
                console.error('Erro ao cadastrar produto');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-[640px] h-[550px] rounded-xl flex flex-col items-center py-8 ">
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
                        <div>
                            <input
                                type="number"
                                name="valor"
                                placeholder="Valor do produto"
                                className="border-2 border-gray-500 rounded-lg w-[200px] h-10 px-2 ml-8 mr-5"
                                value={formData.valor}
                                onChange={handleChange}
                            />
                            <label htmlFor="disponivel" className="text-lg">
                                Disponível para venda:
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
                        <button type="submit" className="w-16 h-16 rounded-lg flex items-center justify-center px-2">
                            <img src="/Button.svg" alt="" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}