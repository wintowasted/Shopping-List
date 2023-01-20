import React,{useState, useEffect} from "react";
import {editProduct} from "../api/axios.js"

const EditProductModal = ({ listId, setModal, product, listProducts, setListProducts  }) => {

  const [quantity, setQuantity] = useState(product.quantity)
  const [description, setDescription] = useState(product.description || "")

  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      quantity === " "
      ? await editProduct(listId, product.productId, {quantity, description})
      : await editProduct(listId, product.productId, {quantity: 1, description})
      const updatedList = listProducts.map(p => {
        if(p.productId === product.productId){
          return {...p, quantity, description}
        }
        return p
      })
      setListProducts(updatedList)
      setModal(false)
    } catch (error) {
      console.log(error)
      const errorList = error?.response?.data?.errors?.Quantity || error?.response?.data?.errors?.Description || error?.response?.data?.errors
      setErrorMessage(errorList[0])
    }
  }

  useEffect(() => {
    setErrorMessage("")
}, [quantity, description])

  return (
    <div className="absolute bg-black/40 top-0 left-0 w-full h-screen flex  justify-center">
      <div className="z-10 w-[600px] mt-[10%] rounded-lg">
      <form onSubmit={submitHandler}>
        <div className="bg-green-400 w-full p-6 hover:text-white group">
          <label className="text-sm block" htmlFor="product_name">
            Item name
          </label>
          <input
            className="h-[50px] text-white w-full bg-inherit group-hover:border-b-white border-b-2 border-b-gray-600 outline-none"
            type="text"
            id="product_name"
            value={product?.productName}
            readOnly
          />
        </div>
        <div className="flex flex-col bg-white px-8 py-4">
          
            <div className="flex flex-col">
              <label className="text-sm" htmlFor="quantity">
                Quantity
              </label>
              <input
                value={quantity}
                autoComplete="off"
                className="h-[40px] w-full border-b-2 border-b-gray-600 outline-none"
                type="number"
                id="quantity"
                onChange= {(e) => setQuantity(e.target.value)}
              />
            </div>
           
          

          <div className="mt-4">
          <label className='text-sm' htmlFor="desc">Description</label>
                <input value={description} autoComplete="off" className='h-[40px] w-full border-b-2 border-b-gray-600 outline-none' type="text" id='desc' onChange= {(e) => setDescription(e.target.value)}/>
          </div>

{/* Error Message */}
          <span
         
         className={
           errorMessage ? "text-red-600 text-lg text-center mt-3" : "hidden"
         }
       >
         {errorMessage}
       </span>
          <div className="flex justify-end mt-10">
          <button className="cursor-pointer py-2 px-4" onClick={() => setModal(false)}>CANCEL</button>
          <button className="cursor-pointer py-2 px-4 text-green-400">SAVE</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditProductModal;
