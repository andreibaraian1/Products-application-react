import Form from "react-bootstrap/Form";
const Furniture = (props) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId="height">
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          placeholder="Height"
          onChange={(e) => {
            props.heightHandler(e.target.value);
          }}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
          }
          value={props.height}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="width">
        <Form.Label>Width</Form.Label>
        <Form.Control
          type="number"
          placeholder="Width"
          onChange={(e) => {
            props.widthHandler(e.target.value);
          }}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
          }
          value={props.width}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="length">
        <Form.Label>Length</Form.Label>
        <Form.Control
          type="number"
          placeholder="Length"
          onChange={(e) => {
            props.lengthHandler(e.target.value.replace(/[^0-9]/g, ""));
          }}
          onKeyDown={(e) =>
            (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
          }
          value={props.length}
        />
      </Form.Group>
    </div>
  );
};
export default Furniture;
