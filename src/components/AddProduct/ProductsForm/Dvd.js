import Form from "react-bootstrap/Form";
const Dvd = (props) => {
  return (
    <Form.Group className="mb-3" controlId="size">
      <Form.Label>Size</Form.Label>
      <Form.Control
        type="number"
        placeholder="Size"
        onChange={(e) => {
          props.sizeHandler(e.target.value);
        }}
        onKeyDown={(e) =>
          (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
        }
        value={props.size}
      />
    </Form.Group>
  );
};
export default Dvd;
