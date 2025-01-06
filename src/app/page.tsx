'use client'

import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TopCategories from "./components/TopCategories";
import Feature from "./components/FeatureProduct";
import Offers from "./components/Offers";
import Unique from "./components/Unique";
import TrendingProducts from "./components/TrendingProducts";
import Discount from "./components/Discount";
import BlogSection from "./components/BlogSection";
import LatestProducts from "./components/LatestProduct";
import Newslater from "./components/NewsLater";


function Homepage(){
  return(
    <div>
      <Header />
      <Hero />
      <Feature />
      <LatestProducts />
      <Offers />
      <Unique />
      <TrendingProducts />
      <Discount />
      <TopCategories />
      <Newslater />
      <BlogSection />
      <Footer />
    </div>
  )
}

export default Homepage;