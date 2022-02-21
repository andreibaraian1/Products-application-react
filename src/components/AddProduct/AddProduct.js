import Footer from "../Footer";
import styles from "./AddProduct.module.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Book from "./ProductsForm/Book";
import Dvd from "./ProductsForm/Dvd";
import Furniture from "./ProductsForm/Furniture";
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
    let product;
    event.preventDefault();
    if (!sku || !name || !price || !type) {
      setErr("All items should have a value");
      return;
    }
    switch (type) {
      case "DVD":
        if (!size) {
          setErr("Please provide size");
          return;
        }
        product = {
          sku,
          name,
          price,
          productType: type,
          size,
        };
        break;
      case "Furniture":
        if (!height || !width || !length) {
          setErr("Please provide dimensions");
          return;
        }
        product = {
          sku,
          name,
          price,
          productType: type,
          height,
          width,
          length,
        };
        break;
      case "Book":
        if (!weight) {
          setErr("Please provide weight");
          return;
        }
        product = {
          sku,
          name,
          price,
          productType: 'Books',
          weight,
        };
        break;

      default:
        console.log("No product type");
    }
    const insertProduct = await Axios.post(
      "https://php-api-for-scandiweb.herokuapp.com/insertProduct",
      product
    );
    if (insertProduct.status === 200) {
      navigate("/");
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
