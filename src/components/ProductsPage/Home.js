import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import styles from "./Home.module.css";
import Footer from "../Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

  const fetchProducts = async () => {
    const getProducts = await Axios.get("https://products-php-api.herokuapp.com/getProducts");

    setProducts(getProducts.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCheck = (sku) => {
    setCheckboxes((prev) => ({
      ...prev,
      [sku]: prev?.[sku] ? !prev[sku] : true,
    }));
  };

  const handleDelete = async () => {
    const toDelete = Object.keys(checkboxes).filter((key) => checkboxes[key]);

    toDelete.forEach((sku) => {
      Axios.get(`https://products-php-api.herokuapp.com/deleteProduct?id=${sku}`).then(() => {
        fetchProducts();
      });
    });
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Product list</h1>
        <div className={styles.buttons}>
          <Link to="add-product">
            <button>ADD</button>
          </Link>
          <button onClick={handleDelete}>
            MASS DELETE
          </button>
        </div>
      </div>
      <hr />
      <Container className={styles.products}>
        <Row>
          {products?.map((product) => (
            <Col className={styles.product} xs="3" key={product.sku}>
              <Product
                product={product}
                checkboxHandler={() => {
                  handleCheck(product.sku);
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
