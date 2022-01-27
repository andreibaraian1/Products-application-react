import { useState } from "react";
import { Card } from "react-bootstrap";

const Product = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxHandler = (event) => {
    setIsChecked(!isChecked);
    props.checkboxHandler(props.index);
  };
  return (
    <Card>
      <div>
        <input
          className="delete-checkbox"
          type="checkbox"
          id={props.index}
          checked={isChecked}
          onChange={checkboxHandler}
        />
      </div>
      <Card.Text> {props.product.sku}</Card.Text>
      <Card.Text> {props.product.name}</Card.Text>
      <Card.Text>{props.product.price}$</Card.Text>
      <Card.Text>
        {props.product.productType === "Furniture" && "Dimension:"}
        {props.product.productType === "DVD" && "Size:"}
        {props.product.productType === "Books" && "Weight:"}
        {props.product.description}
      </Card.Text>
    </Card>
  );
};
export default Product;
