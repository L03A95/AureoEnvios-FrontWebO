import useAuthUser from "react-auth-kit/hooks/useAuthUser"



export default function Profile () {
    const user : any = useAuthUser();

    return (
        <>
            <h1>{"hola " + (user.user.username ? user.user.username : "No hay usuarios")}</h1>
        </>
        )
}