import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { getLoggedUser, getProfileImage, updateLoggedUser, uploadImage } from "../services/userApi";
import { useEffect, useState } from "react";
import '../styles/Profile.css';
import { useNavigate } from "react-router-dom";


export default function Profile () {
    const logged : any = useAuthUser();
    const [user, setUser] = useState<any>({});
    const [profileImage, setProfileImage] = useState("");
    const [editProfile, setEditProfile] = useState(false);
    const [newUser, setNewUser] = useState<any>({});
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

      const handleFileChange = async (event : any) => {
            const image = event.target.files[0];
            await uploadImage(user?.credenciales.username,"PROFILE_PICTURE", logged.user.access_token, image)
        }


      useEffect(() => {
            loadUserInfo(logged?.user.access_token, logged?.user.username)
            if(!logged) {
                navigate('/login')
            }
        }, [logged?.user.access_token, logged?.user.username])

        const handleCredentialsInputChange = (event : any) => {
            setNewUser({...newUser, credenciales: {...newUser.credenciales, [event.target.name]: event.target.value}})
        }

        const handleInputChange = (event : any) => {
            setNewUser({...newUser, [event.target.name]: event.target.value})
        }

        const editProfileFunc = () => {
            setNewUser(user)
            setEditProfile(true)
        }

        const submitEditedProfile = async () => {
            await updateLoggedUser(newUser, logged.user.access_token, user?.credenciales.username )
            setEditProfile(false)
            
            window.location.href = '/profile';
            // console.log(result)
        }
        
    return (
        <div className="profile_wrapper">
            <h2 className="main_profile_title">Información de la cuenta</h2>
            <img src={profileImage ? profileImage : "https://flejedecosas.com/wp-content/uploads/perfil-de-usuario-google-chrome-vacio.jpg"} alt="imagen_de_perfil" className="profile_image"/>
            {editProfile && <input type="file" accept="image/*" onChange={handleFileChange} />}

            {editProfile ? <p className="user_info_type" onClick={submitEditedProfile}>Guardar perfil</p> :<p className="user_info_type" onClick={editProfileFunc}>Editar perfil</p>}

            <h3 className="sub_title_profile">Infromación básica</h3>

            <div className="profile_info_container">
                <p className="user_info_type">Nombre de usuario</p>
                <span className="user_info_displayer">{user?.credenciales ? user.credenciales?.username : ""}</span>
            </div>

            <div className="profile_info_container">
                <p className="user_info_type">Número telefónico</p>
                {editProfile ? <input value={newUser?.credenciales.celular} onChange={handleCredentialsInputChange} name="celular"/> :<span className="user_info_displayer">{user?.credenciales ? user.credenciales?.codigoDeLlamada + user.credenciales?.celular : ""}</span>}
            </div>

            <div className="profile_info_container">
                <p className="user_info_type">Correo electrónico</p>
                <span className="user_info_displayer">{user?.credenciales ? user.credenciales?.email : ""}</span>
            </div>

            <h3 className="sub_title_profile">Infromación personal</h3>

            <div className="profile_info_container">
                <p className="user_info_type">Nombres</p>
                {editProfile ? <input value={newUser?.nombre} onChange={handleInputChange} name="nombre"/> : <span className="user_info_displayer">{user?.nombre ? user?.nombre : "No se econtró información"}</span>}
            </div>

            <div className="profile_info_container">
                <p className="user_info_type">País</p>
                {editProfile ? <input value={newUser?.pais} onChange={handleInputChange} name="pais"/> : <span className="user_info_displayer">{user?.pais ? user?.pais : "No se econtró información"}</span>}
            </div>

            <div className="profile_info_container">
                <p className="user_info_type">Ciudad</p>
                {editProfile ? <input value={newUser?.ciudad} onChange={handleInputChange} name="ciudad"/> :<span className="user_info_displayer">{user?.ciudad ? user?.ciudad : "No se econtró información"}</span>}
            </div>

            <div className="profile_info_container">
                <p className="user_info_type">Direccion</p>
                <span className="user_info_displayer">{user?.direccion ? user?.direccion : "No se econtró información"}</span>
            </div>
        </div>
        )
}