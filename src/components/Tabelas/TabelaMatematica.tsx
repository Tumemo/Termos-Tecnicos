import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


interface TermosProps{
    nome:string
    nome_criador: string
    descricao: string
    exemplos:string
    id:number
}
function TabelaMatematica(){

    const [termos,setTermos] = useState<TermosProps[]>([])
    const [busca,setBusca] = useState("")
    const permissao = sessionStorage.getItem('perfil') == "Aluno" ? false : true

    async function CarregarTermos(){
        await axios.get("http://10.141.117.12/termostecnicos/api/termos.php",{
            params:{
                categoria: "Matematica"
            }
        })
         .then(res => {
            console.log(res.data.mensagem)
            setTermos(res.data.data)
        })
         .catch(error => console.log(error))
    }
    async function removerTermo(id: number) {
        if (confirm("Tem certeza que deseja remover este termo?")) {
            try {
                await axios.delete("http://10.141.117.12/termostecnicos/api/termos.php",{
                    data:{
                        id:id
                    }
                })
                setTermos(termos.filter(t => t.id !== id))
            } catch (error) {
                console.error("Erro ao remover:", error)
            }
        }
    }
    useEffect(()=>{
        CarregarTermos()
    },[])

    const termosFiltrados = termos.filter(termo =>
        termo.nome.toLocaleLowerCase().includes(busca.toLocaleLowerCase()) || termo.descricao.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
    )
    return(
        <div>
            <Input type="search" placeholder="Digite o que deseja buscar..." value={busca} onChange={e => setBusca(e.target.value)}/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Exemplos</TableHead>
                        <TableHead>Usuario que adicinou o termo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {termosFiltrados.length > 0 ? (
                        termosFiltrados.map(termo => (
                            <TableRow key={termo.id}>
                                <TableCell className="font-medium">{termo.nome}</TableCell>
                                <TableCell className="max-w-xs whitespace-normal wrap-break-word">{termo.descricao}</TableCell>
                                <TableCell>{termo.exemplos}</TableCell>
                                <TableCell>{termo.nome_criador}</TableCell>
                                
                                {/* Coluna de ação condicional */}
                                {permissao && (
                                    <TableCell className="text-right">
                                        <Button
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => removerTermo(termo.id)}
                                        >
                                            Remover
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={permissao ? 5 : 4} className="text-center">
                                Nenhum termo encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default TabelaMatematica