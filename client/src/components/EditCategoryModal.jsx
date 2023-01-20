import React, {useState, useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {updateCategory} from '../api/axios'

const EditCategoryModal = ({categoryId,categories, setCategories, setEditCategoryModal}) => {

    const [categoryName, setCategoryName] = useState("")
    
    const [errorMessage, setErrorMessage] = useState("")

    const editCategoryHandler = async (e) => {
        e.preventDefault()
        try {
            const {data: res} = await updateCategory(categoryId,{categoryName})
            const newCategories = categories.map(c => {
                if(c.categoryId === categoryId){
                    return {...c, categoryName}
                }
                return c
            })
            setCategories(newCategories)
            setEditCategoryModal(false)
        } catch (error) {
          const errorList = error?.response?.data?.errors.CategoryName || error?.response?.data?.errors
            setErrorMessage(errorList[0])
        }
    }

    useEffect(() => {
        setErrorMessage("")
    }, [categoryName])


  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-black/90 z-10 flex items-center justify-center">
      <div className=" bg-white w-[50%] rounded">
        <div className="p-4 ">
          <form className="flex flex-col" onSubmit={editCategoryHandler}>
            <div className="flex justify-between">
              <label className="text-green-400" htmlFor="category-name">
                Category Name
              </label>
              <div
                className="flex justify-center items-center text-xl cursor-pointer"
                onClick={() => setEditCategoryModal(false)}
              >
                <AiOutlineClose />
              </div>
            </div>
            <input
              type="text"
              id="category-name"
              autoComplete="off"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="h-[50px] border-b-2 border-b-gray-600 focus:outline-none focus:border-b-green-400"
              placeholder="Edit category name..."
            />
             {/* Error Message */}
          <span
         
         className={
           errorMessage ? "text-red-600 text-lg text-center mt-3" : "hidden"
         }
       >
         {errorMessage}
       </span>
            <button className="self-end text-green-400 py-2 px-3 hover:bg-gray-600/10 rounded transition-all ease-in-out duration-300 mt-4">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal