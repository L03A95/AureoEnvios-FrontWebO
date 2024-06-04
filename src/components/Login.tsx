import { Link, useParams } from "react-router-dom"
import "../styles/Login.css"

export default function Login () {
    const param = useParams()



    return <div className="form_wrapper">
        <form className="login_form">
            <input type="email" placeholder="Email" className="login_input"/>
            <input type="password" placeholder="Contraseña" className="login_input"/>
            <button type="submit" className="login_btn">Enviar</button>
            <span>¿No tienes cuenta? <Link to={param.userType === "driver" ? "/register/driver" : "/register/user"}>Crear cuenta como {param.userType === "driver" ? "conductor" : "cliente"}</Link></span>
        </form>
    </div>
}