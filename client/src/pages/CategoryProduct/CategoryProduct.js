import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useParams, useNavigate } from "react-router-dom";
import ProductCart from "../../components/ProductCart/ProductCart";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineReload } from "react-icons/ai";



const CategoryProduct = () => { 
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  
  const [count, setCount] = useState(0);


  const increment = () => {
    setCount(count + 1);
  };

  
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            

            <div className="row flex">
              {products?.map((product) => (
                <ProductCart key={product._id} product={product} />
                
              ))}
            </div>
 

            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
