import React, {useState} from 'react'
import { addList } from '../api/axios'
import { AiOutlineClose } from "react-icons/ai";
import useLists from '../hooks/useLists';

const CreateNewList = ({createList, setCreateList}) => {

    const {lists, setLists} = useLists()

    const [newListName, setNewListName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const createNewList = async (e) => {
        e.preventDefault()
        try {
          const response = await addList(newListName)    
          setCreateList(false)
          setNewListName("")
          setLists([...lists, response.data])
        } catch (error) {
            const errorList = error?.response?.data?.errors.ListName || error?.response?.data?.errors
            setErrorMessage(errorList[0])
        }
      }

      
  return (
    <div
      className={
        createList
          ? "absolute top-0 left-0 h-screen w-full bg-black/90 z-10 flex items-center justify-center"
          : "hidden"
      }
    >
      <div className=" bg-white w-[50%] rounded">
        <div className="p-4 ">
          <form className="flex flex-col" onSubmit={createNewList}>
            <div className="flex justify-between">
              <label className="text-green-400" htmlFor="listName">
                List name
              </label>
              <div
                className="flex justify-center items-center text-xl cursor-pointer"
                onClick={() => setCreateList(false)}
              >
                <AiOutlineClose />
              </div>
            </div>
            <input
              type="text"
              id="listName"
              autoComplete="off"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="h-[50px] border-b-2 border-b-gray-600 focus:outline-none focus:border-b-green-400"
              placeholder="New list..."
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
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewList