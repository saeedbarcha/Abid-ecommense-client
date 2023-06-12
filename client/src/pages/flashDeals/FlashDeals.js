import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import { useCart } from "../../context/cart";
import { FaHeart } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineReload } from "react-icons/ai";
import { MdFlashOn } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import ProductCart from "../../components/ProductCart/ProductCart";
import "./flashdeals.css";

const FlashDeals = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const moreIcon = {
    width: "30px",
    height: "30px",
    color: "#e94560",
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(products)
  // const options = {
  //   edit: false,
  //   color: "rgba(20, 20, 20, 0.1)",
  //   activeColor: "#FFB319",
  //   size: window.innerWidth < 600 ? 15 : 25,
  //   value: 4,
  //   isHalf: true,
  // };

  return (
    <>
      <div
        id="FlashDeals"
        className="container-fluid  mt-3 mainContFreshDeals"
        style={{ display: "flex" }}
      >
        <div className="row">
          <div className=" col-md-3 filters  ">
            <h4 className="">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
             {/* price filter  */}
            <h4 className=" mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn-resetFilter"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
            <div className="m-2 p-3 loadMoreCont">
              {products && products.length < total && (
                <button
                  className=" loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <section className="flash col-md-9">
          <div className="row">
          <div className="col-12">
          <div className="heading1 f_flex">
              <div className="f_flex1">
                <MdFlashOn
                  style={{ width: "40px", height: "40px", color: "#DF711B" }}
                />
                <h2>Flash Deals</h2>
              </div>
              <div className="">
                <span>View all</span>
                <BsPlayFill style={moreIcon} />
              </div>
            </div>
         </div>   
          </div>
            
            <div className="row flex">
              {products?.map((product) => (
                <ProductCart key={product._id} product={product} />
             
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FlashDeals;

