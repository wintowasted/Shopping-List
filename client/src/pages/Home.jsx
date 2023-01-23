import React, { useEffect, useState} from "react";
import EmptyList from "../components/EmptyList";
import Lists from "../components/Lists";
import useAuth from "../hooks/useAuth";
import {getLists, deleteList} from "../api/axios";
import useLists from "../hooks/useLists";
import CreateNewList from "../components/CreateNewList";
import usePrivateApi from "../hooks/usePrivateApi";

const Home = () => {
  usePrivateApi()
  const {auth} = useAuth()
  const {lists, setLists} = useLists()

  const [createList, setCreateList] = useState(false);
 
  useEffect( () => {
    const getAllLists = async () => {
     try {
      const response = await getLists(auth?.userId)
      console.log(response.data)
      setLists(response?.data)
     } catch (error) {
      console.log(error)
     }
    }
    getAllLists()
}, [])


  const handleDeleteList = async (e, listId) =>{
    e.stopPropagation();
    try {
      const {data: deletedList} = await deleteList(listId)
      const newLists = lists.filter(list => list.listId !== deletedList.listId)
      setLists([...newLists])
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
      <>
      <div className="w-full h-full  flex items-center justify-center">
        {lists.length ? (
          <Lists lists={lists} setCreateList={setCreateList} userId={auth?.userId} handleDeleteList={handleDeleteList} />
        ) : (
          <EmptyList setCreateList={setCreateList} />
        )}
      </div>
      
      <CreateNewList createList={createList} setCreateList={setCreateList} />
  </>
  )
};

export default Home;
