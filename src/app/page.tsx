'use client'

import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TopCategories from "./components/TopCategories";
import Offers from "./components/Offers";
import Unique from "./components/Unique";
import TrendingProducts from "./components/TrendingProducts";
import Discount from "./components/Discount";
import BlogSection from "./components/BlogSection";
import LatestProducts from "./components/LatestProduct";
import Newslater from "./components/NewsLater";
import FeaturedProducts from "./components/FeatureProduct";



function Homepage(){
  return(
    <div>
      <Header />
      <Hero />
      <FeaturedProducts />
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