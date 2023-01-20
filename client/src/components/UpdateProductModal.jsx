import React,{useState, useEffect} from 'react'
import { updateProduct } from '../api/axios'

const UpdateProductModal = ({products, setEditProductModal, setProducts, product}) => {

    const [productName, setProductName] = useState(product.productName)
    const [categoryName, setCategoryName] = useState(product.category.categoryName)
    const [productImage, setProductImage] = useState(null)
    
    const [errorMessage, setErrorMessage] = useState("")

    const submitHandler = async (e) => {
   
      e.preventDefault()
      try {
        const {data: res} = await updateProduct(product.productId, {productName, categoryName, productImage})
        console.log(res)
        const updatedProducts = products.map(p => {
            if(p.productId === product.productId){
                return {...p, productName, category: res.category , productImage: res.productImage}
            }
            return p
        })
        setProducts(updatedProducts)
        setEditProductModal(false)
      } catch (error) {
        console.log(error)
        const errorMsg = error?.response?.data?.errors.ProductName  || error?.response?.data?.errors.CategoryName 
        || error?.response?.data?.errors.ProductImage || error?.response?.data?.errors
        console.log(errorMsg)
        setErrorMessage(errorMsg[0])
      }
   
    }

    useEffect(() => {
        setErrorMessage("")
    }, [productName, categoryName])
  

    return (
        <div className="absolute bg-black/40 top-0 left-0 w-full h-screen flex  justify-center">
          <div className="z-10 w-[600px] mt-[10%] rounded-lg">
          <form onSubmit={submitHandler}>
            <div className="bg-green-400 w-full p-6 hover:text-white group">
              <label className="text-sm block" htmlFor="product_name">
                Product Name
              </label>
              <input
                className="h-[50px] text-white w-full bg-inherit group-hover:border-b-white border-b-2 border-b-gray-600 outline-none"
                type="text"
                id="product_name"
                autoComplete='off'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col bg-white px-8 py-4">
              
                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="category">
                     Category
                  </label>
                  <input
                    required
                    value={categoryName}
                    autoComplete="off"
                    className="h-[40px] w-full border-b-2 border-b-gray-600 outline-none"
                    type="text"
                    id="category"
                    onChange= {(e) => setCategoryName(e.target.value)}
                  />
                </div>
               
              <div className="mt-4">
              <label className='text-sm' htmlFor="image">Image (.svg only)</label>
                    <input required  className='h-[40px] w-full border-b-2 border-b-gray-600 outline-none' type="file" id='image' accept='image/svg+xml' onChange= {(e) => setProductImage(e.target.files[0])}/>
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
              <button className="cursor-pointer py-2 px-4" onClick={() => setEditProductModal(false)}>CANCEL</button>
              <button className="cursor-pointer py-2 px-4 text-green-400">SAVE</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      );
}

export default UpdateProductModal