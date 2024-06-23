import { Link, useParams } from "react-router-dom"
import "../styles/Register.css"
import {  useState } from "react"
import { User } from "../interfaces/userInterface"
import { userType } from "../interfaces/userInterface"
import { sendUserInfoToAPI } from "../services/userApi"
import {countryCodes, countryInterface} from '../misc/variables'

export default function Login () {
    const param = useParams()
    const [user, setUser] = useState<User>({
        tipoUsuario: param.userType === "client" ? userType.CONSUMIDOR : userType.PROVEEDOR,
        credenciales: {
            email: "",
            username: "",
            password: "",
            codigoDeLlamada: "",
            celular: "",
            roles: [{id: 2 }]
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        let value

        if (e.target.name === "celular") {
            value = e.target.value.replace(/[^0-9]/g, '')
        } 
        else if (e.target.name === "codigoDeLlamada") {
            value = e.target.value.replace(/[^0-9+-]/g, '')
        } else {
            value = e.target.value
        }

        setUser({
           ...user,
            credenciales: {
               ...user.credenciales,
                [e.target.name]: value
            }
        })
    }

    const submitUser = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await sendUserInfoToAPI(user, 'fisica')
          } catch (error) {
            console.error('Submission error:', error)
          }
    }


    return <div className="form_wrapper">
        <form className="login_form">
            <input type="email" placeholder="Email" className="login_input" onChange={handleChange} name="email" value={user.credenciales.email}/>
            <input type="text" placeholder="Nombre de usuario" className="login_input" onChange={handleChange} name="username" value={user.credenciales.username}/>
            <input type="password" placeholder="Contraseña" className="login_input" onChange={handleChange} name="password" value={user.credenciales.password}/>
            <div>
                    <select value={user.credenciales.codigoDeLlamada} onChange={handleChange} name={"codigoDeLlamada"} className="login_input_codigo_llamada">
                        <option value='' disabled>seleciona pais </option>
                            {countryCodes.map((country : countryInterface) => {
                                return <option key={country.value} value={country.value}>{country.value}</option>
                            })}
                    </select>
                <input type="text" placeholder="Celular" className="login_input" onChange={handleChange} name="celular" value={user.credenciales.celular}/>
            </div>
            <button type="submit" className="login_btn" onClick={submitUser}>Enviar</button>
            <span>¿Ya tienes una cuenta? <Link to="/login">Inicia sesion</Link></span>
        </form>
    </div>
}