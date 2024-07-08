import "../styles/NavBar.css"
import { Link } from "react-router-dom"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import useSignOut from "react-auth-kit/hooks/useSignOut"

export default function NavBar () {
    const authUser = useAuthUser()
    const signOut = useSignOut()

    const handleSignOut = () => { 
        signOut();
        window.location.href = '/';
    }

    

    return <header className="header_container">
        <h1 className="logo_name">Aureo Envios</h1>
        <nav className="nav_wrapper">
            <ul className="nav_list">
                {!authUser ? <li className="nav_item"><Link to="/login" className="nav_link">Iniciar Sesión</Link></li> : <></>}
                {authUser ? <li className="nav_item"><Link to="/app" className="nav_link">Mapa</Link></li> : <></>}
                {authUser ? <li className="nav_item"><Link to="/profile" className="nav_link">Perfil</Link></li> : <></>}
                {authUser ? <li className="nav_item nav_link" onClick={handleSignOut}>Cerrar Sesión</li> : <></>}
                
            </ul>
        </nav>
    </header>
}