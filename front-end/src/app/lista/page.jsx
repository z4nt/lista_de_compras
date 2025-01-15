'use client'
import React, { useState, useEffect,useContext } from 'react';
import Listagem from "../listagem/listagem";
import Cadastro from "../cadastro/cadastro";
import { AppContext } from '../contexto/contexto';

export default function Formulario() {
    const {handleRefresh, refresh} = useContext(AppContext)
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState('crescente');

    const handleChange = (event) => {
        setOrder(event.target.value);
    };
    const handleClick = () => {
        setVisible(true);
    }
    
    const handlePdf = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/produtos/pdf');
            if (!response.ok) {
                throw new Error('Erro ao baixar PDF');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'produtos.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Erro ao baixar PDF:', error);
        }
    };
    return (
        <div className="flex justify-start items-center h-screen gap-10 px-10 ]">
            <div className="bg-white w-[650px] sm:h-[510px] h-[800px] rounded-xl flex flex-col ml-0 items-center py-8 px-10">
                <img className="h-14" src="/Icon.svg" alt="" />
                <h1 className="text-2xl font-bold">Listagem de Produtos</h1>
                <h5 className="text-sm font-extralight">Facilite sua ida ao supermercado</h5>
                <div className="w-[full] py-5">
                    <div className="flex justify between pl-3 ">
                        <p className="font-bold pr-14">NOME</p>
                        <p className="font-bold pr-10">DESCRIÇÃO</p>
                        <p className="font-bold pr-10">VALOR</p>
                        <p className="font-bold pr-5">DISPONIVEL</p>
                        <select name='order' id="order" onChange={handleChange}>
                            <option className="font-bold" value="crescente">Crescente</option>
                            <option className="font-bold" value="decrescente">Decrescente</option>
                        </select>
                    </div>
                    <Listagem order={order}  refresh={refresh}/>
                </div>
                <div className="flex w-full justify-end">
                <button className="bg-green-400 hover:bg-green-500 h-10 w-10 rounded-md mb-2" onClick={handleClick}>+</button>
                <button className="ml-[200px]" onClick={handlePdf}><img className="h-8 mb-2 bg-blue-600 text-white py-1 px-1 rounded hover:bg-blue-700" src="/download.svg" alt="" /></button>
                </div>
            </div>
            <Cadastro visible={visible} setVisible={setVisible} handleRefresh={handleRefresh}/>
        </div>
    );
}