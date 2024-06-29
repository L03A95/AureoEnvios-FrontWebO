import { User, UserLogin } from "../interfaces/userInterface";

const ENDPOINT = import.meta.env.VITE_API_USER_ENDPOINT;
const AUTH_ENDPOINT = import.meta.env.VITE_API_AUTH_ENDPOINT;
const IMAGE_ENDPOINT = import.meta.env.VITE_API_FILE_ENDPOINT;
const EMAIL_ENDPOINT = import.meta.env.VITE_API_EMAIL_ENDPOINT;


const sendUserInfoToAPI = async (user: User, userType: string) => {
    try {
        const response = await fetch(`${ENDPOINT}/persona-${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.message}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
};

const loginUser = async (user: UserLogin) => {
    try {
        const userFormData = new FormData();
        userFormData.append('username', user.username);
        userFormData.append('password', user.password);
        userFormData.append('grant_type', user.grant_type);

        const response = await fetch(`${AUTH_ENDPOINT}/token`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('front_app:12345'),
            },
            body: userFormData,
        });

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.message}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        }

        const data = await response.json();
        return data; // -> Devolvemos la respuesta :)
    } catch (error) {
        throw error; // -> Devolvemos error :(
    }
};

const useRefreshToken = async (token: string | undefined) => {
    try {
        if (!token) {
            throw new Error('No token provided');
        }
        
        const tokenFormData = new FormData();
        tokenFormData.append('refresh_token', token);
        tokenFormData.append('grant_type', 'refresh_token');

        const response = await fetch(`${AUTH_ENDPOINT}/token`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic '+ btoa('front_app:12345'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: tokenFormData,
        });

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.error_description}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            };
            throw new Error(errorMessage);
        };

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        };

        const data = await response.json();
        return data; // -> Devolvemos la respuesta :)
    } catch (error) {
        throw error;
    }
}

const getLoggedUser = async (token : string, username: string) => {
    try {
        const response = await fetch(`${ENDPOINT}/persona/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.error_description}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            };
            throw new Error(errorMessage);
        };

        const contentType = response.headers.get('content-type');
        if (!contentType ||!contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        };
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const updateLoggedUser = async (newUser : any, userType : string, token : string, username : string) => { 
    try {
        const response = await fetch(`${ENDPOINT}/persona-${userType}/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUser)
        })

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage += `, message: ${errorData.error_description}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            };
            throw new Error(errorMessage);
        };

        const contentType = response.headers.get('content-type');
        if (!contentType ||!contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        };

        const data = await response.json();
        return data;
    }
    catch (error) {
        throw error;
    }
}

const getProfileImage = async (user : any) => {
    try {
        const response = await fetch(IMAGE_ENDPOINT + `/files/${user.username}/PROFILE_PICTURE`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
            },
        });
        if (!response.ok) {
            throw response
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    } catch (error) {
        throw error;
    }
}

const uploadImage = async (username : string, imageType : string, token : string, image : any) => {
    try {
        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch(IMAGE_ENDPOINT + `/files?idUsuario=${username}&tipo=${imageType}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        
        return response;
    } catch (error) {
        throw error;
    }
}

const verifyUser = async (email : string, code : string) => {
    try {
        const hoy = new Date(Date.now()).toUTCString();
        const result = await fetch(ENDPOINT + `/verificacion`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                template: "CODIGO_VERIFICACION_DE_CORREO",
                codigo: code,
                fecha: hoy
            })
            
        })

        if (!result.ok) {
            let errorMessage = `status: ${result.status}, response: ${result.statusText}`;
            try {
                const errorData = await result.json();
                errorMessage += `, message: ${errorData.error_description}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            };
            throw new Error(errorMessage);
        };

        const contentType = result.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        };

        const data = await result.json();
        console.log('Se validó')
        return data;

    } catch (error) {
        throw error;
    }
}

const sendWelcomeEmail = async (email : string) => {
    try {
        const result = await fetch(`${EMAIL_ENDPOINT}/emails/bienvenida`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: email
            })
        })

        if (!result.ok) {
            let errorMessage = `status: ${result.status}, response: ${result.statusText}`;
            try {
                const errorData = await result.json();
                errorMessage += `, message: ${errorData.error_description}`;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            };
            throw new Error(errorMessage);
        };

        const contentType = result.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format');
        };

        const data = await result.json();
        console.log('Se envio correo bienvenida')
        return data;

    } catch (error) {
        throw error;
    }
}


export { sendUserInfoToAPI, loginUser, useRefreshToken, getLoggedUser, getProfileImage, updateLoggedUser, verifyUser, sendWelcomeEmail, uploadImage };
