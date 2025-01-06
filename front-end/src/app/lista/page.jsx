'use client'
import Listagem from "../listagem/listagem";

export default function Formulario() {
    const handleCadastro = () => {
        window.location.href = '/cadastro'; 
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-[640px] sm:h-[500px] h-[550px] rounded-xl flex flex-col items-center py-8">
                <img src="/Icon.svg" alt="" />
                <h1 className="text-2xl font-bold">Listagem de Produtos</h1>
                <h5 className="text-sm font-extralight">Facilite sua ida ao supermercado</h5>
                <div className="w-full py-5">
                    <div className="flex text-left  px-10">
                        <p className="font-bold pr-20">NOME</p>
                        <p className="font-bold pr-10">DESCRIÇÃO</p>
                        <p className="font-bold pr-10">VALOR</p>
                        <p className="font-bold">DISPONIVEL</p>
                    </div>
                    <div className="overflow-y-auto sm:h-[200px] h-[300px] w-full px-10">
                        <Listagem />
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleCadastro}
                >
                    Cadastrar Produto
                </button>
            </div>
        </div>
    );
}