import React, { useState, useEffect } from "react";
import AdminMenu from "../../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./productsList.css";

const Products = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");


  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);


   //get single product
   const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id); 
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      // navigate("/dashboard/admin/products");
      // window.location.reload();
      getAllProducts()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 mt-5">
          <h1 className="text-center">All Products List</h1>
          <div className="productListCont">
            {products?.map((p) => (
              <div className="productList">
                <img
                  className="productList-image"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt="Product"
                />
                <h2 className="productList-name">{p.name}</h2>

                <div className="productList-rating">
                  <span className="productList-rating-stars">
                    <ReactStars
                      edit={false}
                      color={"rgba(20, 20, 20, 0.1)"}
                      activeColor={"#FFB319"}
                      size={window.innerWidth < 600 ? 15 : 25}
                      value={p.ratings}
                      isHalf={true}
                    />
                  </span>
                  <span className="productList-rating-number">
                    ({p.ratings.toFixed(1)})
                  </span>
                </div>
                <p className="productList-reviews">{`Review (${p.numOfReviews})`}</p>
                <p className="productList-reviews">{`stock (${p.quantity})`}</p>
                <p className="productList-price">${p.price}.00</p>
                <div className="productListBtnCont">
                <button className="productList-delete-btn"  onClick={() => {
                              handleDelete(p._id);
                            }} >Delete</button>
                <button className="productList-update-btn">
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} style={{color:"white", textDecoration:"none"}}>
                    Update
                  </Link>
                </button>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
