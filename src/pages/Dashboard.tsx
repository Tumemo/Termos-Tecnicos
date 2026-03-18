import Modal from "@/components/Modal/Modal"
import TabelaMatematica from "@/components/Tabelas/TabelaMatematica"
import TabelaPortugues from "@/components/Tabelas/TabelaPortugues"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard(){
    const navegacao = useNavigate()
    const [categoria,setCategoria] = useState('Matematica')

    function Deslogar(){
        sessionStorage.removeItem('id_usuario')
        alert("Deslogado!")
        navegacao('/')
    }
    useEffect(()=>{
         if(!sessionStorage.getItem('id_usuario')){
            alert("Você precisa logar!")
            navegacao('/')
         }
    },[])
    return(
        <main>
            <div className="w-full h-15 flex justify-between items-center px-10 text-black bg-indigo-600">
                <h2 className="text-3xl font-bold text-white">Termos</h2>
                <div className="flex gap-5">
                    <ul className="flex items-center gap-5">
                        <li onClick={()=> setCategoria("Matematica")} className="cursor-pointer text-white">Matemática</li>
                        <li onClick={()=> setCategoria("Portugues")} className="cursor-pointer text-white">Português</li>
                    </ul>
                    <Button onClick={() => Deslogar()} className="bg-white hover:bg-gray-400">Deslogar</Button>
                </div>
            </div>
                {categoria == "Matematica" ? 
                <section className="w-[90%] m-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl my-4">Termos Técnicos de Matemática</h2>
                        <Modal/>
                    </div>
                    <TabelaMatematica />
                </section>
                : 
                <section className="w-[90%] m-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl my-4">Termos Técnicos de Português</h2>
                        <Modal/>
                    </div>
                    <TabelaPortugues />
                </section>
                }
            
            
        </main>
    )
}

export default Dashboard