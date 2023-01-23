import {privateAPI} from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'

const usePrivateApi = () => {
    const {auth} = useAuth()
    const refresh = useRefreshToken();
    useEffect(() => {

        const requestIntercept = privateAPI.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                if(!config.withCredentials){
                    config.withCredentials = true
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = privateAPI.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateAPI(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAPI.interceptors.request.eject(requestIntercept)
            privateAPI.interceptors.response.eject(responseIntercept);
        }
    },[auth, refresh])


    return privateAPI
}

export default usePrivateApi
