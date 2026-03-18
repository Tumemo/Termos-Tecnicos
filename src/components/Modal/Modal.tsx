import { PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import axios from "axios"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

function Modal(){
    const [nome,setNome] = useState('')
    const [descricao,setDescricao] = useState('')
    const [exemplo, setExemplo] = useState('')
    const [categoria,setCategoria] = useState('')

    async function AdicionarTermo(evento:React.SubmitEvent<HTMLFormElement>){
        evento.preventDefault()
        await axios.post("http://10.141.117.12/termostecnicos/api/termos.php",{
            id_usuario: sessionStorage.getItem('id_usuario'),
            nome:nome,
            descricao:descricao,
            exemplo:exemplo,
            categoria: categoria
        })
         .then(res => alert(res.data.mensagem))
         .catch(error => console.log(error))
    }
    return(
        <Dialog>
            <DialogTrigger asChild><Button className="bg-indigo-600 hover:bg-indigo-700 text-white"><PlusCircle/>Novo Termo</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Novo termo</DialogTitle>
                </DialogHeader>
                <form onSubmit={AdicionarTermo}>
                    <div>
                        <Label htmlFor="nome">Nome do Termo:</Label>
                        <Input onChange={e => setNome(e.target.value)} id="nome" placeholder="Digite o nome do termo..." type="text"/>
                    </div>
                    <div>
                        <Label htmlFor="descricao">Descrição do termo:</Label>
                        <Textarea onChange={e => setDescricao(e.target.value)} className="my-3" id="descricao" placeholder="Adicione a descrição do termo"/>
                    </div>
                    <div>
                        <Label  htmlFor="exemplo">Exemplos do Termo:</Label>
                        <Textarea onChange={e => setExemplo(e.target.value)} className="my-3" id="exemplo" placeholder="Adicione exemplos do termo"/>
                    </div>
                    <div>
                        <Select onValueChange={setCategoria} value={categoria}>
                            <SelectTrigger> 
                                <SelectValue placeholder="Selecione uma categoria"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categoria</SelectLabel>
                                    <SelectItem value="Matemática">Matemática</SelectItem>
                                    <SelectItem value="Português">Português</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between mt-3">
                        <DialogClose asChild><Button variant={'secondary'}>Cancelar</Button></DialogClose>
                        <Button type="submit">Adicionar</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Modal