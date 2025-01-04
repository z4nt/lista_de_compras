import Listagem from "../listagem/listagem";
export default function Formulario (){


    return(
        <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[640px] h-[550px] rounded-xl flex flex-col items-center py-8 ">
            <img src="/Icon.svg" alt="" />
            <h1 className="text-2xl font-bold">Listagem de Produtos</h1>
            <h5 className="text-sm font-extralight">Facilite sua ida ao supermercado</h5>
            <Listagem/>
        </div>
        </div>
    )
}