import "../styles/Home.css"
import box from "../assets/images/caja.png"
import truck from "../assets/images/camion.png"
import { useState } from "react";
import { Link } from "react-router-dom";
import bg_img from "../assets/images/background_truck.png"

export default function Home () {
    const [hovered, setHovered] = useState("");

    return <main className="main_bg">
        <article className="main_login">
        <div className="section_1">
            <div className="slogan_container">
                <h2 className="main_title">Envía seguro, envía con nosotros</h2>
                <p className="main_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti dolor minima pariatur aut ex, explicabo velit possimus magnam eos in debitis, soluta veritatis, animi ea minus qui repellat maiores iure inventore fugit consequatur sunt?</p>
                <Link to="/login" className="login_button client">Iniciar Sesion</Link>
            </div>
            <img src={bg_img} className="background_image"/>
        </div>
            
            {/* <div>
                <h3 className="main_title">Registrate y comienza a enviar</h3>
                <ul className="login_button_wrapper">
                    <li className="login_list"  >
                        <img src={truck} className={`main_image truck ${hovered === "client" ? "dim" : ""}
                        ${hovered === "driver" ? "selected" : ""}`}/>
                        <Link to="/register/driver" className="register_button driver" onMouseEnter={() => setHovered("driver")} onMouseLeave={() => setHovered("")}>Soy conductor</Link>
                    </li>
                    <li className="login_list" >
                        <img src={box} className={`main_image box ${hovered === "driver" ? "dim" : ""} ${hovered === "client" ? "selected" : ""}`}/>
                        <Link to="/register/user" className="register_button client" onMouseEnter={() => setHovered("client")} onMouseLeave={() => setHovered("")}>Soy cliente</Link>
                    </li>
                </ul>
            </div> */}

        </article>
    </main>
}