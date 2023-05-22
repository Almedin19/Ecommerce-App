import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { storage, db } from "../Firebase/firebase";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

function AddProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [productList, setProductList] = useState([]);

  const productCollection = collection(db, "products");

  const getProductList = async () => {
    try {
      const data = await getDocs(productCollection);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductList();
  });

  const onSubmitProd = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `images/${uuidv4()}- ${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);

    const imageUrl = await getDownloadURL(imageRef);

    try {
      await addDoc(productCollection, {
        title: title,
        price: price,
        description: description,
        timestamp: serverTimestamp(),
        qty: qty,
        imageUrl: imageUrl,
      });
      setTitle("");
      setPrice("");
      setDescription("");
      setQty("");
      setImageUrl("");
      getProductList();
      toast.success("The product was added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-2">
        <Form.Label>
          <h2>ADD PRODUCTS</h2>
        </Form.Label>
        <hr />

        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Qty</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Upload Product Image</Form.Label>
            <Form.Control
              type="file"
              id="file"
              placeholder=""
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </Form.Group>
          <Button
            variant="success mt-2 mb-2"
            type="submit"
            onClick={onSubmitProd}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddProducts;
