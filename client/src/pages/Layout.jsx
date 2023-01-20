
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import background from '../assets/loginImage.jpg'
import usePrivateApi from '../hooks/usePrivateApi'

const Layout = () => {
    usePrivateApi()

  return (
    <main>
        <Navbar/>
        <section className="mt-[80px] flex h-[calc(100vh-80px)]">
          <Sidebar/>
          <div className='w-full overflow-y-scroll'>
          <Outlet />
          <div className='absolute top-0 left-0 w-full h-full opacity-40 z-[-10]'>
              <img className='w-full h-full object-cover' src={background} alt="background" />
          </div>
          </div>
       
        </section>
       
    </main>
  )
}

export default Layout