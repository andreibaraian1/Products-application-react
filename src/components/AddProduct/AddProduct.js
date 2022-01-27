import Footer from "../Footer";
import styles from "./AddProduct.module.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
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
    if (!sku || !name || !price || !type) {
      setErr("All items should have a value");
      return;
    }
    var arr;
    if (type === "DVD") {
      if (!size) {
        setErr("Please, provide size");
        return;
      }
      arr = size.concat(" Size");
    }
    if (type === "Furniture") {
      if (!height || !width || !length) {
        setErr("Please, provide dimensions");
        return;
      }
      arr = height.concat("x").concat(width).concat("x").concat(length);
    }
    if (type === "Book") {
      if (!weight) {
        setErr("Please, provide weight");
        return;
      }
      arr = "Weight: ".concat(weight).concat("KG");
    }
    const insertProduct = await Axios.post(
      "https://php-api-for-scandiweb.herokuapp.com/insertProduct",
      {
        sku: sku,
        name: name,
        price: price,
        productType: type,
        description: arr,
      }
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
            onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
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
          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="number"
              placeholder="Size"
              onChange={(e) => {
                setSize(e.target.value);
                setErr("");
              }}
              onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
              value={size}
            />
          </Form.Group>
        )}
        {type === "Book" && (
          <Form.Group className="mb-3" controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Weight"
              onChange={(e) => {
                setWeight(e.target.value);
                setErr("");
              }}
              onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
              value={weight}
            />
          </Form.Group>
        )}
        {type === "Furniture" && (
          <div>
            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Height"
                onChange={(e) => {
                  setHeight(e.target.value);
                  setErr("");
                }}
                onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                value={height}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="width">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="Width"
                onChange={(e) => {
                  setWidth(e.target.value);
                  setErr("");
                }}
                onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                value={width}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="length">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="number"
                placeholder="Length"
                onChange={(e) => {
                  setLength(e.target.value.replace(/[^0-9]/g, ""));
                  setErr("");
                }}
                onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                
                value={length}
              />
            </Form.Group>
          </div>
        )}
      </Form>
      <Footer />
    </div>
  );
};
export default AddProduct;
