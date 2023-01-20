import React from 'react'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import {RiFileList3Line} from 'react-icons/ri'

const Sidebar = () => {
  const {setAuth} = useAuth()
  const navigate = useNavigate()
  
  return (
    <div className="h-full bg-white shadow-lg w-[260px] flex-shrink-0 flex flex-col text-lg gap-y-4 ">
      
      <div className='flex items-center  hover:bg-gray-600/10 cursor-pointer gap-x-3 py-3 pl-16' onClick={() => navigate('/lists')}>
        <div>
          <RiFileList3Line/>
        </div>
        <span>Lists</span>
      </div>
      <div className='flex items-center  hover:bg-gray-600/10 cursor-pointer gap-x-3 py-3 pl-16' onClick={() => navigate('/products')}>
        <div>
          <MdProductionQuantityLimits/>
        </div>
        <span>Products</span>
      </div>
      <div className='flex items-center  hover:bg-gray-600/10 cursor-pointer gap-x-3 py-3 pl-16' onClick={() => setAuth({})}>
        <div>
          <BiLogOut/>
        </div>
        <span>Log Out</span>
      </div>

    </div>
  )
}

export default Sidebar