import { onAuthStateChanged, signOut } from '@firebase/auth'
import React, {useState, useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import {auth} from '../firebaseconfig'

export const Menu = () => {

    const [user, setUser] = useState(null)
    const history = useHistory()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user.email)
                console.log(user.email)
            }
        })
    })

    const cerrarSesion = () =>{
        signOut(auth)
        setUser(null)
        history.push('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                    {
                    !user 
                    
                    ?
                    <Link  className="nav-link"to="/login">Login</Link> 

                    :

                    <span></span>
                }      
                    </li>

                    <li className="nav-item">
                    {
                    user 
                        
                    ?
                    <Link className="nav-link"  to="/admin">Admin</Link>

                    :
                    <span></span>

                    }
                    </li>
                </ul>

                {
                    user ?
<button onClick={cerrarSesion} className="btn btn-danger ms-auto me-2">Cerrar Sesión</button>
                    :
                    <span></span>

                }
            </nav>
        </div>
    )
}
