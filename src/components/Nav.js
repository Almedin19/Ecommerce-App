import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successesfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const [displayName, setDisplayName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setDisplayName(user.displayName);
        console.log(user.displayName);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setDisplayName("");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>

        <Link to="/product/">Product</Link>

        <Link to="/cart/">
          Cart <FaShoppingCart />
        </Link>

        {isLoggedIn ? (
          <Link to="/" onClick={logoutUser}>
            LogOut
          </Link>
        ) : (
          <Link to="/register">
            <FaUserCircle /> Register
          </Link>
        )}
        {displayName && `${displayName}`}
      </nav>
    </>
  );
}

export default Nav;
