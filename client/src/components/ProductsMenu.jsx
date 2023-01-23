import React from "react";
import { IoIosAddCircle } from "react-icons/io";

const ProductsMenu = ({  products, addProductToList, search}) => {


  return (
    <div className="overflow-y-scroll mt-2 max-h-[500px] ">
       <hr />
      {products.filter(p => {
        return search === "" ? p : p.productName.toLowerCase().includes(search)
      })
      .map((product) => {
        return (
          <div key={product.productId}>
       
            <div
              className={product.isSelected ? "flex justify-between items-center h-[60px] rounded-md bg-gradient-to-r from-[#005aa7]/30 to-[#fffde4]/80 px-8 focusDiv" : "flex justify-between items-center h-[60px] hover:bg-black/20 px-8"}
              onClick={() => {
                addProductToList(product)
              }}
            >
              <div className="flex items-center gap-x-3 text-xl ">
                <div className={product.isSelected ? "text-3xl text-green-600/80 add__button" : " text-3xl text-gray-600/90 "}  >
                  <IoIosAddCircle />
                </div>
                <span >{product.productName}</span>
              </div>
              <div className="h-[30px] w-[30px]">
                <img className="h-full w-full object-contain" src={`data:image/svg+xml;base64,${product.productImage}`} alt="" />
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsMenu;
