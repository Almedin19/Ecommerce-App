import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { db } from "../Firebase/firebase";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import { where, orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Product(cardItem, q) {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const productCollection = collection(db, "products");
    const q = query(productCollection, orderBy("title"));

    const getProductList = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs;
        const filterData = docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductList(filterData);
      } catch (error) {
        console.log(error);
      }
    };
    getProductList();
  }, []);

  const addToCart = async (product) => {
    try {
      await addDoc(collection(db, "cardItems"), {
        title: product.title,
        price: product.price,
        description: product.description,
        qty: product.qty,
        imageUrl: product.imageUrl,
      });
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const searchProducts = async (e) => {
    e.preventDefault();
    const searchQuery = search.toLowerCase();
    const productCollection = collection(db, "products");
    const q = query(
      productCollection,
      where(
        "title",
        ">",
        searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
      ),
      where(
        "title",
        "<",
        searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1) + "\uf8ff"
      )
    );
    try {
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      const filteredData = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add Product
    </Tooltip>
  );

  return (
    <>
      <Form.Group
        className="mb-3 mt-2 w-100 text-center d-flex justify-content-between"
        controlId="formBasicText"
      >
        <Form onKeyUp={searchProducts}>
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button variant="primary" className="m-1">
            <Link
              to="/addproducts"
              style={{ color: "white", textDecoration: "none", padding: "5px" }}
            >
              <AiFillPlusCircle style={{ margin: "3px", fontSize: "20px" }} />
            </Link>
          </Button>
        </OverlayTrigger>
      </Form.Group>
      <Container
        className="mt-5 mb-5 "
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "30px",
        }}
      >
        {productList.map((product) => (
          <Row key={product.id}>
            <Col>
              <Card
                className="text-center p-5 shadow bg-body rounded"
                style={{
                  height: "320px",
                  border: "1px solid dodgerblu",
                  borderRadius: "10px",
                }}
              >
                <Card.Img
                  className="image"
                  style={{ margin: "0px auto", width: "80px" }}
                  variant="top"
                  src={product.imageUrl}
                  alt={product.title}
                />
                <Card.Body>
                  <Card.Title className="h4">{product.title}</Card.Title>
                  <Card.Text className="mt-2">{product.price} €</Card.Text>
                </Card.Body>
                <Button
                  variant="btn btn-outline-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Product;
