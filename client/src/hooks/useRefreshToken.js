import {refreshToken} from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const {data: response} = await refreshToken();
        const {token: accessToken, role, userId} = response
        setAuth(prev => ({...prev, accessToken, role, userId}))
        return response?.token
    }

  return refresh;
}

export default useRefreshToken