import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

function Login(){

    const [nome,setNome] = useState('')
    const [senha,setSenha] = useState('')
    const navegacao = useNavigate()

    async function Logar(evento: React.SubmitEvent<HTMLFormElement>){
        evento.preventDefault()
        await axios.post("http://10.141.117.12/termostecnicos/api/login.php",{
            nome:nome.toLowerCase(),
            senha:senha
        })
        .then((res) => {
            if(res.data.mensagem == "Login efetuado com sucesso!"){
                alert(res.data.mensagem)
                sessionStorage.setItem('perfil', res.data.perfil)
                sessionStorage.setItem('id_usuario',res.data.id_usuario)
                navegacao('/dashboard')
            } else{
                alert(res.data.mensagem)
            }
        })
        .catch(error => console.log(error))
    }

    return(
        <Card className="w-1/3 m-auto translate-y-1/2">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Seja Bem-vindo!</CardTitle>
                <CardDescription>Entre agora na sua conta para ter acesso ao nosso conteúdo!</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={Logar}>
                    <div>
                        <Label htmlFor="nome">Nome Completo:</Label>
                        <Input id="nome" type="text" placeholder="Digite seu Nome Completo" onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="senha">Senha:</Label>
                        <Input type="password" id="senha" placeholder="Digite sua senha" onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Entrar</Button>
                    <div className="flex gap-3 mt-3 w-full justify-center">
                        <p>Não tem uma conta?</p>
                        <Link to={'/cadastro'} className="text-indigo-600 hover:underline">Clique aqui</Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login