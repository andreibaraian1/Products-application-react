import Axios from "axios";

const AddProductHelper = async (payload) => {
  if (!payload.sku || !payload.name || !payload.price || !payload.type) {
    return { valid: false, err: "All items should have a value" };
  }
  let product = {
    sku: payload.sku,
    name: payload.name,
    price: payload.price,
    productType: payload.type,
  };
  switch (payload.type) {
    case "DVD":
      if (!payload.size) {
        return { valid: false, err: "Please provide size" };
      }
      product = {
        ...product,
        size: payload.size,
      };
      break;
    case "Furniture":
      if (!payload.height || !payload.width || !payload.length) {
        return { valid: false, err: "Please provide dimensions" };
      }
      product = {
        ...product,
        height: payload.height,
        width: payload.width,
        length: payload.length,
      };
      break;
    case "Book":
      if (!payload.weight) {
        return { valid: false, err: "Please provide weight" };
      }
      product = {
        ...product,
        productType: "Books",
        weight: payload.weight,
      };
      break;
    default:
      return { valid: false, err: "No product type" };
  }
  const insert = await Axios.post(
    "https://products-php-api.herokuapp.com/insertProduct",
    product
  );
  if (insert.status === 200) {
    return { valid: true };
  }
  return {
    valid: false,
    err: "Error while sending to server, please try again",
  };
};
export default AddProductHelper;
