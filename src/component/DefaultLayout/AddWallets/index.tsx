import Form from "react-bootstrap/Form";
function AddWallets() {
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Loại ví</option>
          <option value="1">Tiền mặt</option>
          <option value="2">Thẻ tín dụng</option>
          <option value="3">Thẻ visa</option>
        </Form.Select>

        <Form.Control size="lg" type="text" placeholder="Tên ví" />
        <Form.Control
          type="number"
          placeholder="Số tiền hiện có"
          size="lg"
          className="m-2"
        />
      </div>
      <div className="d-flex justify-content-around align-items-center"></div>
    </div>
  );
}

export default AddWallets;
