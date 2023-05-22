import React from "react";
import Footer from "../components/Footer";
import Products from "../components/LatestProduct";
import Slider from "../components/Slider";

function Home() {
  return (
    <>
      <div>
        <Slider />
        <Products />
        <Footer />
      </div>
    </>
  );
}

export default Home;
