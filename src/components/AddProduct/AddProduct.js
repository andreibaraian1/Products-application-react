import Footer from "../Footer";
import styles from "./AddProduct.module.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./ProductsForm/Book";
import Dvd from "./ProductsForm/Dvd";
import Furniture from "./ProductsForm/Furniture";
import AddProductHelper from "./AddProductHelper";
const AddProduct = (props) => {
  const [type, setType] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    const query = {
      type,
      sku,
      name,
      price,
      size,
      weight,
      height,
      width,
      length,
    };
    const result = await AddProductHelper(query);
    console.log(result);
    if (result.valid === true && result.err === null) {
      navigate("/");
    } else {
      setErr(result.err);
    }
  };
  return (
    <div>
      <div className={styles.title}>
        <h1>Product Add</h1>
        <div className={styles.buttons}>
          <button onClick={submitHandler}>Save</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </div>
      <hr />
      {err}
      <Form className={styles.form} onSubmit={submitHandler} id="product_form">
        <Form.Group className="mb-3" controlId="sku">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            placeholder="SKU"
            onChange={(e) => {
              setSku(e.target.value);
              setErr("");
            }}
            value={sku}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
              setErr("");
            }}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
              setErr("");
            }}
            onKeyDown={(e) =>
              (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
            }
            value={price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productType">
          <Form.Label>Type Switcher</Form.Label>
          <Form.Select
            className={styles.formSwitch}
            onChange={(e) => {
              setType(e.target.value);
              setErr("");
            }}
            value={type}
          >
            <option />
            <option>DVD</option>
            <option>Furniture</option>
            <option>Book</option>
          </Form.Select>
        </Form.Group>
        {type === "DVD" && (
          <Dvd
            sizeHandler={(e) => {
              setSize(e);
              setErr("");
            }}
            size={size}
          />
        )}
        {type === "Book" && (
          <Book
            weightHandler={(e) => {
              setWeight(e);
              setErr("");
            }}
            weight={weight}
          />
        )}
        {type === "Furniture" && (
          <Furniture
            heightHandler={(e) => {
              setHeight(e);
              setErr("");
            }}
            widthHandler={(e) => {
              setWidth(e);
              setErr("");
            }}
            lengthHandler={(e) => {
              setLength(e);
              setErr("");
            }}
            height={height}
            width={width}
            length={length}
          />
        )}
      </Form>
      <Footer />
    </div>
  );
};
export default AddProduct;
