import { useRefreshToken } from './userApi';
import createRefresh from 'react-auth-kit/createRefresh';

// Define the expected response type for better type checking
type RefreshTokenCallbackResponse<T> = {
  isSuccess: true;
  newAuthToken: string;
  newAuthTokenExpireIn: number;
  newRefreshTokenExpiresIn: number;
} | {
  isSuccess: false;
  newAuthToken: string; // Ensure this is a string in both cases
  newAuthTokenExpireIn?: undefined;
  newRefreshTokenExpiresIn?: undefined;
};

const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token
  refreshApiCallback: async (param: { authToken?: string; refreshToken?: string; authUserState: unknown; }): Promise<RefreshTokenCallbackResponse<unknown>> => {
    try {
      const response = await useRefreshToken(param.refreshToken);
      const data = await response.json();
      console.log('refreshing');
      return {
        isSuccess: true,
        newAuthToken: data.access_token,
        // newRefeshToken: data.refresh,
        newAuthTokenExpireIn: data.expires_in,
        newRefreshTokenExpiresIn: 60
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: '' // Provide a default string value
      };
    }
  }
});

export default refresh;