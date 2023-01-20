import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "../api/axios";

import CategoryList from "../components/CategoryList";
import CreateCategoryModal from "../components/CreateCategoryModal";
import CreateProductModal from "../components/CreateProductModal";
import ProductList from "../components/ProductList";

function Products() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([])

  const [addProductModal, setAddProductModal] = useState(false)
  const [addCategoryModal, setAddCategoryModal] = useState(false)


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: result } = await getCategories();
        setCategories(result);
      } catch (error) { 
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: result } = await getProducts();
        setProducts(result);
        setFilterProducts(result)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  return (
    <div className="max-w-[1200px] h-full mx-auto flex justify-evenly pt-10">
        <CategoryList categories={categories} setAddCategoryModal={setAddCategoryModal} products={products} setFilterProducts={setFilterProducts} setCategories={setCategories}  />
        <ProductList products={products} filterProducts={filterProducts} setAddProductModal={setAddProductModal} setProducts={setProducts} setFilterProducts={setFilterProducts} />

        {addProductModal && <CreateProductModal products={products} setAddProductModal={setAddProductModal} setProducts={setProducts} />}
        {addCategoryModal && <CreateCategoryModal categories={categories} setCategories={setCategories} setAddCategoryModal={setAddCategoryModal} />}

        
    </div>
  )
}

export default Products;
