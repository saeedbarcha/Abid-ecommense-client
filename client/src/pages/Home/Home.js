import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import FlashDeals from "../flashDeals/FlashDeals";
import TopCarousel from "../Carousel/TopCarousel";
import TopCategories from "../topCategories/TopCategories";
import NewArrivals from "../newArrivals/NewArrivals";
import Annocument from "../annocument/Annocument";
import Wrapper from "../wrapper/Wrapper";
import "./Homepage.css";

const Home = () => {
  return (
    <>
      <Layout title={"All Products - Best offers "}>
        <TopCarousel />
        <FlashDeals />
        <TopCategories />
        <NewArrivals />
        <Annocument />
        <Wrapper />
      </Layout>
    </>
  );
};

export default Home;
