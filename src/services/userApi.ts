import { User } from "../interfaces/userInterface"

const ENDPOINT = import.meta.env.VITE_API_USER_ENDPOINT


const sendUserInfoToAPI = async (user : User, userType : string) => {
    try {
      const response = await fetch(ENDPOINT + '/persona-' + userType, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

    if (!response.ok) {
        let errorMessage = `status: ${response.status}, response: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage += `, message: ${errorData.message}`
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError)
        }
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType ||!contentType.includes('application/json')) {
        throw new TypeError('Received response is not in JSON format')
      }

      const data = await response.json()
      console.log(data)
    }
    catch (error) {
      console.error(error)
    }
}

const getUserInfoFromAPI = async (user : User) => {
    try {
        const response = await fetch(ENDPOINT + '/persona-fisica/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            let errorMessage = `status: ${response.status}, response: ${response.statusText}`
            try {
              const errorData = await response.json()
              errorMessage += `, message: ${errorData.message}`
            } catch (jsonError) {
              console.error('Error parsing JSON:', jsonError)
            }
            throw new Error(errorMessage)
        }
        
        const contentType = response.headers.get('content-type')
        if (!contentType ||!contentType.includes('application/json')) {
            throw new TypeError('Received response is not in JSON format')
        }

    } catch (error) {
        console.log(error)
    }
}




export { sendUserInfoToAPI}