import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
// review
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Rating from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineReload } from "react-icons/ai";
import ProductCart from "../../components/ProductCart/ProductCart";

import "./ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [count, setCount] = useState(0);
  // review
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [id, setId] = useState("");
  // review
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const moreIcon = {
    width: "30px",
    height: "30px",
    color: "#e94560",
  };

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setId(data.product._id);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("comment", review);
      productData.append("rating", rating);

    
      if(review){
        const { data } = axios.put(
          `/api/v1/product/update-product/${id}/review`,
          productData,
          id
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Review Added Successfully");
          // navigate("/dashboard/admin/products");
        }
      }else{
        toast.error("Review Must Have More Then 3 characters");
      }

    
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

    setOpen(false);
  };

  // review
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const increment = () => {
    setCount(count + 1);
  };

  // const options = {
  //   edit: false,
  //   color: "rgba(20, 20, 20, 0.1)",
  //   activeColor: "#FFB319",
  //   size: window.innerWidth < 600 ? 15 : 25,
  //   value: product.ratings,
  //   isHalf: true,
  // };

  //get similar product
  //  const getProductReviews = async (pid) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/product/related-product/${pid}/review`
  //     );
  //     setRelatedProducts(data?.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(product);
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* review */}
      <hr />
      <div>
        <div className="text-center">
          <button class="btn btn-primary ms-1" onClick={handleClickOpen}>
            {" "}
            Leave a Review
          </button>
          <br />
        </div>
        <h4 className="text-center">
          {" "}
          <u>Clients Reviews</u>
        </h4>
        <div className="reviewMainCont">
          {product?.reviews?.map((r, index) => (
            <div key={index} className="reviewCont" style={{display:"flex", alignItems:"center" }}>
              {/* <div className="imgMainCont"> */}
              <div
                className="imgMainCont"
                style={{
                  width: "45px",
                  height: "45px",
                  border: "3px solid gray",
                  backgroundColor: "linear-gradient(to right, red , yellow)",

                  borderRadius: "50%",
                  textAlign: "center",
                  verticalAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {r.name[0]}
              </div>
              <div className="nameCommentCont">
                <p
                  style={{
                    margin: " 0 auto",
                    marginLeft: "0px",
                    lineHeight: "16px",
                  }}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {r.name}{" "}
                  </span>{" "}
                  <br />
                  {r.comment}
                </p>
              </div>

              <div className="ratingCont">
                <div
                  style={{
                    display: "flex",
                    justifyContent:"center",
                    alignContent: "center",
                  }}
                >
                  <ReactStars 
                    edit={false}
                    color={"rgba(20, 20, 20, 0.1)"}
                    activeColor={"#FFB319"}
                    size={window.innerWidth < 600 ? 10 : 15}
                    value={r.rating}
                    isHalf={true}
                  />
                  <p style={{marginLeft:"8px"}}>{r.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your thoughts and rate this item
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Review"
            type="text"
            fullWidth
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Rating
              count={5}
              onChange={handleRatingChange}
              size={24}
              activeColor="#FFB319"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {/*  review  */}
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <h4 className="text-center">
            <u> No Similar Products found</u>
          </h4>
        )}
        <div className="row flex">
          {relatedProducts?.map((p) => (
            <ProductCart key={product._id} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
