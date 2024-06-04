import { User, UserLogin } from "../interfaces/userInterface";

const ENDPOINT = import.meta.env.VITE_API_USER_ENDPOINT;
const AUTH_ENDPOINT = import.meta.env.VITE_API_AUTH_ENDPOINT;

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
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const getUserInfoFromAPI = async (user: UserLogin) => {
    const userFormData = new FormData();
    userFormData.append('username', user.username);
    userFormData.append('password', user.password);
    userFormData.append('grant_type', user.grant_type);

    try {
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
                errorMessage += `, message: ${errorData.error_description}`;
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
        console.log(data);
        return data; // -> Devolvemos la respuesta :)
    } catch (error) {
        console.log(error);
        throw error; // -> Devolvemos error :(
    }
};

export { sendUserInfoToAPI, getUserInfoFromAPI };
