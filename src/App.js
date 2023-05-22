import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProducts from "./components/AddProducts";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}
        >
          <h2>
            <FadeLoader color="#36d7b7" />
          </h2>
        </div>
      ) : (
        <div>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/product/" element={<Product />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/addproducts/" element={<AddProducts />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
