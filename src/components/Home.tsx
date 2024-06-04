import "../styles/Home.css"
import box from "../assets/images/caja.png"
import truck from "../assets/images/camion.png"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home () {
    const [hovered, setHovered] = useState("");

    return <main className="main_bg">
        <article className="main_login">
            <h2 className="main_text">Inicia sesión para empezar a enviar</h2>
            <ul className="login_button_wrapper">
                <li className="login_list"  >
                    <img src={truck} className={`main_image truck ${hovered === "client" ? "dim" : ""}
                    ${hovered === "driver" ? "selected" : ""}`}/>
                    <Link to="/login/driver" className="login_button driver" onMouseEnter={() => setHovered("driver")} onMouseLeave={() => setHovered("")}>Soy conductor</Link>
                </li>
                <li className="login_list" >
                    <img src={box} className={`main_image box ${hovered === "driver" ? "dim" : ""} ${hovered === "client" ? "selected" : ""}`}/>
                    <Link to="/login/user" className="login_button client" onMouseEnter={() => setHovered("client")} onMouseLeave={() => setHovered("")}>Soy cliente</Link>
                </li>
            </ul>

        </article>
    </main>
}