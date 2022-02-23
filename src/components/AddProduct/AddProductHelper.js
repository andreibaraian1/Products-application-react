import Axios from "axios";

const AddProductHelper = async (p) => {
  let err = null;
  let product;
  if (!p.sku || !p.name || !p.price || !p.type) {
    err = "All items should have a value";
    return { valid: "false", err };
  }
  switch (p.type) {
    case "DVD":
      if (!p.size) {
        err = "Please provide size";
        return { valid: "false", err };
      }
      product = {
        sku: p.sku,
        name: p.name,
        price: p.price,
        productType: p.type,
        size: p.size,
      };
      break;
    case "Furniture":
      if (!p.height || !p.width || !p.length) {
        err = "Please provide dimensions";
        return { valid: "false", err };
      }
      product = {
        sku: p.sku,
        name: p.name,
        price: p.price,
        productType: p.type,
        height: p.height,
        width: p.width,
        length: p.length,
      };
      break;
    case "Book":
      if (!p.weight) {
        err = "Please provide weight";
        return { valid: "false", err };
      }
      product = {
        sku: p.sku,
        name: p.name,
        price: p.price,
        productType: "Books",
        weight: p.weight,
      };
      break;
    default:
      err = "No product type";
  }
  const insert = await Axios.post(
    "https://php-api-for-scandiweb.herokuapp.com/insertProduct",
    product
  );
  if (insert.status === 200) {
    return { valid: true, err };
  }
  return {
    valid: true,
    err: "Error while sending to server, please try again",
  };
};
export default AddProductHelper;
