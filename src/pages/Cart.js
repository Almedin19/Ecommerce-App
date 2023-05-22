import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { db } from "../Firebase/firebase";
import "../App.css";
import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

function Cart(product) {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const productCard = collection(db, "cardItems");
    const getProductList = async () => {
      try {
        const data = await getDocs(productCard);
        const filterCard = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          qty: 1,
        }));
        console.log(filterCard);
        setCardList(filterCard);
      } catch (error) {
        console.log(error);
      }
    };
    getProductList();
  }, []);

  const deleteProd = async (id) => {
    const prodDoc = doc(db, "cardItems", id);
    await deleteDoc(prodDoc);
    setInterval(() => {
      window.location.reload(false);
    }, 2000);
    toast.success("Product deleted");
  };

  const handleDecrement = (id, cardItem) => {
    setCardList((cardList) =>
      cardList.map((cardItem) =>
        cardItem.id === id
          ? { ...cardItem, qty: cardItem.qty > 1 ? cardItem.qty - 1 : 1 }
          : cardItem
      )
    );
  };

  const handleIncrement = (id, cardItem) => {
    setCardList((cardList) =>
      cardList.map((cardItem) =>
        cardItem.id === id ? { ...cardItem, qty: cardItem.qty + 1 } : cardItem
      )
    );
  };

  const totalPrice = cardList.reduce(
    (total, cardItem) => total + cardItem.qty * cardItem.price,
    0
  );

  return (
    <div>
      <Table className="mt-3">
        {cardList.length >= 1 && (
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
        )}
        {cardList.map((cardItem) => (
          <tbody>
            <tr>
              <td>
                <img
                  src={cardItem.imageUrl}
                  alt={cardItem.title}
                  style={{ width: "100px", padding: "10px" }}
                />
                {cardItem.title}
                <Button
                  variant="p"
                  className="d-block text-muted "
                  onClick={() => deleteProd(cardItem.id)}
                >
                  DELETE
                </Button>
              </td>
              <td style={{ position: "relative", top: "40px" }}>
                € {cardItem.price}
              </td>
              <td style={{ position: "relative", top: "40px" }}>
                <div className="input-group">
                  <button
                    type="button"
                    onClick={() => handleDecrement(cardItem.id)}
                    className="input-group-text"
                  >
                    -
                  </button>
                  <div className="p-2 text-center">{cardItem.qty}</div>
                  <button
                    rt
                    type="button"
                    onClick={() => handleIncrement(cardItem.id)}
                    className="input-group-text"
                  >
                    +
                  </button>
                </div>
              </td>
              <td style={{ position: "relative", top: "40px" }}>
                € {cardItem.qty * cardItem.price.toLocaleString()}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {cardList.length >= 1 && (
        <Card body style={{ border: "none" }}>
          <Card.Text className="mt-2 mb-2  h5 ">
            SubTotal{" "}
            <span style={{ position: "relative", left: "160px" }}>
              € {totalPrice}
            </span>
          </Card.Text>
          <Card.Text>Taxes and shipping calculated at checkout.</Card.Text>
          <StripeCheckout
            panelLabel="Pay Here"
            image="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
            className="mb-3 w-200 d-block"
            stripeKey="pk_test_51Mwn17Lvuopaq3y0nPqrElmWIxeAVcevUIXacnZUN4AnaHzDXVdRKTZG5WyDEu0aJ7zS98WxySIurW5BtFVm02FS00MSQG03mp"
            name="Online Shooping"
            label="Pay Online"
            //email="almedinmurati1@gmail.com"
            description={`Your Payment amount is  € ${totalPrice}`}
          >
            <Button variant="primary" className="d-block mb-2 w-25 poster">
              Payment
            </Button>
          </StripeCheckout>
          <Card.Text>
            <Link
              to="/product"
              style={{
                textDecoration: "none",
                padding: "5px",
                color: "grey",
              }}
            >
              <BsArrowLeft style={{ marginRight: "5px" }} />
              Continue Shopping
            </Link>
          </Card.Text>
        </Card>
      )}

      {cardList.length < 1 && (
        <div className="no-prod">
          <h3>No Product In Cart</h3>
          <Link
            to="/product"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "grey",
              fontSize: "23px",
            }}
          >
            <BsArrowLeft style={{ marginRight: "5px" }} />
            Start to Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
