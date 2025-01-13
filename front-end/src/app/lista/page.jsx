'use client'
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import Listagem from "../listagem/listagem";
import Cadastro from "../cadastro/cadastro";

export default function Formulario() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState('crescente');

    const handleChange = (event) => {
        setOrder(event.target.value);
    };
    const handleClick = () => {
        setVisible(true);
    }

    return (
        <div className="flex justify-start items-center h-screen gap-10 px-10 ]">
            <div className="bg-white w-[600px] sm:h-[510px] h-[800px] rounded-xl flex flex-col ml-0 items-center py-8 px-10">
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
                    <Listagem order={order} />
                </div>
                <div className="flex w-full justify-end">
                <button className="bg-green-400 h-10 w-10 rounded-md mb-2" onClick={handleClick}>+</button>
                <button className="ml-[200px]">AAAAA</button>
                </div>
            </div>
            <Cadastro visible={visible} setVisible={setVisible}/>
        </div>
    );
}