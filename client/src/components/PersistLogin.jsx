import React, {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { Outlet } from 'react-router'
import useRefreshToken from '../hooks/useRefreshToken'

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const {auth} = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () =>{
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])


  return (
    <>
        {isLoading
        ? <p>Loading...</p>
        : <Outlet/>}
    </>
  )
}

export default PersistLogin