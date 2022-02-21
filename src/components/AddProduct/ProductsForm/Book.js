import Form from "react-bootstrap/Form";
const Book = (props) => {
  return (
    <Form.Group className="mb-3" controlId="weight">
      <Form.Label>Weight</Form.Label>
      <Form.Control
        type="number"
        placeholder="Weight"
        onChange={(e) => {
          props.weightHandler(e.target.value);
        }}
        onKeyDown={(e) =>
          (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
        }
        value={props.weight}
      />
    </Form.Group>
  );
};
export default Book;
