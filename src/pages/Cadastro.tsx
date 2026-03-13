import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

function Cadastro(){

    const [nome,setNome] = useState('')
    const [senha,setSenha] = useState('')

    async function Cadastrar(evento: React.SubmitEvent<HTMLFormElement>){
        evento.preventDefault()
        await axios.post("http://localhost/termostecnicos/api/login.php",{
            nome:nome,
            senha:senha
        })
        .then((res) => {
            alert("Usuario Criado, agora volte para a pagina de login")
            console.log(res)
        })
        .catch(error => console.log(error))
    }

    return(
        <Card className="w-1/3 m-auto translate-y-1/2">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={Cadastrar}>
                    <div>
                        <Label htmlFor="nome">Nome:</Label>
                        <Input id="nome" type="text" placeholder="Digite seu Nome" onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="senha">Senha:</Label>
                        <Input type="password" id="senha" placeholder="Digite sua senha" onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <Button type="submit" className="w-full">Cadastrar</Button>
                    <Link to={'/'}>Já tem uma conta? Clique Aqui</Link>
                </form>
            </CardContent>
        </Card>
    )
}

export default Cadastro