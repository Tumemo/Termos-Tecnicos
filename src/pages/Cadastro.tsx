import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
            nome:nome.toLowerCase(),
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
                <CardTitle className="text-3xl font-bold">Seja Bem-Vindo!</CardTitle>
                <CardDescription>Não tem uma conta ainda? Crie uma agora mesmo!</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={Cadastrar}>
                    <div>
                        <Label htmlFor="nome">Nome Completo:</Label>
                        <Input id="nome" type="text" placeholder="Digite seu Nome Completo" onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="senha">Senha:</Label>
                        <Input type="password" id="senha" placeholder="Digite sua senha" onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Criar conta</Button>
                    <div className="flex gap-2 w-full justify-center mt-3">
                        <p>Já tem uma conta?</p>
                        <Link to={'/'} className="text-indigo-600 hover:underline">Clique aqui</Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Cadastro