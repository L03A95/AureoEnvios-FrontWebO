import React, { useState } from "react";
import { Link  } from "react-router-dom";
import "../styles/Login.css";
import { UserLogin } from "../interfaces/userInterface";
import { getUserInfoFromAPI } from '../services/userApi';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Toaster, toast } from 'sonner';

export default function Login() {
    const [user, setUser] = useState<UserLogin>({ username: "", password: "", grant_type: "password" });
    // const { userType } = useParams<{ userType: string }>();
    // const navigate = useNavigate();
    const signIn = useSignIn();
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitUser = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const response = await getUserInfoFromAPI(user);
            
            if (!response) {
                throw new Error('No response from API');
            }

            const authSuccess = signIn({
                auth: {
                    token: response.access_token,
                    type: 'Bearer',
                },
                refresh: response.refresh_token || null, // habrán muchos nulls simplemente por la seguridad de tipado de TS
                userState: { user: response } || null
            });

            if (authSuccess) {
                if (isChecked) {
                    document.cookie = "rememberMe=true; max-age=604800";
                    console.log("Opción de mantener sesión creada. Creando cookie para recordar la sesión.");
                } else {
                    console.log("Opción de mantener sesión creada es falso. No se creará la cookie para recordar la sesión");
                }

                window.location.href = '/';
            } else {
                throw new Error('Fallo en el inicio de sesión');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Fallo en el inicio de sesión. ¿Son las credenciales correctas?');
        }
    };

    return (
        <div className="form_wrapper">
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '1.5rem',
                        padding: '1rem 1rem',
                    },
                }}
                richColors
                closeButton
                expand={true}
            />
            <form className="login_form">
                <input
                    type="text"
                    placeholder="Nombre de usuario, email o número telefónico"
                    className="login_input"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="login_input"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                />
                <div className="checkbox-container" style={{ marginTop: '15px' }}>
                    <input
                        type="checkbox"
                        id="session-checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="session-checkbox" className="cursor-pointer flex items-center">
                        <div className="w-6 h-6 border-2 rounded-md border-cyan-500 flex items-center justify-center mr-2 focus:outline-none">
                            {/* {isChecked && (
                                <svg
                                    className="w-4 h-4 text-cyan-500 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            )} */}
                        </div>
                        Mantener sesión iniciada
                    </label>
                </div>
                <button type="submit" className="login_btn" onClick={submitUser}>Enviar</button>
                <span>
                    ¿No tienes cuenta? 
                    <Link to="/register/driver">
                        Crear cuenta como proveedor
                    </Link>
                    <br />
                    <Link to="/register/user">
                        Crear cuenta como cliente
                    </Link>
                </span>
            </form>
        </div>
    );
}
