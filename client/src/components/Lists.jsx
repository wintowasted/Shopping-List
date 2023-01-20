import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import addButton from '../assets/addListbutton.svg'

function Lists({ lists, setCreateList, handleDeleteList }) {
  const navigate = useNavigate();

  const addList = () => {
    setCreateList(prev => !prev)
  }

  
  return (
    <div className="w-full self-start mt-16 pb-16 grid gap-y-8 ">
      {lists.map((list) => {
        return (
          <div className="bg-white border-2 shadow-lg w-[70%]  mx-auto p-4 rounded pb-8 hover:shadow-2xl cursor-pointer" key={list.listId} onClick={() => {navigate(`${list.listId}`,{state:{list}})} }>
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">{list.listName}</span>
              <div className="rounded-2xl hover:text-red-600/80" onClick={(e) => handleDeleteList(e, list.listId)}>
                <IoMdTrash className="cursor-pointer text-xl" />
              </div>
            </div>
            <div className="border-b-2 border-b-black/10 mt-3"/>
          </div>
        );
      })}

      <div className="absolute top-12 right-[12%] w-[60px] flex justify-center items-center cursor-pointer z-[1000]" onClick={addList}>
        <img src={addButton} alt="addImg" />
      </div>
    </div>
  );
}

export default Lists;
