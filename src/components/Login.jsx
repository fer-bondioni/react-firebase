import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebaseconfig'

export const Login = () => {
const history = useHistory()
const [email, setEmail] = useState('')
const [pass, setPass] = useState('')
const [error, setError] = useState(null)

const registrarUsuario = (e) =>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, pass)
    .then(r => history.push('/admin'))
    .catch(e =>{
        if(!email.trim()){
            setError('El campo email está vacío')
            return
        }
        if(!pass.trim()){
            setError('El campo password está vacío')
            return
        }
        if(e.code === 'auth/invalid-email'){
            setError('Formato email incorrecto')
        }
        if(e.code === 'auth/weak-password'){
            setError('El password debe tener 6 caracteres o más')
        }
    })

}

const loginUsuario = () =>{
    signInWithEmailAndPassword(auth, email, pass)
    .then( r =>history.push('/admin'))
    .catch(e =>{
        console.log(e)
        if(e.code === 'auth/invalid-email'){
            setError('Inserte un email válido')
        }
        if(e.code === 'auth/wrong-password'){
            setError('Password incorrecto')
        }
    })
}


    return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-4 offset-md-4"> 
                <form onSubmit={registrarUsuario} className="form-group">
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Insert Email" className="form-control" />
                    <input onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Insert Password" className="form-control mt-4" />
                    <input className="btn-dark btn col-12 mt-4 mb-2" type="submit"
                        value="Registrar Usuario" />                </form>
                <button onClick={loginUsuario} className="btn btn-success col-12">Iniciar Sesión</button>
                {
                        error 
                        ?
                        <div style={{backgroundColor:"lightgreen", outline:"1px solid green", padding: "1rem"}} className="mt-3 text-center">
                            {error}
                        </div>
                        :
                        <span></span>
                    }
            </div>
        </div>
    </div>
    )
}
