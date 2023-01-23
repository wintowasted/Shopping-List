import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiAddCircleLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import EditProductModal from "../components/EditProductModal";
import {
  getProductsOfList,
  addProductToList,
  deleteProductFromList,
  getProducts,
  lockList,
  unlockList,
  selectProduct,
} from "../api/axios";
import ProductsMenu from "../components/ProductsMenu";
import useClickOutside from "../hooks/useClickOutside";

const ListDetail = () => {
  const productMenuRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { list } = state;
  const [selectedProduct, setSelectedProduct] = useState({});
  const [listProducts, setListProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProductsMenu, setOpenProductsMenu] = useState(false);
  const [change, setChange] = useState(false);

  useClickOutside(() => {
    setOpenProductsMenu(false);
  }, productMenuRef);

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const { data: products } = await getProductsOfList(list.listId);
        setListProducts([...products]);
      } catch (error) {
        console.log(error);
      }
    };
    getListProducts();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data: result } = await getProducts();
        setProducts(result);
        setFilterProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  const addProductHandler = async (product) => {
    try {
      const { data: result } = await addProductToList(
        list.listId,
        product.productId
      );
      const x = listProducts.find((p) => p.productId === product.productId);

      if (x == undefined) {
        product.isSelected = true;
        product.quantity = 1;
        setListProducts([...listProducts, product]);
      } else {
        const newList = listProducts.map((p) => {
          if (p.productId === product.productId) {
            return { ...p, quantity: parseInt(p.quantity) + 1 };
          }
          return p;
        });

        setListProducts(newList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      const { data: result } = await deleteProductFromList(list.listId, id);
      const newProducts = listProducts.filter((p) => p.productId !== id);
      setListProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const openProductsMenuModal = () => {
    products.map((p) => {
      let found = false;
      listProducts.forEach((l) => {
        if (p.productId === l.productId) {
          found = true;
        }
      });
      if (found) p.isSelected = true;
      else p.isSelected = false;
      return p;
    });
    setOpenProductsMenu(true);
  };

  const handleLockList = async () => {
    if (list.isLocked) {
      try {
        await unlockList(list.listId);
        const newProducts = listProducts.filter((p) => !p.isChecked);
        setListProducts(newProducts);
        list.isLocked = false;
        setChange((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await lockList(list.listId);
        list.isLocked = true;
        setChange((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectProduct = async (id) => {
    try {
      const { data: res } = await selectProduct(list.listId, id);
      const newProducts = listProducts.map((p) => {
        if (p.productId === id) {
          return { ...p, isChecked: !p.isChecked };
        }
        return p;
      });
      setListProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-[70%] self-start mt-10 pb-12">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold mb-4">{list.listName}</p>
            <button
              className={
                list.isLocked
                  ? "bg-purple-600 text-white rounded-3xl h-10 px-3 text-sm font-semibold"
                  : "bg-green-300 rounded-3xl h-10 px-3 text-sm font-semibold"
              }
              onClick={handleLockList}
            >
              {list.isLocked ? "Complete" : "Go Shopping"}
            </button>
          </div>
          <div className=" shadow-lg  mx-auto p-4 rounded pb-4 hover:shadow-2xl border-2 bg-white  ">
            <div
              className="cursor-pointer float-right"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
            </div>

            <div
              ref={productMenuRef}
              className={
                list.isLocked
                  ? "hidden"
                  : "wfull bg-green-400 flex items-center px-4 gap-x-3 mt-8 py-2 cursor-pointer rounded-2xl relative"
              }
              onClick={openProductsMenuModal}
            >
              <div className="text-3xl text-white">
                <RiAddCircleLine />
              </div>
              <span className="text-2xl text-white">Add Item</span>
              {/* List for products menu */}
              <div
                className={
                  openProductsMenu
                    ? "absolute bg-white top-[54px] left-0 w-full z-100 rounded "
                    : "hidden"
                }
              >
                <div className="w-full px-6">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="rounded-xl py-2 w-full pl-7 bg-search bg-no-repeat bg-left bg-sm focus:outline-none border-2 "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <ProductsMenu
                  products={products}
                  addProductToList={addProductHandler}
                  search={search}
                />
              </div>
            </div>

            {/* List products of selected*/}
            {listProducts.map((product) => {
              return (
                <div key={product.productId}>
                  <div className="w-full flex justify-between items-center bg-white mt-2 rounded-md px-8 py-4">
                    <div className="flex items-center gap-x-6">
                      {list.isLocked && (
                        <input
                          className="cursor-pointer"
                          id="checkProduct"
                          type="checkbox"
                          checked={product.isChecked ? "yes" : undefined}
                          onChange={() =>
                            handleSelectProduct(product.productId)
                          }
                        />
                      )}
                      <div className="flex flex-col justify-center items-center">
                        <label
                          className={
                            product.isChecked
                              ? "text-xl text-gray-600/80 line-through"
                              : "text-xl"
                          }
                          htmlFor="checkProduct"
                        >
                          {product.productName}
                        </label>
                        {product.description && (
                          <span className="text-sm text-gray-600/60">
                            {product.description}
                          </span>
                        )}
                      </div>
                      <div
                        className={
                          list.isLocked
                            ? "hidden"
                            : "text-xl cursor-pointer ml-4"
                        }
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenEditModal(true);
                        }}
                      >
                        <MdEdit />
                      </div>
                    </div>
                    <div className="flex items-center gap-x-6 text-xl">
                      {product.quantity > 1 && <span>{product.quantity}</span>}
                      <div className="cursor-pointer h-[35px] w-[35px]">
                        <img
                          className="h-full object-contain w-full"
                          src={`data:image/svg+xml;base64,${product.productImage}`}
                          alt="product"
                        />
                      </div>
                      <div
                        className={
                          list.isLocked
                            ? "hidden"
                            : "cursor-pointer hover:text-red-600"
                        }
                        onClick={() => deleteProductHandler(product.productId)}
                      >
                        <IoMdTrash />
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/* Open edit modal */}
                </div>
              );
            })}
            {openEditModal && (
              <EditProductModal
                listId={list.listId}
                product={selectedProduct}
                setModal={setOpenEditModal}
                listProducts={listProducts}
                setListProducts={setListProducts}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListDetail;
