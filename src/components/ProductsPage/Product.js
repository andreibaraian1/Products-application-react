import { useState } from "react";
import { Card } from "react-bootstrap";

const Product = (props) => {
  const {
    checkboxHandler,
    product: { sku, name, price, productType, description },
  } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    checkboxHandler(sku);
  };

  return (
    <Card>
      <div>
        <input
          className="delete-checkbox"
          type="checkbox"
          id={sku}
          checked={isChecked}
          onChange={handleChange}
        />
      </div>
      <Card.Text>{sku}</Card.Text>
      <Card.Text>{name}</Card.Text>
      <Card.Text>{price}$</Card.Text>
      <Card.Text>
        {productType === "Furniture" && "Dimension:"}
        {productType === "DVD" && "Size:"}
        {productType === "Books" && "Weight:"}
        {description}
      </Card.Text>
    </Card>
  );
};
export default Product;
