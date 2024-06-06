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
        return data
    } catch (error) {
        throw error
    }
};

const getUserInfoFromAPI = async (user: UserLogin) => {
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

export { sendUserInfoToAPI, getUserInfoFromAPI, useRefreshToken };
