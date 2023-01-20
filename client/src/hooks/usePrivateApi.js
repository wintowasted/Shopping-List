import {privateAPI} from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'

const usePrivateApi = () => {
    const {auth} = useAuth()

    useEffect(() => {

        const requestIntercept = privateAPI.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        return () => {
            privateAPI.interceptors.request.eject(requestIntercept)
        }
    },[auth])


    return privateAPI
}

export default usePrivateApi
