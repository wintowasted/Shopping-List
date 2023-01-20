import React, {useState, useEffect} from "react";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import addButton from "../assets/addListbutton.svg";
import { deleteCategory} from "../api/axios";
import EditCategoryModal from "./EditCategoryModal";

function CategoryList({
  categories,
  setAddCategoryModal,
  products,
  setFilterProducts,
  setCategories,
}) {
  
  const [selectedCategory, setSelectedCategory] = useState(0)

  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    if(selectedCategory === 0){
      setFilterProducts(products)
      return
    }
    const filteredProducts = products.filter(p => p.categoryId === selectedCategory)
    setFilterProducts(filteredProducts)
  }, [selectedCategory])

  const deleteCategoryHandler = async (e,id) => {
    e.stopPropagation()
    try {
      await deleteCategory(id)
      if(selectedCategory === id)
        setSelectedCategory(0)
      const newCategories = categories.filter(c => c.categoryId !== id)
      setCategories(newCategories)
      
    } catch (error) {
      console.log(error)
    }
  }

  const editCategoryHandler = (e, id) => {
    e.stopPropagation()
    setEditId(id)
    setEditCategoryModal(true)
  }
  
  return (
    <>
 
    <div className="w-[250px]  flex-shrink-0 ">
      <h2 className="text-[#5d3ebc]">Categories</h2>
      <div className=" relative pb-2 bg-white  rounded-xl mt-3 flex flex-col items-center ">
        <div
          className=" cursor-pointer h-[30px] absolute right-0 top-0 translate-x-[50%] translate-y-[-50%] "
          onClick={() => setAddCategoryModal(true)}
        >
          <img className="h-full" src={addButton} alt="add" />
        </div>
        <div className="w-full cursor-pointer flex justify-center font-semibold items-center  h-12 hover:bg-[rgba(93,62,188,0.12)] border-b-2" onClick={() => setSelectedCategory(0)}>
          Reset Filter
        </div>
        {categories?.map((category) => {
          return (
            <div
              className={selectedCategory === category.categoryId ? "w-full rounded-lg cursor-pointer flex justify-around items-center h-12 bg-[#5d3ebc] text-white transition-all duration-300 ease-in-out" : "w-full cursor-pointer flex justify-around items-center rounded-lg h-12 hover:bg-[rgba(93,62,188,0.12)]"}
              key={category.categoryId}
              onClick={() => setSelectedCategory(category.categoryId)}
            >
              <span className="text-lg " >{category.categoryName}</span>
              <div className="flex text-lg gap-x-3">
                <div className="hover:text-yellow-600" onClick={(e) => editCategoryHandler(e, category.categoryId)}>
                  <MdEdit />
                </div>
                <div className="hover:text-red-600" onClick={(e) => deleteCategoryHandler(e,category.categoryId)}>
                  <IoMdTrash />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {editCategoryModal && <EditCategoryModal categoryId={editId} categories={categories} setCategories={setCategories} setEditCategoryModal={setEditCategoryModal} />}
    </>
  );
}

export default CategoryList;
