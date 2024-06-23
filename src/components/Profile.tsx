import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { getLoggedUser, getProfileImage } from "../services/userApi";
import { useEffect, useState } from "react";
import '../styles/Profile.css';
import { useNavigate } from "react-router-dom";


export default function Profile () {
    const logged : any = useAuthUser();
    const [user, setUser] = useState<any>({});
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();

    

      const loadUserInfo = async (token: string, username : string) => {
        if (token && logged.user.username) {
            const response = await getLoggedUser(token, username)
            if (response) {
                setUser(response)
                const image = await getProfileImage(logged.user)
                setProfileImage(image)
            }
        }else { 
            console.log("No se encontro el token o el usuario")
        }
      }


      useEffect(() => {
            loadUserInfo(logged?.user.access_token, logged?.user.username)
            if(!logged) {
                navigate('/login')
            }
        }, [logged?.user.access_token, logged?.user.username])

        
        console.log(profileImage)
    return (
        <div className="profile_wrapper">
            <h2 className="main_profile_title">Información de la cuenta</h2>
            <img src={profileImage} alt="imagen_de_perfil" className="profile_image"/>
            <h3 className="sub_title_profile">Infromación básica</h3>
            <div className="profile_info_container">
                <p className="user_info_type">Nombre de usuario</p>
                <span className="user_info_displayer">{user?.credenciales ? user.credenciales?.username : ""}</span>
            </div>
            <div className="profile_info_container">
                <p className="user_info_type">Número telefónico</p>
                <span className="user_info_displayer">{user?.credenciales ? user.credenciales?.codigoDeLlamada + user.credenciales?.celular : ""}</span>
            </div>
            <div className="profile_info_container">
                <p className="user_info_type">Correo electrónico</p>
                <span className="user_info_displayer">{user?.credenciales ? user.credenciales?.email : ""}</span>
            </div>
            <h3 className="sub_title_profile">Infromación personal</h3>
            <div className="profile_info_container">
                <p className="user_info_type">País</p>
                <span className="user_info_displayer">{user?.pais ? user?.pais : "No se econtró información"}</span>
            </div>
            <div className="profile_info_container">
                <p className="user_info_type">Ciudad</p>
                <span className="user_info_displayer">{user?.ciudad ? user?.ciudad : "No se econtró información"}</span>
            </div>
            <div className="profile_info_container">
                <p className="user_info_type">Direccion</p>
                <span className="user_info_displayer">{user?.direccion ? user?.direccion : "No se econtró información"}</span>
            </div>
        </div>
        )
}

