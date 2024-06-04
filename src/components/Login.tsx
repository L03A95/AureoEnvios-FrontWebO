import { Link, useParams } from "react-router-dom"
import "../styles/Login.css"
import React, { useState } from "react"
import { UserLogin } from "../interfaces/userInterface"
import { getUserInfoFromAPI } from '../services/userApi'

export default function Login () {
    const [user, setUser] = useState<UserLogin>({username: "", password: "", grant_type: "password"})
    const param = useParams()

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const submitUser = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            // console.log(user)
            await getUserInfoFromAPI(user)
          } catch (error) {
            console.error('Submission error:', error)
          }
    }

    return <div className="form_wrapper">
        <form className="login_form">
            <input type="text" placeholder="Nombre de usuario, email o numero telefónico" className="login_input" name="username" value={user.username} onChange={handleInputChange}/>
            <input type="password" placeholder="Contraseña" className="login_input" name="password" value={user.password}  onChange={handleInputChange}/>
            <button type="submit" className="login_btn" onClick={submitUser}>Enviar</button>
            <span>¿No tienes cuenta? <Link to={param.userType === "driver" ? "/register/driver" : "/register/user"}>Crear cuenta como {param.userType === "driver" ? "conductor" : "cliente"}</Link></span>
        </form>
    </div>
}