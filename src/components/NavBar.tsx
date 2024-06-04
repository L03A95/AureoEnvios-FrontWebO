import "../styles/NavBar.css"
import { Link } from "react-router-dom"

export default function NavBar () {


    return <header className="header_container">
        <h1 className="logo_name">Aureo Envios</h1>
        <nav className="nav_wrapper">
            <ul className="nav_list">
                <li className="nav_item"><Link to="/" className="nav_link">Home</Link></li>
                <li className="nav_item"><a href="/about" className="nav_link">About</a></li>
                <li className="nav_item"><a href="/contact" className="nav_link">Contact</a></li>
            </ul>
        </nav>
    </header>
}