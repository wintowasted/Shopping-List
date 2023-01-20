import React from 'react'
import listImage from '../assets/listImage.jpg'
import addButton from '../assets/addListbutton.svg'

const EmptyList = ({ setCreateList}) => {

   const addList = () => {
    setCreateList(true)
   }
 
  return (
    <div className='flex items-center flex-col justify-center gap-y-3 mb-2 ' >
                <div className='w-[120px] h-[150px] flex justify-center items-center' >
                <img className='w-full h-full opacity-80' src={listImage} alt="listImg" />
                </div>
                <p className='text-gray-800/50  text-center ' >
                    Create your first list with pressing <br/>the button below
                </p>
                <div className='w-[50px] cursor-pointer opacity-80' onClick={addList}>
                <img  src={addButton} alt="add" />
                </div>        
    </div>
  )
}

export default EmptyList