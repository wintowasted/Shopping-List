import React,{useState} from 'react'
import addButton from "../assets/addListbutton.svg";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import UpdateProductModal from './UpdateProductModal';
import { deleteProduct } from '../api/axios';



const ProductList = ({filterProducts, products, setProducts, setAddProductModal, setFilterProducts}) => {
  const [editProductModal, setEditProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  const [search, setSearch] = useState("")

  const deleteProductHandler = async (e,id) => {
    e.stopPropagation()
    try {
      await deleteProduct(id)
      const newProducts = products.filter(p => p.productId !== id)
      setProducts(newProducts)
    } catch (error) {
      console.log(error)
    }
  }

  const editProductHandler = (e, product) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setEditProductModal(true)
  }

  
  return (
    <>
    <div className="w-[600px] ">
        <h2 className="text-[#5d3ebc]">Products</h2>
        <input type="text" placeholder='Search...' className='rounded-xl py-2  pl-7 bg-search bg-no-repeat bg-left bg-sm focus:outline-none border-2 ' onChange={(e) => setSearch(e.target.value)}/> 
        <div className="relative grid grid-cols-5 mt-3 gap-x-2 gap-y-3 border-2">
          <div className=" cursor-pointer h-[30px] absolute right-0 top-0 translate-x-[50%] translate-y-[-50%] " onClick={() => setAddProductModal(true)}>
            <img className="h-full" src={addButton} alt="add" />
          </div>
          {filterProducts.filter(p => {
            return search === "" ? p : p.productName.toLowerCase().includes(search)
          }).map((product) => {
            return (
              <div
                className="w-[100px] h-[100px]  flex flex-col  justify-between py-1 bg-white items-center hover:bg-[rgba(93,62,188,0.12)] rounded-lg shadow-md cursor-pointer group"
                key={product.productId}
              >
                <div className='w-full px-2 flex justify-between'>
                  <div className=' hover:text-yellow-600' onClick={(e) => editProductHandler(e, product)}>
                    <MdEdit/>
                  </div>
                  <div className='hover:text-red-600' onClick={(e) => deleteProductHandler(e, product.productId)}>
                    <IoMdTrash/>
                  </div>
                </div>
                <div className="h-[50px] w-[50px] ">
                  <img
                    className="h-full object-contain w-full"
                    src={`data:image/svg+xml;base64,${product.productImage}`}
                    alt="product"
                  />
                </div>
                <span className=" group-hover:text-[#5d3ebc] font-semibold">
                  {product.productName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {editProductModal && <UpdateProductModal product={selectedProduct} products={products} setProducts={setProducts} setEditProductModal={setEditProductModal} />}
      </>
  )
}

export default ProductList