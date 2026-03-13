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
            <div className="w-full bg-primary h-15 flex justify-between items-center px-10 text-black">
                <h2 className="text-3xl">Termos</h2>
                <div className="flex gap-5">
                    <ul className="flex items-center gap-5">
                        <li onClick={()=> setCategoria("Matematica")} className="cursor-pointer">Matemática</li>
                        <li onClick={()=> setCategoria("Portugues")} className="cursor-pointer">Português</li>
                    </ul>
                    <Button variant={'secondary'} onClick={() => Deslogar()}>Deslogar</Button>
                </div>
            </div>
                {categoria == "Matematica" ? 
                <section className="w-[90%] m-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl my-4">Termos Técnicos de Matemática</h2>
                        <Modal/>
                    </div>
                    <TabelaMatematica />
                </section>
                : 
                <section className="w-[90%] m-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl my-4">Termos Técnicos de Português</h2>
                        <Modal/>
                    </div>
                    <TabelaPortugues />
                </section>
                }
            
            
        </main>
    )
}

export default Dashboard